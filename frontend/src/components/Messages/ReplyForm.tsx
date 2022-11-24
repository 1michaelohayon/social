import useField from "../../hooks/useField"
import useCreateMessage from "../../hooks/useCreateMessage"
import { useNavigate } from "react-router-dom"
import Loading from "../Loading"

const ReplyForm = ({ replyTo }: { replyTo: number }) => {
  const content = useField("text")
  const { reply, loading } = useCreateMessage()
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await reply(content.input.value, replyTo)
    content.reset()
    navigate(`/message/${replyTo}`)

  }



  return <div>
    <form onSubmit={handleSubmit}>
      <p>reply</p>
      <input {...content.input} />
      {loading ? <Loading /> : <button type="submit">Send</button>}
    </form>
  </div>

}

export default ReplyForm