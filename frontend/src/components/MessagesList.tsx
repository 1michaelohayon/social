
import useMessages from "../hooks/useMessages;"
import { Message } from "../types"
import SingleMessage from "./SingleMessage"

import useMessageSubscribe from "../hooks/useMessageSubscribe"

const MessagesList = () => {
  const subscribe = useMessageSubscribe()

  const { messages, loading } = useMessages()




  if (loading) {
    return <div>loading...</div>
  } else if (!messages) {
    return <div>no messages..</div>
  }


  const messageList = messages.map((msg: Message) => <SingleMessage key={msg.id} message={msg} />)

  
  return <div>
    {subscribe.newMessages.map(message => <SingleMessage key={message.id} message={message} />)}
    {messageList}

  </div>
}

export default MessagesList