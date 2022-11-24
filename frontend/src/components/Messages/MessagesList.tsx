
import useMessages from "../../hooks/useMessages;"
import SingleMessage from "./SingleMessage"
import useMessageSubscribe from "../../hooks/useMessageSubscribe"
import { useEffect } from "react"
import { Edge } from "../../types"
import Loading from "../Loading"

const MessagesList = () => {
  const subscribe = useMessageSubscribe()

  const { messages, loading, fetchMore } = useMessages()

  useEffect(() => {
    const scrolling_function = () => {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        console.log("fetching more.........")
        fetchMore()
        window.removeEventListener('scroll', scrolling_function)
      }
    }
    window.addEventListener('scroll', scrolling_function);
  }, [fetchMore, messages])


  if (loading) {
    return <Loading />
  } else if (!messages) {
    return <div>no messages..</div>
  }



  const edges: Edge[] = messages.edges

  const messageList = edges.map((edge) => <SingleMessage key={edge.node.id} message={edge.node} />)
  const liveMessages = subscribe.newMessages.map(message => <SingleMessage key={message.id} message={message} />)
  return <div>
    {liveMessages}
    {messageList}
  </div>
}

export default MessagesList