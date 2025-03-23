import { Button, Col, Offcanvas, Row } from "react-bootstrap";
import { IChatroom, PaginatedResponse } from "../../types/GeneralTypes";
import ChatLink from "./ChatLink";
import { useEffect, useState } from "react";
import { httpClient } from "../../utils/httpClient";
import ChatFilter from "./ChatFilter";

interface ChatSectionProps {
  type: "team" | "general";
  paginatedChatrooms?: PaginatedResponse<IChatroom> | null;
}

const displayInfo = {
  icon: {
    team: <i className="bi bi-shield-fill"></i>,
    general: <i className="bi bi-chat-dots"></i>,
  },
  title: {
    team: "Team",
    general: "Conversations",
  },
};

function ChatSection(props: ChatSectionProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleCloseFilters = () => setShowFilters(false);
  const handleShowFilters = () => setShowFilters(true);

  const [page, setPage] = useState(1);

  // console.log(props.paginatedChatrooms?.total);

  //peticion al servidor cuando se pase de página
  useEffect(() => {
    //const newPage = httpClient
  }, [page]);

  return (
    <div className="div-bg-dark full-width px-4 py-2 rounded">
      {/* Cabecera de sección y filtros */}
      <Row className="full-width px-0">
        <Col className="ubuntu-mono-bold" xs={10}>
          {displayInfo.icon[props.type]} {displayInfo.title[props.type]}
        </Col>
        {/* Los filtros sólo se muestran si es el contenedor de chats general */}
        {props.type == "general" && (
          <>
            <Col xs={2}>
              <Button
                variant="primary"
                size="sm"
                className="d-lg-none"
                onClick={handleShowFilters}
              >
                <i className="bi bi-funnel-fill"></i>
              </Button>
            </Col>
            <Offcanvas
              show={showFilters}
              onHide={handleCloseFilters}
              placement="end"
              responsive="lg"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filters</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div className="mb-0 d-flex">
                  {/* Filtros por texto y fecha */}
                  {/* <div>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Search..."
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <label htmlFor="date-from">From</label>
                    <input
                      type="date"
                      id="date-from"
                      className="form-control"
                    />
                  </div>
                  <div className="d-flex align-items-center">
                    <label htmlFor="date-to">To</label>
                    <input type="date" id="date-to" className="form-control" />
                  </div> */}
                  <ChatFilter></ChatFilter>
                </div>
              </Offcanvas.Body>
            </Offcanvas>
          </>
        )}
      </Row>
      {/* Resultados */}
      <Row>
        <Col>
          {props.paginatedChatrooms?.data.map(chatroom => (
            <ChatLink key={chatroom.id} chatroom={chatroom} />
          ))}
        </Col>
      </Row>
      {/* Paginación si es necesaria */}
      {props.paginatedChatrooms?.meta?.total != null && (
        <Row>
          <Col>
            <Button
              variant="primary"
              size="sm"
              className="ubuntu-mono-bold"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <i className="bi bi-chevron-left"></i>
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="ubuntu-mono-bold ms-2"
              onClick={() => setPage(page + 1)}
              disabled={!props.paginatedChatrooms?.links.next}
            >
              <i className="bi bi-chevron-right"></i>
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ChatSection;
