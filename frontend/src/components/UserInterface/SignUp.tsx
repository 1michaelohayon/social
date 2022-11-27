import useField from "../../hooks/useField"
import useSignUp from "../../hooks/useSignUp"
import useSignIn from "../../hooks/useSignIn"
import { NewUser, Credentials } from "../../types"
import { Container, Input, Button, SecondryButton } from "../../theme/signin"


const SignUp = ({ show, setShow}: { show: boolean, setShow: any }) => {
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
    }
  }



  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Input {...username.input} placeholder="email" />
        <Input {...name.input} placeholder="name" />
        <Input {...password.input} placeholder="password" />
        <Input {...passwordConfirm.input} placeholder="password confirm" />
        <br/>
        <Button type="submit">Sign Up</Button>
        <SecondryButton onClick={()=> setShow(false)}>Cancel</SecondryButton>
      </form>
    </Container>
  )
}

export default SignUp