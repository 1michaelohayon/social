import useSignIn from "../../hooks/useSignIn"
import useField from "../../hooks/useField"
import { Credentials } from "../../types"

const SignIn = () => {
  const username = useField('text')
  const password = useField('password')
  const { signIn, result } = useSignIn();

  if (result.loading) { return <div>loading...</div> }

  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const creds: Credentials = { username: username.input.value, password: password.input.value }
      const data = await signIn(creds);
      console.log('Data ', data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input {...username.input} placeholder="email" />
        <input {...password.input} placeholder="password" />
        <button type="submit">LOGIN!</button>
      </form>
    </div>
  )
}

export default SignIn