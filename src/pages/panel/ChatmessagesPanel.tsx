import React, { useEffect, useState } from "react";
import { Button, Table, Badge } from "react-bootstrap";

import { toast } from "react-toastify";

import { ChatMessage, PaginatedResponse } from "../../types/GeneralTypes";
import { Link, useParams } from "react-router";
import { ChatroomsApi } from "../../features/chatrooms/chatroomsApi";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';

function ChatMessagesPanel() {
  const { chatroomId } = useParams<{ chatroomId: string }>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [prevCursor, setPrevCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messageType, setMessageType] = useState('all');

   useEffect(() => {

      loadMessages('');
  
  }, []); 

  const loadMessages = (currCursor: string) => {
    setIsLoading(true);
    ChatroomsApi.getMessages(chatroomId!, currCursor ?? "")
      .then(response => {
        const newMessages = response.data.data;
        setMessages(newMessages);
        setCursor(response.data.meta.next_cursor);
        setPrevCursor(response.data.meta.prev_cursor)
      })
      .catch(error => {
        toast.error("Failed to load messages");
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  };


  const toggleVisibility = (messageId: string) => {
    const message = messages.find(m => m.message.id === messageId);
    if (!message) return;

    ChatroomsApi.hideMessage(messageId)
      .then(() => {
        setMessages(messages.map(m => 
          m.message.id === messageId 
            ? { 
                ...m, 
                message: { ...m.message, hidden: true} 
              } 
            : m
        ));
        toast.success("Message visibility updated");
      })
      .catch(error => {
        toast.error("Failed to update message");
        console.error(error);
      });
  };

  const handleDelete = (messageId: string) => {
    
    confirmAlert({
          title: 'Delete Message',
          message: 'This action cannot be undone',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                  ChatroomsApi.deleteMessage(messageId)
                    .then(() => {
                      setMessages(messages.filter(m => m.message.id !== messageId));
                      toast.success("Message deleted");
                    })
                    .catch(error => {
                      toast.error("Failed to delete message");
                      console.error(error);
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
    <div className="full-width">
      <div className="d-flex m-4 align-items-center">
        <h2>Chat Messages - Room {chatroomId}</h2>
        <Link to={`/chatrooms/${chatroomId}`}>
          <Button variant="secondary" className="ms-3">
            Go to Chatroom
          </Button>
        </Link>
      </div>

      <Table striped bordered hover className="m-4" responsive>
        <thead>
          <tr>
            <th>User</th>
            <th>Message</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(message => (
            <tr key={message.message.id}>
              <td >
                
                {message.user.username}
              </td>
              <td>{message.message.content}</td>
              <td>
                <Badge bg={message.message.hidden ? "danger" : "success"}>
                  {message.message.hidden ? "Hidden" : "Visible"}
                </Badge>
              </td>
              <td>
                <Button
                  variant={"warning"}
                  size="sm"
                  className="me-2"
                  onClick={() => toggleVisibility(message.message.id)}
                  disabled = {message.message.hidden}
                >
                  Hide
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                 onClick={() => handleDelete(message.message.id)}
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
               disabled={!prevCursor}
               onClick={() => loadMessages(prevCursor ?? '')}
             >
               <i className="bi bi-arrow-left-short"></i>
             </Button>
             <Button
               variant="primary"
               size="sm"
               onClick={() => loadMessages(cursor ?? '')}
               disabled={!cursor}
             >
               <i className="bi bi-arrow-right-short"></i>
             </Button>
           </div>
    </div>
  );
}

export default ChatMessagesPanel;