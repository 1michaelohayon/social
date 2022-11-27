
import { useMatch } from "react-router-dom"
import useFindUser from "../../hooks/useFindUser";
import { Message, Follower } from "../../types";
import SingleMessage from "../Messages/SingleMessage";
import useFollow from "../../hooks/useFollow";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useState } from "react";
import Loading from "../Loading";
import {
  TopContainer,
  MiddleContainer,
  BottomContainer,
  ProfileImg,
  Name,
  ProfileName,
  Tag,
  Stat,
  Button
} from "../../theme/userPage";
const profilePicture = require("../../theme/assets/profilePicture.png")


const UserPage = () => {
  const match = useMatch("/:profileName")
  const { user, loading } = useFindUser({ profileName: match?.params.profileName?.toString() });

  const { followUser, result } = useFollow();
  const { logged } = useContext(UserContext);
  const [following, setFollowing] = useState(false)

  if (loading) return <Loading />
  if (!user) return <div>User not found</div>



  const loggedInterface = () => {
    const handleFollow = () => {
      followUser(user.id)
      setFollowing(true)
    }

    if (logged && logged.id !== user.id) {
      return <div>
        {following || (user.followers.some((f: Follower) => f.followerId === Number(logged.id)))
          ? <div>Following</div>
          : result.loading
            ? <Loading />
            : <Button onClick={handleFollow}>Follow</Button>}

        <br />

        {user.following.some((f: Follower) => f.userId === Number(logged.id))
          ? <div>You are followed by {user.profileName}</div>
          : null}

      </div>

    }
  }


  return <div>
    <TopContainer>
      <ProfileImg src={user?.pictureUrl
        ? user?.pictureUrl
        : profilePicture} alt={user.profileName} />
      <Name>
        {user.name}
      </Name>
      <ProfileName>
        @{user.profileName}
      </ProfileName>
    </TopContainer>
    <MiddleContainer>
      {loggedInterface()}

    </MiddleContainer>
    <BottomContainer>
      <div>
        <Stat>{user.following.length}</Stat> <Tag>following</Tag>
      </div>
      <div>
        <Stat>{user.followers.length}</Stat> <Tag>followers</Tag>
      </div>

    </BottomContainer>
    {user.messages
      ? user.messages.map((message: Message) => <SingleMessage key={message.id} message={message} />)
      : <div>no messages</div>}
  </div>


}

export default UserPage


