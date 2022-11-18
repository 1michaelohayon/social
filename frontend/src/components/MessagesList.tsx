
import useMessages from "../hooks/useMessages;"
import { Message } from "../types"
import SingleMessage from "./SingleMessage"

import useMessageSubscribe from "../hooks/useMessageSubscribe"

const MessagesList = () => {
  const subscribe = useMessageSubscribe()

  const { messages, loading } = useMessages()




  if (loading) {
    return <div>loading...</div>
  }



  return <div>
    {subscribe.newMessages.map(message => <SingleMessage key={message.id} message={message} />)}
    {messages.map((msg: Message) => <SingleMessage key={msg.id} message={msg} />)}

  </div>
}

export default MessagesList