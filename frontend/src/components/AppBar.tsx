import UserInterface from "./UserInterface"
import AppBarTab from "./AppBarTab"
import { Container, ProfileImg, Input} from "../theme/appBar"
import { useState } from "react"
import SearchedMessages from "./Messages/SearchedMessages"
import useField from "../hooks/useField"
import { UserContext } from "../App"
import { useContext } from "react"
const profilePicture = require("../theme/assets/profilePicture.png")


const AppBar = () => {
  const [show, setShow] = useState(false)
  const search = useField("text");
  const { logged } = useContext(UserContext)


  return <>
    <Container>
      <AppBarTab title="Messages" to="/" />
      <Input {...search.input} placeholder="Search Messages" />
      <ProfileImg src={logged ?
        logged?.pictureUrl
          ? logged?.pictureUrl
          : profilePicture
        : profilePicture} alt="profile" onClick={() => setShow(!show)} />


    </Container>

    <UserInterface show={show} setShow={setShow} />
    <SearchedMessages search={search.input.value} clear={search.reset} />
  </>
}

export default AppBar