
import useMessages from "../hooks/useMessages;"
import { Message } from "../types"
import SingleMessage from "./SingleMessage"
import { useSubscription } from "@apollo/client"
import { useState } from "react"
import { MESSAGE_ADDED } from "../graphql/queries"
const MessagesList = () => {
  const [liveMessages, setLiveMessages] = useState<Message[]>([])

  const { messages, loading } = useMessages()
  useSubscription(MESSAGE_ADDED, {
    onData: ({ data }) => {
      if (!data.loading) {
        const updatedMessages = liveMessages.concat(data.data.messageAdd)
        setLiveMessages(updatedMessages)
        console.log(liveMessages)
      }
      console.log(data.data.messageAdd)
    }
  })





  if (loading) {
    return <div>loading...</div>
  }



  return <div>
    {liveMessages.map(message => <SingleMessage key={message.id} message={message} />)}
    {messages.map((msg: Message) => <SingleMessage key={msg.id} message={msg} />)}

  </div>
}

export default MessagesList