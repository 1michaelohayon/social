import { Message } from "../../types";
import SingleMessage from "./SingleMessage";
import useFindReplies from "../../hooks/useFindReplies";
import { useMatch } from "react-router-dom";
import Loading from "../Loading";

const MessagePage = () => {
  const match = useMatch("/message/:id")
  const { messages, loading } = useFindReplies({ messageId: Number(match?.params.id) });

  if (loading) return <Loading />

  const message: Message = messages.find((m: Message) => m.id === match?.params.id)
  const replies: Message[] = messages.filter((m: Message) => m.id !== match?.params.id)




  if (!messages || !message) return <div>not found</div>

  return <div>

    <SingleMessage message={message} />

    replies
    <div>
      {replies ?
        replies.map((m: Message) => <SingleMessage key={m.id} message={m} />)
        : null}
    </div>
  </div>

}

export default MessagePage;