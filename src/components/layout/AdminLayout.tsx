import { useState } from "react";
import { Alert, Button, Col, ListGroup, Offcanvas, Row } from "react-bootstrap";
import { Link, Outlet } from "react-router";
import "./styles/adminlayout.scss";
import { selectUser } from "../../features/auth/authSlice";
import { useAppSelector } from "../../app/hooks";

function AdminLayout() {
  const [showSidebar, setShowSidebar] = useState(false);
  const user = useAppSelector(selectUser);

  return (
    <>
      <div className="d-flex align-items-start">
        <Button
          variant="primary"
          className="d-lg-none mx-4 mt-3"
          onClick={() => setShowSidebar(cur => !cur)}
        >
          <i className="bi bi-list"></i>
        </Button>

        <Offcanvas
          show={showSidebar}
          onHide={() => setShowSidebar(false)}
          responsive="lg"
          backdrop={false}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Control Panel</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ListGroup
              variant="flush"
              className="d-flex flex-column div-bg-dark me-4 mt-5"
            >
              {user?.role == "admin" && (
                <>
                  <ListGroup.Item className="div-bg-dark" action>
                    <Link to={"transmissions"}>Transmissions</Link>
                  </ListGroup.Item>
                  <ListGroup.Item action className="div-bg-dark">
                    <Link to={"users"}>Users</Link>
                  </ListGroup.Item>
                  <ListGroup.Item action className="div-bg-dark">
                    <Link to={"chatrooms"}>Chatrooms</Link>
                  </ListGroup.Item>
                </>
              )}

              <ListGroup.Item action className="div-bg-dark">
                <Link to={"chatrooms/chatmessages/reported"}>Reports</Link>
              </ListGroup.Item>
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>

        <Outlet></Outlet>
      </div>
    </>
  );
}

export default AdminLayout;
