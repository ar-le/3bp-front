import React from "react";
import { ChatMessage } from "../../types/GeneralTypes";

interface ChatmessageProps {
  message: ChatMessage;
}

function Chatmessage({ message }: ChatmessageProps) {
  return (
    <div className="div-bg-light py-1 my-2 px-3  rounded">
       <p className="text-accent mb-1">{message.user.username}</p> 
      <p className="text-white mb-0">{message.message.content}</p>
    </div>
  );
}

export default Chatmessage;
