import useSignIn from "../../hooks/useSignIn"
import useField from "../../hooks/useField"
import { Credentials } from "../../types"
import Loading from "../Loading"
import { Container, Input, Button, SecondryButton } from "../../theme/signin"

const SignIn = ({ show, setShow }: { show: boolean, setShow: any }) => {
    const username = useField('text')
    const password = useField('password')
    const { signIn, result } = useSignIn();
    if (!show) {
        document.body.style.overflow = "visible"
        return null
    } else {
        document.body.style.overflow = "hidden"
    }

    if (result.loading) { return <Loading /> }



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!username.input.value) {
            username.setNotification("נדרש שם משתמש")
        } else if (!password.input.value) {
            password.setNotification("נדרש סיסמה")
        } else {
            try {
                const creds: Credentials = { username: username.input.value, password: password.input.value }
                await signIn(creds);
            } catch (error) {
                console.log(error);
                username.setNotification("שם משתמש או סיסמה שגויים")
            }
        }
    }




    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <p>{username.notify}</p>
                <Input {...username.input} placeholder="אימייל" />
                <p>{password.notify}</p>
                <Input {...password.input} placeholder="סיסמה" />
                <br />
                <Button type="submit">התחבר</Button>
                <SecondryButton onClick={() => setShow(false)}>ביטול</SecondryButton>
            </form>
        </Container>
    )
}

export default SignIn