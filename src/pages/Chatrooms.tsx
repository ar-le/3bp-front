import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IChatroom, PaginatedResponse } from "../types/GeneralTypes";
import { ChatroomsApi } from "../features/chatrooms/chatroomsApi";
import ChatSection from "../features/chatrooms/ChatSection";
import { useAppSelector } from "../app/hooks";
import { selectTeam } from "../features/auth/authSlice";

function Chatrooms() {
  const userTeam = useAppSelector(selectTeam);
    useState<PaginatedResponse<IChatroom> | null>(null);
    useState<PaginatedResponse<IChatroom> | null>(null);


  return (
    <Container className="dark-bg d-flex flex-column justify-content-center align-content-center mt-4">
      <Row className="align-content-center justify-content-center">
        <Col xs={12} sm={10} md={9}>
          <h5>Chatrooms</h5>
          <Row className="gy-3 justify-content-between">
            {/* Team chatroom */}
            {userTeam && <ChatSection type="team"  />}
            <ChatSection type="general"  />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Chatrooms;
