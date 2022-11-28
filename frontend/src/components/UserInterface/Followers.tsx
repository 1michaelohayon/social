import useGetFollowers from "../../hooks/useGetFollowers";
import Loading from "../Loading";
import { User } from "../../types";


const Followers = ({ ids }: { ids: number[] }) => {
  const { users, loading } = useGetFollowers({ ids });
  if (loading) return <Loading />;
  
  const followers = users.map((u: User) => <Follower key={u.id} user={u}/>)

  if (!followers) return <div>It's empty in here...</div>;

  return <div>
    {followers}
  </div>;
}

export default Followers;


const Follower = ({ user }: { user: User }) => {
  return <div>
   {user.name}
  </div>
}
