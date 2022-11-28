import useField from "../../hooks/useField"
import useCreateMessage from "../../hooks/useCreateMessage"
import Loading from "../Loading"
import { Input, Button } from "../../theme/message"

const MessageForm = () => {
  const content = useField("text")
  const { addMessage, loading } = useCreateMessage()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await addMessage(content.input.value)
    content.reset()
  }



  return <div>
      <form onSubmit={handleSubmit}>
        <p>new message</p>
        <Input onChange={content.input.onChange} value={content.input.value} />
        <br />
        {loading ? <Loading /> : <Button type="submit">Send</Button>}
      </form>
  </div>

}

export default MessageForm