import { Link, Outlet, useNavigate } from "react-router";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {  logout, logoutAsync, selectUser } from "../../features/auth/authSlice";
//import genericIcon from "./../../assets/icons/personicon.png";
import "./styles/userLayout.scss";
import { Col, Container, Row } from "react-bootstrap";
import { LocalStorageManager } from "../../utils/localStorageManagement";

export default function UserLayout() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  async function handleLogout() {
    await dispatch(logoutAsync());
    dispatch(logout());
    LocalStorageManager.remove('loggedUser');
    navigator('/login');
  }

  return (
    <>
      <header>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={()=>console.log(user)}>User</button>
       {/*  <Container fluid={"md"} className="pt-3 pb-2">
          <Row className="justify-content-center">
            <Col xs={11} md={10} lg={9}>
              <Nav
                as={"nav"}
                className="d-flex align-items-center justify-content-between"
              >
                <div>
                  <div className="d-flex align-items-center">
                    <Image
                      className="icon"
                      src={user?.avatar ?? undefined}
                      roundedCircle
                    />
                    <NavDropdown
                      className="ubuntu-mono-bold text-md"
                      title={user?.username}
                    >
                      <NavDropdown.Item>
                        
                        <Link to="/profile">Profile</Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleLogout}>
                        <Nav.Link><i className="bi bi-box-arrow-left me-3"></i>Logout</Nav.Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Item>
                      <Link to="/dashboard">
                        <i className="bi bi-chat-left-fill text-lg"></i>
                      </Link>
                    </Nav.Item>
                  </div>
                </div>
                <Nav.Item>
                  <Link to="/transmissions">
                    <i className="bi bi-broadcast text-xl"></i>
                  </Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Container> */}
      </header>
      <Outlet></Outlet>
    </>
  );
}
