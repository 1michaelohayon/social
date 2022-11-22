
import { useMatch } from "react-router-dom"
import useFindUser from "../../hooks/useFindUser";
import { Message } from "../../types";
import SingleMessage from "../SingleMessage";

const UserPage = () => {
  const match = useMatch("/:profileName")

  const { user, loading } = useFindUser({ profileName: match?.params.profileName?.toString() });

  if (loading) return <div>Loading...</div>
  if (!user) return <div>User not found</div>


  return <div>
    user: {user.profileName}
    <br/>
    name: {user.name}

    {user.messages
      ? user.messages.map((message: Message) => <SingleMessage key={message.id} message={message} />)
      : <div>no messages</div>}
  </div>
}

export default UserPage