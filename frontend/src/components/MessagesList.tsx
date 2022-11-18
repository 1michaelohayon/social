
import useMessages from "../hooks/useMessages;"
import { Message } from "../types"
import SingleMessage from "./SingleMessage"
const MessagesList = () => {
  const { messages, loading } = useMessages()
  if (loading) {
    return <div>loading...</div>
  }



  return <div>
    {messages.map((msg: Message) => <SingleMessage key={msg.id} message={msg} />)}

  </div>
}

export default MessagesList