
import { useMatch } from "react-router-dom"
import useFindUser from "../../hooks/useFindUser";
import { Message, Follower } from "../../types";
import SingleMessage from "../Messages/SingleMessage";
import useFollow from "../../hooks/useFollow";
import { useContext } from "react";
import { UserContext } from "../../App";
import { useState } from "react";
import Loading from "../Loading";
import Followers from "./Followers";
import {
    TopContainer,
    MiddleContainer,
    BottomContainer,
    ProfileImg,
    Name,
    ProfileName,
    Tag,
    Stat,
    Button
} from "../../theme/userPage";
const profilePicture = require("../../theme/assets/profilePicture.png")


const UserPage = () => {
    const match = useMatch("/:profileName")
    const { user, loading } = useFindUser({ profileName: match?.params.profileName?.toString() });
    const [display, setDisplay] = useState<JSX.Element | null>(null);
    const { followUser, result } = useFollow();
    const { logged } = useContext(UserContext);
    const [following, setFollowing] = useState(false)

    if (loading) return <Loading />
    if (!user) return <div>User not found</div>



    const loggedInterface = () => {
        const handleFollow = () => {
            followUser(user.id)
            setFollowing(true)
        }

        if (logged && logged.id !== user.id) {
            return <div>
                {following || (user.followers.some((f: Follower) => f.followerId === Number(logged.id)))
                    ? <div>Following</div>
                    : result.loading
                        ? <Loading />
                        : <Button onClick={handleFollow}>Follow</Button>}

                <br />

                {user.following.some((f: Follower) => f.userId === Number(logged.id))
                    ? <div>You are followed by {user.profileName}</div>
                    : null}

            </div>

        }
    }

    const userMessages = user.messages
        ? user.messages.map((message: Message) => <SingleMessage key={message.id} message={message} />)
        : <div>no messages</div>

    const followersIds: number[] = user.followers.map((f: Follower) => f.followerId)
    const followingIds: number[] = user.following.map((f: Follower) => f.userId)

    return <div>
        <TopContainer>
            <ProfileImg src={user?.pictureUrl
                ? user?.pictureUrl
                : profilePicture} alt={user.profileName} />
            <Name>
                {user.name}
            </Name>
            <ProfileName>
                @{user.profileName}
            </ProfileName>
        </TopContainer>
        <MiddleContainer>
            {loggedInterface()}

        </MiddleContainer>
        <BottomContainer>
            <div>
                <Stat>{userMessages.length} </Stat> <Tag onClick={() => setDisplay(userMessages)}> {"הודעות"}</Tag>
            </div>
            <div>
                <Stat >{user.following.length}</Stat> <Tag onClick={() => setDisplay(<Followers ids={followingIds} />)}>עוקב אחרי</Tag>
            </div>
            <div>
                <Stat>{user.followers.length}</Stat> <Tag onClick={() => setDisplay(<Followers ids={followersIds} />)}>עוקבים</Tag>
            </div>

        </BottomContainer>
        {display || userMessages}
    </div>


}

export default UserPage


