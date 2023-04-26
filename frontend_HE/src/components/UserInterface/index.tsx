import { useApolloClient } from "@apollo/client";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { useContext, useState } from "react";
import { User } from "../../types"
import Loading from "../Loading";
import { Container, Button, SecondryButton } from "../../theme/userMenu"

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
            <Button onClick={() => handleClick(`/${user.profileName}`)}>העמוד שלי</Button>
            <Button onClick={() => handleClick("/settings")}>הגדרות</Button>
            <Button onClick={logout}>התנתק</Button>
            <SecondryButton onClick={() => setShow(false)}>סגור</SecondryButton>
        </Container>
    }




    return (
        <div>
            <SignIn show={page === "SignIn"} setShow={setPage} />
            <SignUp show={page === "SignUp"} setShow={setPage} />
            <Container>
                <Button onClick={() => setPage("SignUp")}>הרשמה</Button>
                <Button onClick={() => setPage("SignIn")}>התחבר</Button>
                <SecondryButton onClick={() => setShow(false)}>סגור</SecondryButton>
            </Container>

        </div>
    );
};

export default UserInterface;



