import useField from "../../hooks/useField"
import useCreateMessage from "../../hooks/useCreateMessage"
import { useNavigate, } from "react-router-dom"
import Loading from "../Loading"
import { Input, Button } from "../../theme/message"

const ReplyForm = ({ replyTo }: { replyTo: number }) => {
  const content = useField("text")
  const { reply, loading } = useCreateMessage()
  const navigate = useNavigate()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (content.input.value.length < 1 || content.input.value.length > 280) {
      content.setNotification("Message must be between 1 and 280 characters")
    } else {
      try {
        await reply(content.input.value, replyTo)
        content.reset()
        navigate(`/message/${replyTo}`)
      } catch (error) {
        console.log(error)
        content.setNotification("You must be logged in to send a message")
      }
    }
  }


  return <div>
    <form onSubmit={handleSubmit}>
      <p>{content.notify}</p>
      <Input onChange={content.input.onChange} value={content.input.value} />
      <br/>
      <p>{`${content.input.value.length}/280`}</p>
      <br />
      {loading ? <Loading /> : <Button type="submit">Send</Button>}
    </form>
  </div>

}

export default ReplyForm