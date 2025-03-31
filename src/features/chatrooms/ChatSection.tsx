import { Button, Col, Modal, Offcanvas, Row } from "react-bootstrap";
import { IChatroom, PaginatedResponse } from "../../types/GeneralTypes";
import ChatLink from "./ChatLink";
import { useEffect, useRef, useState } from "react";
import { httpClient } from "../../utils/httpClient";
import ChatFilter from "./ChatFilter";
import { ChatroomsApi } from "./chatroomsApi";
import "./styles/chatsection.scss";
import CreateChatForm from "./CreateChatForm";


interface ChatSectionProps {
  type: "team" | "general";
  // paginatedChatrooms?: PaginatedResponse<IChatroom> | null;
}

interface ChatroomFilters {
    textFilter: string;
    to: string;
    from: string;
    page: number;
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
  const [paginatedChatrooms, setPaginatedChatrooms] =
    useState<PaginatedResponse<IChatroom> | null>(null);

  const handleCloseFilters = () => setShowFilters(false);
  const handleShowFilters = () => setShowFilters(true);
  const textFilterInput = useRef<HTMLInputElement | null>(null);
  const afterDateInput = useRef<HTMLInputElement | null>(null);

  const [showModal, setShowModal] = useState(false);


  const [page, setPage] = useState(1);

  useEffect(() => {
    //pedir información al cargar componente
    switch (props.type) {
      case "team":
        ChatroomsApi.getTeamChatrooms().then(response =>
          setPaginatedChatrooms(response.data)
        );
        break;
      case "general":
        ChatroomsApi.getChatrooms().then(response =>
          setPaginatedChatrooms(response.data)
        );
        break;
    }
  }, []);

  const toggleCreateChatModal = () => setShowModal(show => !show);

  function filterResults(textFilter: string, to: string, after: string) {

    ChatroomsApi.getChatrooms({
      textFilter: textFilter,
      to: to ,
      after: after,
      page: page.toString(),
    }).then(response => setPaginatedChatrooms(response.data))
    .catch(error => console.log(error));
  }

  function createChatroom()
  {

  }

  //peticion al servidor cuando se pase de página
  useEffect(() => {
    //sólo se ejecuta si hay que mostrar los chats generales, no los de equipo que no se paginan
    if(props.type != 'general') return; 
    filterResults(textFilterInput.current?.value ?? '', '', afterDateInput.current?.value ?? '' )
    
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
              <div className="d-flex">
                <Button
                  variant="primary"
                  size="sm"
                  className="d-lg-none mx-1"
                  onClick={handleShowFilters}
                >
                  <i className="bi bi-funnel-fill"></i>
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="d-lg-none mx-1"
                  onClick={toggleCreateChatModal}
                >
                  <i className="bi bi-plus"></i>
                </Button>
              </div>
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
              <Offcanvas.Body className="filters-expand-container">
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
                  <ChatFilter onSubmitFn={filterResults} textFilterInput={textFilterInput} afterDateFilterInput={afterDateInput}></ChatFilter>
                  <Button
                  variant="primary"
                  size="sm"
                  className=" mx-1"
                  onClick={toggleCreateChatModal}
                >
                  <i className="bi bi-plus"></i>
                </Button>
                </div>
              </Offcanvas.Body>
            </Offcanvas>
          </>
        )}
      </Row>
      {/* Resultados */}
      <Row>
        <Col>
          {paginatedChatrooms?.data.map(chatroom => (
            <ChatLink key={chatroom.id} chatroom={chatroom} />
          ))}
        </Col>
      </Row>
      {/* Paginación si es necesaria */}
      {paginatedChatrooms?.meta?.total != null && props.type != 'team' && (
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
              disabled={page == paginatedChatrooms.meta.last_page}
            >
              <i className="bi bi-chevron-right"></i>
            </Button>
          </Col>
        </Row>
      )}


      <Modal show={showModal} onHide={toggleCreateChatModal}>
              <Modal.Header closeButton>
                <Modal.Title>Create a chatroom</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <CreateChatForm />
              </Modal.Body>
             
        </Modal>
    </div>
  );
}

export default ChatSection;
