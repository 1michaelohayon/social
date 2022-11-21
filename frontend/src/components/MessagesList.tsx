
import useMessages from "../hooks/useMessages;"
import SingleMessage from "./SingleMessage"
import cooldown from "../utils/cooldown"
import useMessageSubscribe from "../hooks/useMessageSubscribe"

const MessagesList = () => {
  const subscribe = useMessageSubscribe()

  const { messages, loading, fetchMore } = useMessages()


  if (loading) {
    return <div>loading...</div>
  } else if (!messages) {
    return <div>no messages..</div>
  }

  const nodes = messages.edges
  const messageList = nodes.map((edge: any) => <SingleMessage key={edge.node.id} message={edge.node} />)


  return <div>
    {subscribe.newMessages.map(message => <SingleMessage key={message.id} message={message} />)}
    {messageList}
    <button onClick={() => fetchMore()}>Load more</button>
  </div>
}

export default MessagesList