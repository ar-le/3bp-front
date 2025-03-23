import React, { useEffect, useState } from "react";
import { ITransmission } from "../types/GeneralTypes";
import { TransmissionsApi } from "../features/transmissions/transmissionsApi";
import TransmissionPreview from "../features/transmissions/TransmissionPreview";
import { Button, Col, Container, Row } from "react-bootstrap";
import "./styles/transmissions.scss";

/* interface TransmissionsProps{
    setNewTransmissions: React.Dispatch<React.SetStateAction<boolean>>
} */

function Transmissions() {

  const [transmissions, setTransmissions] = useState<ITransmission[]>([]);
  const [filteredTransmissions, setFilteredTransmissions] = useState<
    ITransmission[]
  >([]);
  const [page, setPage] = useState(0);
  const numberOfResults = 7;
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
  }, [transmissions])

  //una vez se modifica filteredTransmissions, actualizar total y pages
  useEffect(() => {
    setTotal(filteredTransmissions?.length ?? 0);
    setPages(
      //para calcular las páginas, se redondea hacia arriba el resultado de la división para no dejar fuera resultados
      //y se resta uno porque las páginas empiezan de 0
      Math.ceil(filteredTransmissions?.length / numberOfResults) -1
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


  

  return (
    <Container className="dark-bg d-flex flex-column justify-content-center align-content-center mt-4">
      <Row className="align-content-center justify-content-center">
        <Col xs={12} sm={8} md={6}>
          <h5>Transmissions</h5>
          <div className="d-flex justify-content-between">
          {/*  filtros  */}
          {/* filtro texto */}
          <input
            id="searchFilter"
            type="text"
            className="form-control"
            placeholder="Search"
            value={textFilter}
            onChange={e => setTextFilter(e.currentTarget.value)}
          />
          {/* ordenar por fecha */}
          <button className="btn btn-primary d-flex" 
            onClick={() => setOrder( corder => corder === "asc" ? "desc" : "asc")}
          >Date {order == 'asc' ? <i className="bi bi-arrow-down-short ms-2"></i> : <i className="bi bi-arrow-up-short ms-2"></i>}</button>

          </div>
          <div id="transmission-list">
            {filteredTransmissions &&
              filteredTransmissions
              .sort((a, b) => {
                if (order === "asc") {  
                 return new Date(a.date).getTime() - new Date(b.date).getTime();
                }
                else
                  return new Date(b.date).getTime() - new Date(a.date).getTime();
              })
                .slice(
                  page * numberOfResults,
                  page * numberOfResults + numberOfResults
                )
                .map(t => <TransmissionPreview transmission={t} key={t.id} />)}
          </div>
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
        </Col>
      </Row>
    </Container>
  );
}

export default Transmissions;
