import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { ChatroomsApi } from "../../features/chatrooms/chatroomsApi";
import { IChatroom } from "../../types/GeneralTypes";



function ChatroomsPanel() {
  const [chatrooms, setChatrooms] = useState<IChatroom[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    ChatroomsApi.getChatrooms({page : page.toString()}).then(response => {
      setChatrooms(response.data.data);
      setPages(response.data.meta.last_page);
    });
  }, [page]);

  const handleDelete = (id: string) => {
    ChatroomsApi.deleteChatroom(id.toString()).then(() => {
      toast.success("Chatroom deleted");
      setChatrooms(chatrooms.filter(chatroom => chatroom.id !== id));
    });
  };

  return (
    <div className="full-width">
      <div className="d-flex m-4">
        <h2>Chatrooms</h2>
        <Link to="create">
          <Button className="ms-3">New</Button>
        </Link>
      </div>
      <Table striped bordered hover className="m-4" responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Creator</th>
            <th>Messages</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {chatrooms.map(chatroom => (
            <tr key={chatroom.id} className="div-bg-dark">
              <td>{chatroom.id}</td>
              <td>{chatroom.name}</td>
              <td>{chatroom.description}</td>
              <td>{chatroom.creator.username}</td>
              <td>
                <Link to={`chatmessages/${chatroom.id}`}>
                  <Button><i className="bi bi-chat-fill"></i></Button>
                </Link >
              </td>
              <td>
                <Link to={`create/${chatroom.id}`}>
                  <Button>Edit</Button>
                </Link>
                
                  <Button 
                    variant="danger" 
                    onClick={() => handleDelete(chatroom.id)}
                  >
                    Delete
                  </Button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <Button
          variant="primary"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage(page => --page)}
        >
          <i className="bi bi-arrow-left-short"></i>
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setPage(page => ++page)}
          disabled={page === pages}
        >
          <i className="bi bi-arrow-right-short"></i>
        </Button>
      </div>
    </div>
  );
}

export default ChatroomsPanel;