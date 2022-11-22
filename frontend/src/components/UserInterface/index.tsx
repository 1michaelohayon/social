import { useApolloClient } from "@apollo/client";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Togglable from "../Toggleable";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext } from "react";

const UserInterface = () => {
  const apolloClient = useApolloClient();
  const { logged, loading } = useContext(UserContext);
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('socialPlatformUserToken');
    apolloClient.resetStore()
  }


  if (loading) {
    return <div>loading...</div>
  } else if (logged) {
    return <div>
      logged <button onClick={logout}>logout</button>
      <button onClick={() => navigate(`/${logged.profileName}`)}>My Page</button>
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

