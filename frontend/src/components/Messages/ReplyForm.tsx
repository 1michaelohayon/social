import useField from "../../hooks/useField"
import useCreateMessage from "../../hooks/useCreateMessage"
import { useNavigate, } from "react-router-dom"
import Loading from "../Loading"
import { Input } from "../../theme/message"


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
      <Input  onChange={content.input.onChange} value={content.input.value} />
      <br/>
      {loading ? <Loading /> : <button type="submit">Send</button>}
    </form>
  </div>

}

export default ReplyForm