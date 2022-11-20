import useAddLike from "../hooks/useAddLike"
import { Message } from "../types"
import { useContext, useState } from "react"
import { UserContext } from "../App"
interface Props {
  message: Message,
}


const SingleMessage = ({ message }: Props) => {
  const [liked, setLiked] = useState(false)

  const { logged } = useContext(UserContext)

  const { likeMessage } = useAddLike()
  const { content, likes } = message


  const alreadyLiked = (id: number): boolean => logged.likedMessages.some((lm: any) => lm.message.id === message.id)

  const handleLike = () => {
    try {
      likeMessage(message.id)
      setLiked(true)
    } catch (error) {
      console.log(error)
    }
  }




  return <div>
    {content} {likes} {!logged ? null : liked || alreadyLiked(logged) ? "liked!" : <button onClick={handleLike}>like!</button>}

  </div>
}

export default SingleMessage