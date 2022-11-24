import useField from "../../hooks/useField"
import useCreateMessage from "../../hooks/useCreateMessage"
import Loading from "../Loading"


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
      <input {...content.input} />
      {loading ? <Loading /> : <button type="submit">Send</button>}
    </form>
  </div>

}

export default MessageForm