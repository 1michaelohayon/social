import useEditUser from "../../hooks/useEditUser"
import useField from "../../hooks/useField"

const UserSettings = () => {
  const { editUser, loading } = useEditUser()
  const profileName = useField("text")
  const pictureUrl = useField("text")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(profileName.input.value, pictureUrl.input.value);
    try {

      await editUser({
        profileName: profileName.input.value,
        pictureUrl: pictureUrl.input.value
      })

      profileName.reset()
      pictureUrl.reset()

    } catch (error) {
      console.log(error);
    }
  }

  return <div>

    <form onSubmit={handleSubmit}>
      <p>edit profile</p>
      <input {...profileName.input} placeholder="profile name" />
      <input {...pictureUrl.input} placeholder="profile picture url" />
      {loading ? <div>loading...</div> : <button type="submit">Save</button>}
    </form>
  </div>
}

export default UserSettings