import { useApolloClient } from "@apollo/client";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext, useState } from "react";
import { User } from "../../types"
import Loading from "../Loading";
import { Container, Button } from "../../theme/userMenu"

const UserInterface = ({ show, setShow }: { show: boolean, setShow: any }) => {
  const apolloClient = useApolloClient();
  const { logged, loading } = useContext(UserContext);
  const navigate = useNavigate()
  const [page, setPage] = useState("")

  if (!show) return null


  const handleClick = (to: string) => {
    navigate(to)
    setShow(false)
  }

  const logout = () => {
    localStorage.removeItem('socialPlatformUserToken');
    apolloClient.resetStore()
    setShow(false)
    navigate("/")
  }

  const user: User | null = logged

  if (loading) {
    return <Loading />
  } else if (user) {
    return <Container>
      {user.profileName}
      <Button onClick={() => handleClick(`/${user.profileName}`)}>My Page</Button>
      <Button onClick={() => handleClick("/settings")}>Settings</Button>
      <Button onClick={logout}>logout</Button>
      <Button onClick={() => setShow(false)}>close</Button>
    </Container>
  }




  return (
    <div>
      <SignIn show={page === "SignIn"} setShow={setPage} />
      <SignUp show={page === "SignUp"} setShow={setPage} />
      <Container>
        <Button onClick={() => setPage("SignIn")}>Sign in</Button>
        <Button onClick={() => setPage("SignUp")}>Sign up</Button>
      </Container>

    </div>
  );
};

export default UserInterface;



