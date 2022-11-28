import useGetFollowers from "../../hooks/useGetFollowers";
import Loading from "../Loading";
import { User } from "../../types";
import { FollowersContainer, ProfileImg } from "../../theme/followers";
const profilePicture = require("../../theme/assets/profilePicture.png")


const Followers = ({ ids }: { ids: number[] }) => {
  const { users, loading } = useGetFollowers({ ids });
  if (loading) return <Loading />;

  const followers = users.map((u: User) => <Follower key={u.id} user={u} />)

  if (!followers) return <div>It's empty in here...</div>;

  return <div>
    {followers}
  </div>;
}

export default Followers;


const Follower = ({ user }: { user: User }) => {
  return <FollowersContainer>
    <div>
      <ProfileImg src={user?.pictureUrl ? user.pictureUrl : profilePicture} alt="profile" />
    </div>
    <div>
      {user.name}
    </div>
    <div>
      @{user.profileName}
    </div>
  </FollowersContainer>
}
