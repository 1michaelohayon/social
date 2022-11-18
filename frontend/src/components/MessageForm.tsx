import useField from "../hooks/useField"
import useCreateMessage from "../hooks/useCreateMessage"

const MessageForm = () => {
  const content = useField("text")
  const { addMessage } = useCreateMessage()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(content.input.value);
    await addMessage(content.input.value)
    content.reset()
  }



  return <div>
    <form onSubmit={handleSubmit}>
      <p>new message</p>
      <input {...content.input} />
      <button type="submit"> click here to submt</button>
    </form>
  </div>

}

export default MessageForm