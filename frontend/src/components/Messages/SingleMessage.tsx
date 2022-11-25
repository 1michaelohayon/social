import useAddLike from "../../hooks/useAddLike"
import { Message } from "../../types"
import { useContext, useState } from "react"
import { UserContext } from "../../App"
import { User, likedMessage } from "../../types"
import ReplyForm from "./ReplyForm"
import Togglable from "../Togglable"
import { useNavigate } from "react-router-dom"
import {
  Container,
  TopContainer,
  MiddleContainer,
  BottomContainer,
  ProfileImg,
  Name,
  ProfileName,
} from "../../theme/message"
const profilePicture = require("../../theme/assets/profilePicture.png")




const SingleMessage = ({ message }: {message: Message}) => {
  const [liked, setLiked] = useState(false)
  const { logged } = useContext(UserContext)
  const { likeMessage } = useAddLike()
  const { content, likes } = message
  const [updatedLikes, setUpdatedLikes] = useState(likes)
  const navigate = useNavigate()
  const user: User | null = logged


  const alreadyLiked = () => message.likedBy?.some((lm: likedMessage) => lm.user?.id === user?.id)

  const goToMessage = () => navigate(`/message/${message.id}`)
  const goToProfile = () => navigate(`/${message.user?.profileName}`)

  const handleLike = () => {
    try {
      likeMessage(Number(message.id))
      setLiked(true)
      setUpdatedLikes(likes + 1)
    } catch (error) {
      console.log(error)
    }
  }


  return <Container>
    <TopContainer>
      <ProfileImg onClick={() => goToProfile()} src={
        message.user.pictureUrl
          ? message.user.pictureUrl
          : profilePicture
      } alt="profile" />
      <Name>
        {message.user.name}
      </Name>
      <ProfileName onClick={() => goToProfile()}>
        @{message.user.profileName}
      </ProfileName>
    </TopContainer>


    <MiddleContainer onClick={() => goToMessage()}>
      {content}
    </MiddleContainer>

    <BottomContainer>
      <div>
        {updatedLikes} {!user
          ? null
          : liked || alreadyLiked()
            ? "liked!"
            : <button onClick={handleLike}>like!</button>
        }
      </div>

      <Togglable children={<ReplyForm replyTo={Number(message.id)} />} buttonLabel="reply" />
    </BottomContainer>
  </Container>
}

export default SingleMessage