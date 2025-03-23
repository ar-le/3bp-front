import React from "react";
import { IChatroom } from "../../types/GeneralTypes";
import {Col, Row } from "react-bootstrap";
import { Link } from "react-router";

interface ChatLinkProps {
  chatroom: IChatroom;
}
function ChatLink({ chatroom }: ChatLinkProps) {
  return (
    <Row className="div-bg-medium rounded my-2 py-2 aling-items-center">
      <Col xs={10} className="d-flex align-items-center">
        {chatroom.name}
      </Col>
      <Col xs={2}>
        
          <Link to={`/chatrooms/${chatroom.id}`}>
            <i className="bi bi-chevron-right"></i>
          </Link>
       
      </Col>
    </Row>
  );
}

export default ChatLink;
