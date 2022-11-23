import { useApolloClient } from "@apollo/client";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Togglable from "../Toggleable";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext } from "react";
import { User } from "../../types"
const UserInterface = () => {
  const apolloClient = useApolloClient();
  const { logged, loading } = useContext(UserContext);
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('socialPlatformUserToken');
    apolloClient.resetStore()
  }

  const user: User | null = logged

  if (loading) {
    return <div>loading...</div>
  } else if (user) {
    return <div>
      {user.profileName} <button onClick={logout}>logout</button>
      <button onClick={() => navigate(`/${user.profileName}`)}>My Page</button>
      <button onClick={() => navigate("/settings")}>Settings</button>
    </div>
  }




  return (
    <div>
      <Togglable buttonLabel="Sign In" children={<SignIn />} />
      or
      <Togglable buttonLabel="Sign Up" children={<SignUp />} />
    </div>
  );
};

export default UserInterface;

