import useAddLike from "../../hooks/useAddLike"
import { Message } from "../../types"
import { useContext, useState } from "react"
import { UserContext } from "../../App"
import { User, likedMessage } from "../../types"
import ReplyForm from "./ReplyForm"
import Togglable from "../Togglable"
import {
  Container,
  TopContainer,
  MiddleContainer,
  BottomContainer,
  ProfileImg
} from "../../theme/message"
const profilePicture = require("../../theme/assets/profilePicture.png")


interface Props {
  message: Message,
}


const SingleMessage = ({ message }: Props) => {
  const [liked, setLiked] = useState(false)
  const { logged } = useContext(UserContext)
  const { likeMessage } = useAddLike()
  const { content, likes } = message
  const [updatedLikes, setUpdatedLikes] = useState(likes)
  const user: User | null = logged


  const alreadyLiked = () => message.likedBy?.some((lm: likedMessage) => lm.user?.id === user?.id)


  const handleLike = () => {
    try {
      likeMessage(Number(message.id))
      setLiked(true)
      setUpdatedLikes(likes + 1)
    } catch (error) {
      console.log(error)
    }
  }


console.log(message);
  return <Container>
    <TopContainer>
      <ProfileImg src={
        message.user.pictureUrl
          ? message.user.pictureUrl
          : profilePicture
      } alt="profile" />
      {message.user.name}
    </TopContainer>




    <MiddleContainer>
      {content}
    </MiddleContainer>



    <BottomContainer>
      {updatedLikes} {!user ? null : liked || alreadyLiked() ? "liked!" : <button onClick={handleLike}>like!</button>}
      <Togglable children={<ReplyForm replyTo={Number(message.id)} />} buttonLabel="reply" />

    </BottomContainer>


  </Container>
}

export default SingleMessage