import { useEffect, useRef, useState } from "react";
import { IUserProfile } from "../types/UserTypes";
import { UsersApi } from "../features/users/userApi";
import { useParams } from "react-router";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import genericIcon from "./../assets/icons/personicon.png";
import "./styles/userprofile.scss";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/auth/authSlice";
import { useRenderCount } from "@uidotdev/usehooks";
import { toast } from "react-toastify";

function UserProfile() {
  const [profileInfo, setprofileInfo] = useState<IUserProfile | null>(null);
  const params = useParams<{ id: string }>();
  const user = useAppSelector(selectUser);
  const pointsSelect = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    if (params.id)
      UsersApi.getUserProfileInfo(params.id).then(response =>
        setprofileInfo(response.data.data)
      );
  }, [params.id]);

  const handleAddPoints = () => {
    if (params.id && pointsSelect.current && pointsSelect.current.value)
      UsersApi.givePoints(params.id, Number(pointsSelect.current.value))
      .then(
        response => {
          setprofileInfo(response.data.data);
        }
      )
      ;
  };

  return (
    <Container className="dark-bg d-flex flex-column justify-content-center align-content-center mt-4">
      <Row className="align-content-center justify-content-between">
        <Col xs={12} sm={10} md={6} lg={6} className="my-4">
          <div className="d-flex">
            <Image
              className="profile-icon"
              src={profileInfo?.avatar ?? genericIcon}
              rounded
            />
            <div className="ms-5">
              <h1>{profileInfo?.username}</h1>
              <p>
                <span className="ubuntu-mono-bold">Joined</span>{" "}
                {profileInfo?.joined}
              </p>
            </div>
          </div>
        </Col>

        <Col xs={12} sm={10} md={5} lg={6} className="my-4">
          <p>
            <span className="ubuntu-mono-bold ">Total messages: </span>
            {profileInfo?.totalMessages}
          </p>
          <p>
            <span className="ubuntu-mono-bold ">Most used chatrooms: </span>
          </p>
          <ListGroup className="div-bg-dark">
            {profileInfo?.mostUsedChats.map(chatroom => (
              <ListGroup.Item className="div-bg-dark text-white">
                {chatroom.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      {/* Sección admin / mod */}
      {["admin", "mod"].includes(user?.role ?? "") && (
        <Row>
          <hr></hr>
          <Col xs={12} sm={10} md={6} lg={6} className="my-4">
            <h5>Extra info</h5>
            <p>
              <span className="ubuntu-mono-bold ">Team: </span>{" "}
              {profileInfo?.team?.name ?? "None"}
            </p>
            <div className="d-flex align-items-center">
              <p className="pb-0 mb-0 me-4">
                <span className="ubuntu-mono-bold ">Points: </span>{" "}
                {profileInfo?.points ?? 0}
              </p>
              <Form.Select
                className="div-bg-medium text-white rounded-4 "
                ref={pointsSelect}
              >
                <option value="10">+10</option>
                <option value="50">+50</option>
                <option value="100">+100</option>
              </Form.Select>
              <Button size="sm" className="ms-3" onClick={handleAddPoints}>
                Add Points
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default UserProfile;
