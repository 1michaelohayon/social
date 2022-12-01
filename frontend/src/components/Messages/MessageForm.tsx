import useField from "../../hooks/useField"
import useCreateMessage from "../../hooks/useCreateMessage"
import Loading from "../Loading"
import { Input, Button } from "../../theme/message"

const MessageForm = () => {
  const content = useField("text")
  const { addMessage, loading } = useCreateMessage()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (content.input.value.length < 1 || content.input.value.length > 280) {
      content.setNotification("Message must be between 1 and 280 characters")
    } else {
      try {
        await addMessage(content.input.value)
        content.reset()
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
      <br />
      {content.input.value.length > 280
        ? <p style={{ color: "red" }}>{`${content.input.value.length}/280`}</p>
        : <p>{`${content.input.value.length}/280`}</p>}
      <br />
      {loading ? <Loading /> : <Button type="submit">Send</Button>}
    </form>
  </div>

}

export default MessageForm