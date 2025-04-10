import React, { useEffect, useState } from "react";
import { ITransmission } from "../../types/GeneralTypes";
import { TransmissionsApi } from "../../features/transmissions/transmissionsApi";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router";
import { httpClient } from "../../utils/httpClient";
import { toast } from "react-toastify";

function TransmissionsPanel() {
  const [transmissions, setTransmissions] = useState<ITransmission[]>([]);
  const [filteredTransmissions, setFilteredTransmissions] = useState<
    ITransmission[]
  >([]);
  const [page, setPage] = useState(0);
  const numberOfResults = 10;
  const [pages, setPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [textFilter, setTextFilter] = useState("");
  const [order, setOrder] = useState("desc");

  //al inicializar el componente pedir lista de transmisiones
  useEffect(() => {
    TransmissionsApi.getAll().then(response => {
      setTransmissions(response.data.data);
    });

    window.Echo.private(`transmissions-channel`).listen(
      ".transmission",
      (event: ITransmission) => {
        console.log(event);

        if (transmissions)
          setTransmissions(transmissions => [...transmissions, event]);
      }
    );

    return () => {
      window.Echo.private(`transmissions-channel`).stopListening(
        ".transmission"
      );
    };
  }, []);

  //actualizar filteredTransmissions cuando se modifica la lista de transmisiones
  useEffect(() => {
    setFilteredTransmissions([...transmissions]);
  }, [transmissions]);

  //una vez se modifica filteredTransmissions, actualizar total y pages
  useEffect(() => {
    setTotal(filteredTransmissions?.length ?? 0);
    setPages(
      //para calcular las páginas, se redondea hacia arriba el resultado de la división para no dejar fuera resultados
      //y se resta uno porque las páginas empiezan de 0
      Math.ceil(filteredTransmissions?.length / numberOfResults) - 1
    );
    setPage(0);
  }, [filteredTransmissions]);

  //actualizar filteredtranmissions cuando se modifica el filtro o la lista de transmisiones
  useEffect(() => {
    setFilteredTransmissions(
      transmissions.filter(
        t => t.title.includes(textFilter) || t.content.includes(textFilter)
      )
    );
  }, [textFilter]);

  const handleDelete = (id: string) => {
    TransmissionsApi.delete(id).then(() => {
      toast.success("Transmission deleted");
      transmissions.splice(
        transmissions.findIndex(t => t.id == id),
        1
      );
      setTransmissions([...transmissions]);
    });
  };

  return (
    <div className="full-width ">
      <div className="d-flex m-4">
        <h2>Transmissions</h2>
        <Link to="create">
          <Button className="ms-3">New</Button>
        </Link>
      </div>
      <Table striped bordered hover className="m-4" responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Options</th>
          </tr>
          {transmissions
            ?.slice(
              page * numberOfResults,
              page * numberOfResults + numberOfResults
            )
            .map(transmission => (
              <tr className="div-bg-dark">
                <td className="div-bg-dark">{transmission.id}</td>
                <td>{transmission.title}</td>
                <td>{transmission.date}</td>
                <td>
                  <Link to={`create/${transmission.id}`}>
                    <Button>Edit</Button>
                  </Link>
                  <Button variant="danger" onClick={() => handleDelete(transmission.id)}>Delete</Button>
                </td>
              </tr>
            ))}
        </thead>
      </Table>
      <div>
        <Button
          variant="primary"
          size="sm"
          disabled={page == 0}
          onClick={() => setPage(page => --page)}
        >
          <i className="bi bi-arrow-left-short"></i>
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setPage(page => ++page);
            console.log(pages);
          }}
          disabled={page == pages}
        >
          <i className="bi bi-arrow-right-short"></i>
        </Button>
      </div>
    </div>
  );
}

export default TransmissionsPanel;
