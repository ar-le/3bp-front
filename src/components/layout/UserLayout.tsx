import { Link, Outlet, useLocation, useNavigate } from "react-router";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, logoutAsync, selectTeam, selectUser, setTeam } from "../../features/auth/authSlice";
//import genericIcon from "./../../assets/icons/personicon.png";
import "./styles/userLayout.scss";
import { Col, Container, Row } from "react-bootstrap";
import { LocalStorageManager } from "../../utils/localStorageManagement";
import { httpClient } from "../../utils/httpClient";
import genericIcon from "../../assets/icons/personicon.png";
import "./../../utils/echo";
import { useEffect, useState } from "react";
import { ITransmission } from "../../types/GeneralTypes";
import { newTransmission } from "../../features/transmissions/transmissionsStore";
import { Bounce, ToastContainer, toast } from "react-toastify";

export default function UserLayout() {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const location = useLocation();
  const team = useAppSelector(selectTeam);
  

  const [newTransmissions, setNewTransmissions] = useState(false);

  const turnOnNewTransmission = () => {
    if (location.pathname.localeCompare("/transmissions") !== 0)
      setNewTransmissions(true);
  };

  useEffect(() => {
    //suscribirse al canal al inicializar el componente y desuscribirse cuando se destruye
    window.Echo.private(`transmissions-channel`).listen(
      ".transmission",
      (event: ITransmission) => {
        console.log(event);
        dispatch(newTransmission(event));
        turnOnNewTransmission();
        console.log('new transmission');
        
      }
    );

    return () => {
      window.Echo.private(`transmissions-channel`).stopListening(
        ".transmission"
      );
    };
    //Esto no es un error, necesito un array vacío para que sólo se ejecute una vez el effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleLogout() {
    await dispatch(logoutAsync());
    dispatch(logout());
    document.querySelector('body')!.className = '';
    dispatch(setTeam(''));
    
    LocalStorageManager.remove("loggedUser");
    LocalStorageManager.remove("team");
    //eliminar header authorization
   /*  httpClient.interceptors.request.use(function (config) {
      config.headers["Authorization"] = null;
      return config;
    }); */

    httpClient.interceptors.request.clear();
    //eliminar liustener y cerrar la conexión para que no se acumulen si se vuelve a entrar sin cerrar la ventana
    /* window.Echo.private(`transmissions-channel`).stopListening(".transmission")
    window.Echo.leave(`transmissions-channel`); */
    navigator("/login");
  }

  return (
    <>
      <header>
        <Container fluid={"md"} className="pt-3 pb-2">
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
                      src={user?.avatar ?? genericIcon}
                      roundedCircle
                    />
                    <NavDropdown
                      className="ubuntu-mono-bold text-md"
                      title={user?.username}
                    >
                      <NavDropdown.Item as={"div"}>
                        <Link to={`user/${user?.id}`}>
                          <i className="bi bi-person-circle me-3"></i>
                          Profile
                        </Link>
                      </NavDropdown.Item>

                      <NavDropdown.Item as={"div"} onClick={handleLogout}>
                        <Nav.Link className="p-0">
                          <i className="bi bi-box-arrow-left me-3"></i>Logout
                        </Nav.Link>
                      </NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Item>
                      <Link to="/">
                        <i className="bi bi-chat-left-fill text-lg"></i>
                      </Link>
                    </Nav.Item>

                    {(user?.role == 'admin' || user?.role == 'mod') && <Nav.Item>
                      <Link to="/panel" className="ms-5">
                        <i className="bi bi-gear-fill"></i>
                      </Link>
                    </Nav.Item>}
                  </div>
                </div>

                <Nav.Item>
                  <Link
                    onClick={() => setNewTransmissions(false)}
                    to="/transmissions"
                  >
                    <i
                      className={`bi bi-broadcast text-xl ${
                        newTransmissions ? "newEventIcon" : ""
                      }`}
                    ></i>
                  </Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Container>
      </header>
      <Outlet></Outlet>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}
