import useField from "../../hooks/useField"
import useSignUp from "../../hooks/useSignUp"
import useSignIn from "../../hooks/useSignIn"
import { NewUser, Credentials } from "../../types"
import { Container, Input, Button, SecondryButton } from "../../theme/signin"


const SignUp = ({ show, setShow }: { show: boolean, setShow: any }) => {
    const { signUp } = useSignUp()
    const { signIn } = useSignIn()
    const username = useField('text')
    const name = useField('text')
    const password = useField('password')
    const passwordConfirm = useField('password')
    if (!show) {
        document.body.style.overflow = "visible"
        return null
    } else {
        document.body.style.overflow = "hidden"
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!username.input.value) {
            username.setNotification("נדרש אימייל")
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username.input.value)) {
            username.setNotification("אימייל לא תקין")
        } else if (username.input.value.length < 2 || username.input.value.length > 70) {
            username.setNotification("שם המשתמש חייב להיות בין 2 ל-70 תווים")
        }
        else if (!name.input.value) {
            name.setNotification("נדרש שם")
        } else if (name.input.value.length < 2 || name.input.value.length > 40) {
            name.setNotification("השם חייב להיות בין 2 ל-40 תווים")
        } else if (password.input.value.length < 3 || password.input.value.length > 20) {
            password.setNotification("הסיסמה חייבת להיות בין 3 ל-20 תווים")
        } else if (!password.input.value) {
            password.setNotification("Password is required")
        } else if (password.input.value !== passwordConfirm.input.value) {
            passwordConfirm.setNotification("הסיסמאות לא תואמות")
        } else {

            try {
                if (password.input.value !== passwordConfirm.input.value) {
                    throw new Error('Passwords do not match')
                }
                const newUser: NewUser = {
                    username: username.input.value,
                    name: name.input.value,
                    password: password.input.value,
                }
                const res = await signUp(newUser)

                if (res.addUser.username === newUser.username) {
                    const creds: Credentials = {
                        username: newUser.username,
                        password: newUser.password
                    }
                    await signIn(creds)
                }
            } catch (error) {
                console.log(error);
                username.setNotification("שם משתמש תפוס")
            }
        }
    }



    return (
        <Container>
            <form onSubmit={handleSubmit}>
                <p>{username.notify}</p>
                <Input {...username.input} placeholder="אימייל" />
                <p>{name.notify}</p>
                <Input {...name.input} placeholder="שם" />
                <p>{password.notify}</p>
                <Input {...password.input} placeholder="סיסמה" />
                <p>{passwordConfirm.notify}</p>
                <Input {...passwordConfirm.input} placeholder="אימות סיסמה" />
                <br />
                <Button type="submit">הירשם</Button>
                <SecondryButton onClick={() => setShow(false)}>ביטול</SecondryButton>
            </form>
        </Container>
    )
}

export default SignUp