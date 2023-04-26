import useEditUser from "../../hooks/useEditUser"
import useField from "../../hooks/useField"
import Loading from "../Loading"


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

        <form style={{ textAlign: "center", direction: "rtl" }} onSubmit={handleSubmit}>
            <p >ערוך פרופיל</p>
            <input {...profileName.input} placeholder="שם המשתמש" />
            <input {...pictureUrl.input} placeholder="Picture URL --> תמונת פרופיל" />
            {loading ? <Loading /> : <button type="submit">שמור</button>}
        </form>
    </div>
}

export default UserSettings