import React, { useEffect, useState } from "react";

import { Button, Table } from "react-bootstrap";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { ILoggedUser, IUser } from "../../types/UserTypes";
import { UsersApi } from "../../features/users/userApi";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/auth/authSlice";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

function UsersPanel() {
    const currentUser: ILoggedUser | null = useAppSelector(selectUser);
  const [users, setUsers] = useState<IUser[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);


  //al inicializar el componente pedir lista de transmisiones
  useEffect(() => {
    UsersApi.getAll((page).toString()).then(response => {
      setUsers(response.data.data);
      setPages(response.data.meta.last_page)
    });

  }, [page]);




  const handleDelete = (id: string) => {

    confirmAlert({
      title: 'Delete User',
      message: 'This action cannot be undone',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            UsersApi.delete(id).then(() => {
              toast.success("User deleted");
              users.splice(
                users.findIndex(t => t.id == id),
                1
              );
              setUsers([...users]);
            });
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });


    
  };


  return (
    <div className="full-width ">
      <div className="d-flex m-4">
        <h2>Users</h2>
        <Link to="create">
          <Button className="ms-3">New</Button>
        </Link>
      </div>
      <Table striped bordered hover className="m-4" responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Options</th>
          </tr>
          {users
            
            .map(user => (
              <tr className="div-bg-dark">
                <td className="div-bg-dark">{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`create/${user.id}`}>
                    <Button>Edit</Button>
                  </Link>
                 {currentUser?.username != user.username &&
                  <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>}
                </td>
              </tr>
            ))}
        </thead>
      </Table>
      <div>
        <Button
          variant="primary"
          size="sm"
          disabled={page == 1}
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

export default UsersPanel;
