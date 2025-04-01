import React from "react";
import { ChatMessage } from "../../types/GeneralTypes";

interface ChatmessageProps {
  message: ChatMessage,
  ref: React.Ref<HTMLDivElement | null>
}

function Chatmessage({ message, ref }: ChatmessageProps) {
  return (
    <div className="div-bg-light py-1 my-2 px-3  rounded" ref={ref}>
       <p className="text-accent mb-1">{message.user.username}</p> 
      <p className="text-white mb-0">{message.message.content}</p>
      <p>{message.message.id}</p>
    </div>
  );
}

export default Chatmessage;
