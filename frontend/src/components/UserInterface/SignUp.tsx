import useField from "../../hooks/useField"
import useSignUp from "../../hooks/useSignUp"
import useSignIn from "../../hooks/useSignIn"
import { NewUser, Credentials } from "../../types"

const SignUp = () => {
  const { signUp } = useSignUp()
  const { signIn } = useSignIn()
  const username = useField('text')
  const name = useField('text')
  const password = useField('password')
  const passwordConfirm = useField('password')



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
    <div>
      <form onSubmit={handleSubmit}>
        <input {...username.input} placeholder="email" />
        <input {...name.input} placeholder="name" />
        <input {...password.input} placeholder="password" />
        <input {...passwordConfirm.input} placeholder="password confirm" />
        <button type="submit">SIGN UP!</button>
      </form>
    </div>
  )
}

export default SignUp