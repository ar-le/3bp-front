import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IChatroom, PaginatedResponse } from "../types/GeneralTypes";
import { ChatroomsApi } from "../features/chatrooms/chatroomsApi";
import ChatSection from "../features/chatrooms/ChatSection";

function Chatrooms() {
  const [chatrooms, setChatrooms] =
    useState<PaginatedResponse<IChatroom> | null>(null);
  const [teamChatrooms, setTeamChatrooms] =
    useState<PaginatedResponse<IChatroom> | null>(null);

  useEffect(() => {
    ChatroomsApi.getChatrooms().then(response => {
      setChatrooms(response.data);
    });

    ChatroomsApi.getTeamChatrooms().then(response => {
      setTeamChatrooms(response.data);
    });
  }, []);

  return (
    <Container className="dark-bg d-flex flex-column justify-content-center align-content-center mt-4">
      <Row className="align-content-center justify-content-center">
        <Col xs={12} sm={10} md={9}>
          <h5>Chatrooms</h5>
          <Row className="gy-3 justify-content-between">
            {/* Team chatroom */}
            <ChatSection type="team" paginatedChatrooms={teamChatrooms} />
            <ChatSection type="general" paginatedChatrooms={chatrooms} />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Chatrooms;
