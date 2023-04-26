import UserInterface from "./UserInterface"
import { Container, ProfileImg, Input, Title } from "../theme/appBar"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import SearchedMessages from "./Messages/SearchedMessages"
import useField from "../hooks/useField"
import { UserContext } from "../App"
import { useContext } from "react"
const profilePicture = require("../theme/assets/profilePicture.png")


const AppBar = () => {
    const [show, setShow] = useState(false)
    const search = useField("text");
    const { logged } = useContext(UserContext)
    const navigate = useNavigate()

    return <>
        <Container>
            <Title onClick={() => navigate("/")}>Meser</Title>
            <Input {...search.input} placeholder="חפש הודעות" />
            <ProfileImg src={logged ?
                logged?.pictureUrl
                    ? logged?.pictureUrl
                    : profilePicture
                : profilePicture} alt="me" onClick={() => setShow(!show)} />


        </Container>

        <UserInterface show={show} setShow={setShow} />
        <SearchedMessages search={search.input.value} clear={search.reset} />
    </>
}

export default AppBar