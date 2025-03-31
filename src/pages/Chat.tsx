import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ChatroomsApi } from "../features/chatrooms/chatroomsApi";
import { ChatMessage, IChatroom } from "../types/GeneralTypes";
import { Col, Container, Row } from "react-bootstrap";
import Chatmessage from "../features/chatrooms/Chatmessage";
import "./styles/chat.scss";


function Chat() {
  const params = useParams<{ id: string }>();
  const [chatroom, setChatroom] = useState<IChatroom| null>(null);
  const [messages, setMessages] = useState<ChatMessage[] | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  useEffect(() => {
    if (!params.id) return;
    //Información chatroom
    ChatroomsApi.getChatroom(params.id)
      .then(res => {
        setChatroom(res.data.data);
      })
      .catch(error => { console.log(error); });

    //Obtener últimos mensajes
    ChatroomsApi.getMessages(params.id, "")
    .then(res => {
      setMessages(res.data.data);
      setNextCursor(res.data.meta.next_cursor);
      console.log(messages);
      
    })
    .catch(error => { console.log(error); })
    


  }, []);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const scrollTop =(e.target as HTMLElement).scrollTop;
    //const { scrollTop, scrollHeight, clientHeight } = e.target;
    //console.log(scrollTop, scrollHeight, clientHeight);
    if(scrollTop == 0 && nextCursor != null){
      if(!params.id) return;
      ChatroomsApi.getMessages(params.id, nextCursor)
      .then(res => {
        setMessages(prev => [...res.data.data, ...prev]);
        setNextCursor(res.data.meta.next_cursor);
      })
      .catch(error => { console.log(error); })
    }
    
    
  }

  return (
    <Container className="dark-bg d-flex flex-column justify-content-center align-content-center mt-4">
      <Row className="align-content-center justify-content-center">
        <Col xs={12} sm={10} md={9}>
        <h5>{chatroom?.name}</h5>
        </Col>
        <Col xs={12} sm={10} md={9} id="chat-container" onScroll={e => handleScroll(e)}>
        {messages?.reverse().map((message) => ( <Chatmessage key={message.message.id} message={message} />))}
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
