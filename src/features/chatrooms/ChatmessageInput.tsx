import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../auth/authSlice";
import { useParams } from "react-router";
import { ChatroomsApi } from "./chatroomsApi";
import { UsersApi } from "../users/userApi";
import { ChatUserInfo } from "../../types/GeneralTypes";
import "./styles/chatmessageinput.scss";
import { toast } from "react-toastify";

function ChatmessageInput() {
  const params = useParams<{ id: string }>();
  const [sendingMessage, setSendingMessage] = useState(false);
  const [message, setMessage] = useState("");
  const characterSelect = useRef<HTMLSelectElement>(null);
  const user = useAppSelector(selectUser);
  const [characters, setCharacters] = useState<ChatUserInfo[]>([]);

  //obtener personajes del mod
  useEffect(() => {
    if (user?.role == "mod") {
      UsersApi.getModCharacters().then(response => {
        setCharacters(response.data.data);
      });
    }
  }, [user]);

  const handleSendMessage = () => {
    setSendingMessage(true);
    if (params.id)
      ChatroomsApi.sendMessage({ content: message, chatroom: params.id, character: characterSelect.current?.value })
        .then(message => {
          setMessage("");
        })
        .catch( () => {
          toast.error("Connection error. Your message could not be sent");
        })
        .finally(() => {
          setSendingMessage(false);
        });
  };

  const handleEnterKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <Row className="align-items-center">
      <Col xs={10}>
        <div>
          {["mod", "admin"].includes(user?.role ?? "") && (
            <Form.Select
            className="div-bg-medium text-white rounded-4 mt-3 mb-1"
            ref={characterSelect} aria-label="character-select">
              <option value=''>Sin personaje</option>
              {characters.map(character => {
                return (
                  <option key={character.id} value={character.id}>
                    {character.username}
                  </option>
                );
              })}
            </Form.Select>
          )}
          <InputGroup.Text className="text-white">
            <Form.Control
              className="text-white"
              as="textarea"
              placeholder="Write your message..."
              value={message}
              onChange={e => {
                setMessage(e.target.value);
              }}
              onKeyUp={handleEnterKeyPress}
            />
          </InputGroup.Text>
        </div>
      </Col>
      <Col xs={2}>
        <Button
          disabled={sendingMessage || message == ""}
          onClick={handleSendMessage}
        >
          <i className="bi bi-send"></i>
        </Button>
      </Col>
    </Row>
  );
}

export default ChatmessageInput;
