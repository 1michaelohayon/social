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
      username.setNotification("Username is required")
    } else if (!password.input.value) {
      password.setNotification("Password is required")
    } else {
      try {
        const creds: Credentials = { username: username.input.value, password: password.input.value }
        await signIn(creds);
      } catch (error) {
        console.log(error);
        username.setNotification("Username or password is incorrect")
      }
    }
  }




  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <p>{username.notify}</p>
        <Input {...username.input} placeholder="email" />
        <p>{password.notify}</p>
        <Input {...password.input} placeholder="password" />
        <br />
        <Button type="submit">Sign In</Button>
        <SecondryButton onClick={() => setShow(false)}>Cancel</SecondryButton>
      </form>
    </Container>
  )
}

export default SignIn