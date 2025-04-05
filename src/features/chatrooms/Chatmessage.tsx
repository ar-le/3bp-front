import React, { useEffect, useState } from "react";
import { ChatMessage } from "../../types/GeneralTypes";
import classNames from "classnames";
import "./styles/chatmessage.scss";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { ChatroomsApi } from "./chatroomsApi";
import ToastNotif from "../../components/Toast";
import { toast } from "react-toastify";
import { Link } from "react-router";

interface ChatmessageProps {
  message: ChatMessage;
  ref: React.Ref<HTMLDivElement | null>;
  currentUser?: boolean;
}

function Chatmessage({ message, ref, currentUser }: ChatmessageProps) {
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const classes = classNames(
    "div-bg-light",
    "py-1",
    "my-2",
    "px-3",
    "rounded",
    "msg",
    "d-flex",
    {
      "current-user-msg": currentUser ?? false,
    }
  );

  const reportMessage = () => {
    console.log("report");

    ChatroomsApi.reportMessage(message.message.id)
      .then(res => {
        toast.success("Report received");
      })
      .catch(err => {
        toast.error("Connection error");
      });
  };

  const popover = (
    <Popover id="popover" className="custom-popover">
      <Popover.Body className="div-bg-light rounded ">
        <Button size="sm" variant="danger" onClick={reportMessage}>
          Report
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className={classes} ref={ref}>
      <div>
        <div className="d-flex justify-content-between">
          <Link to={`/user/${message.user.id}`} >
            <p className="text-accent mb-1">{message.user.username}</p>
          </Link >
          {!currentUser && (
            <OverlayTrigger
              rootClose
              trigger="click"
              placement="right"
              overlay={popover}
            >
              <Button
                size="sm"
                variant="outline-primary"
                className="ms-3 px-0 py-0 message-options-button"
              >
                <i className="bi bi-three-dots"></i>
              </Button>
            </OverlayTrigger>
          )}
        </div>
        <p className="text-white mb-0">{message.message.content}</p>
      </div>
    </div>
  );
}

export default Chatmessage;
