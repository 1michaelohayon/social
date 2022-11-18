
import { Message } from "../types"
const SingleMessage = ({ message }: { message: Message }) => {
  const { content, likes } = message
  return <div>
    {content} {likes}
  </div>
}

export default SingleMessage