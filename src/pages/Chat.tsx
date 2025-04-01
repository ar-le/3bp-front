import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { ChatroomsApi } from "../features/chatrooms/chatroomsApi";
import { ChatMessage, IChatroom } from "../types/GeneralTypes";
import { Col, Container, Row } from "react-bootstrap";
import Chatmessage from "../features/chatrooms/Chatmessage";
import "./styles/chat.scss";
import { useMeasure } from "@uidotdev/usehooks";

function Chat() {
  const params = useParams<{ id: string }>();
  const [chatroom, setChatroom] = useState<IChatroom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const bottomDivRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const lastReadMessageRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef(0);
  const [measureRef, { height: newHeight }] = useMeasure();


  useEffect(() => {
    if (!params.id) return;
    //Información chatroom
    ChatroomsApi.getChatroom(params.id)
      .then(res => {
        setChatroom(res.data.data);
      })
      .catch(error => {
        console.log(error);
      });

    //Obtener últimos mensajes
    ChatroomsApi.getMessages(params.id, "")
      .then(res => {
        setMessages(res.data.data.reverse());
        setNextCursor(res.data.meta.next_cursor);
        console.log(messages);
      })
      .catch(error => {
        console.log(error);
      });

    /* scrollToBottom(); */
  }, []);

  /*  useEffect(() => {
    scrollToBottom();
  },[messagesContainerRef.current, bottomDivRef.current]); */

  /*   const scrollToBottom =() => {
    messagesContainerRef.current?.scrollTo({
      top: 10000,
      behavior: "smooth",
    });
    setTimeout(() => {

    
      messagesContainerRef.current?.scrollTo({
        top: 10000,
        behavior: "smooth",
      });
    }, 2);
  }; */

 

  const scrollToBottomC = useCallback(() => {
    setTimeout(() => {
      //console.log("scroll in view");
      bottomDivRef.current?.scrollIntoView();
      /* messagesContainerRef.current?.scrollTo({
        top: 10000,
        behavior: "smooth",
      }); */
    }, 1);
  },[]);

  const scrollToLast = useCallback(() => {
    //console.log(`scroll - old: ${heightRef.current}, new: ${newHeight}`);
    if (newHeight > heightRef.current) {
      messagesContainerRef.current.scrollTop = newHeight - heightRef.current;
      heightRef.current = newHeight;
    }
  }, [newHeight]);

  useEffect(() => {
    //scroll hasta abajo sólo al entrar, cuando no se han cargado más mensajes
    if(messages.length <= 15){
      scrollToBottomC();
      heightRef.current = newHeight;
    }

    scrollToLast();
      
  },[scrollToBottomC,scrollToLast, messages]);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const scrollTop = (e.target as HTMLElement).scrollTop;
    //const { scrollTop, scrollHeight, clientHeight } = e.target;
    //console.log(scrollTop, scrollHeight, clientHeight);

    //cuando se llega arriba se hace una petición
    if (scrollTop == 0 && nextCursor != null) {
      if (!params.id) return;
      ChatroomsApi.getMessages(params.id, nextCursor)
        .then(res => {
          setMessages(prev => [...res.data.data.reverse(), ...prev]);
          setNextCursor(res.data.meta.next_cursor);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  return (
    <Container className="dark-bg d-flex flex-column justify-content-center align-content-center mt-4">
      <Row className="align-content-center justify-content-center" ref={messagesContainerRef}>
        <Col xs={12} sm={10} md={9}>
          <h5>{chatroom?.name}</h5>
        </Col>
        <Col
          xs={12}
          sm={10}
          md={9}
          id="chat-container"
          onScroll={e => handleScroll(e)}
          ref={measureRef}
        >
          {messages?.map((message, i) => {
            let assignRef = null;
            if (i == messages.length - 1) {
               assignRef = lastReadMessageRef;
            }
            return <Chatmessage key={message.message.id} message={message} ref={assignRef} />;
          })}
          <div ref={bottomDivRef}></div>
        </Col>
        
      </Row>
    </Container>
  );
}

export default Chat;
