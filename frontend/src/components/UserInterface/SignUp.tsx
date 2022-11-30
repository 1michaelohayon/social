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
      username.setNotification("Username is required")
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(username.input.value)) {
      username.setNotification("Username must be a valid email")
    } else if (username.input.value.length < 2 || username.input.value.length > 70) {
      username.setNotification("Username must be between 2 and 70 characters")
    }
    else if (!name.input.value) {
      name.setNotification("Name is required")
    } else if (name.input.value.length < 2 || name.input.value.length > 40) {
      name.setNotification("Name must be between 2 and 40 characters")
    } else if (password.input.value.length < 3 || password.input.value.length > 20) {
      password.setNotification("Password must be between 3 and 20 characters")
    } else if (!password.input.value) {
      password.setNotification("Password is required")
    } else if (password.input.value !== passwordConfirm.input.value) {
      passwordConfirm.setNotification("Passwords do not match")
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
        username.setNotification("Username already exists")
      }
    }
  }



  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <p>{username.notify}</p>
        <Input {...username.input} placeholder="email" />
        <p>{name.notify}</p>
        <Input {...name.input} placeholder="name" />
        <p>{password.notify}</p>
        <Input {...password.input} placeholder="password" />
        <p>{passwordConfirm.notify}</p>
        <Input {...passwordConfirm.input} placeholder="password confirm" />
        <br />
        <Button type="submit">Sign Up</Button>
        <SecondryButton onClick={() => setShow(false)}>Cancel</SecondryButton>
      </form>
    </Container>
  )
}

export default SignUp