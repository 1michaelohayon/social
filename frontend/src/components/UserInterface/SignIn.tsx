import useSignIn from "../../hooks/useSignIn"
import useField from "../../hooks/useField"
import { Credentials } from "../../types"
import Loading from "../Loading"
import { Container, Input, Button, SecondryButton } from "../../theme/signin"

const SignIn = ({ show, setShow}: { show: boolean, setShow: any }) => {
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
    try {
      const creds: Credentials = { username: username.input.value, password: password.input.value }
      await signIn(creds);
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input {...username.input} placeholder="email" />
        <Input {...password.input} placeholder="password" />
        <br />
        <Button type="submit">Sign In</Button>
        <SecondryButton onClick={()=> setShow(false)}>Cancel</SecondryButton>
      </form>
    </Container>
  )
}

export default SignIn