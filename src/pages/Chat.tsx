import { useParams } from "react-router";


function Chat() {

const params = useParams<{ id: string }>(); 
  return (
    <div>Chat {params.id}</div>
  )
}

export default Chat