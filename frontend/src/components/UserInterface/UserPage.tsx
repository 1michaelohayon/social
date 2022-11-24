
import { useMatch } from "react-router-dom"
import useFindUser from "../../hooks/useFindUser";
import { Message, Follower } from "../../types";
import SingleMessage from "../Messages/SingleMessage";
import useFollow from "../../hooks/useFollow";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useState } from "react";
import Loading from "../Loading";


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
            : <button onClick={handleFollow}>Follow</button>}

        <br />

        {user.following.some((f: Follower) => f.userId === Number(logged.id))
          ? <div>You are followed by {user.profileName}</div>
          : null}

      </div>

    }
  }



  return <div>
    user: {user.profileName}
    <br />
    name: {user.name}
    <br />
    following: {user.following.length}
    <br />
    followers: {user.followers.length}
    <br />
    {loggedInterface()}


  </div>
}

export default UserPage


/*
    {user.messages
      ? user.messages.map((message: Message) => <SingleMessage key={message.id} message={message} />)
      : <div>no messages</div>}
      */

