import UserInterface from "./UserInterface"
import AppBarTab from "./AppBarTab"
import { Container, ProfileImg } from "../theme/appBar"
import { useState } from "react"
import SearchedMessages from "./Messages/SearchedMessages"
import useField from "../hooks/useField"
const profilePicture = require("../theme/assets/profilePicture.png")
const AppBar = () => {
  const [show, setShow] = useState(false)
  const search = useField("text");



  return <>
    <Container>
      <AppBarTab title="Messages" to="/" />
      <input {...search.input} placeholder="Search Messages"/>
     <ProfileImg src={profilePicture} onClick={() => setShow(!show)}/>
    </Container>
    
    <UserInterface show={show} setShow={setShow} />
    <SearchedMessages search={search.input.value} clear={search.reset} />
  </>
}

export default AppBar