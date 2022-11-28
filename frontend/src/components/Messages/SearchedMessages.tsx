import Loading from "../Loading";
import { Message } from "../../types";
import useSearchMessages from "../../hooks/useSearchMessages";
import { useDebounce } from 'use-debounce';
import {
  SearchItem,
  ProfileImg,
  UserContainer,
  MessageContainer,
  SearchedContainer,
  SecondryButton
} from "../../theme/userMenu";
import { useNavigate } from "react-router-dom";
const profilePicture = require("../../theme/assets/profilePicture.png")



const SearchedMessages = ({ search, clear }: { search: string, clear: any }) => {
  const [searchDebounce] = useDebounce(search, 1000)

  const { messages, loading } = useSearchMessages({ input: searchDebounce });

  if (!search) return null
  if (loading) return <Loading />
  if (!messages) return <div>not found</div>



  return <SearchedContainer>
    {messages.map((m: Message) => <SearchedMessage key={m.id} message={m} clear={clear} />)}
    <SecondryButton onClick={() => clear()}>Clear</SecondryButton>
  </SearchedContainer>
}

export default SearchedMessages


const SearchedMessage = ({ message, clear }: { message: Message, clear: any }) => {
  const navigate = useNavigate()
  const truncate = (input: string, n: number) => {
    return (input.length > n) ? input.slice(0, n - 1) + '...' : input;
  };


  const handleUserClick = () => {
    navigate(`/${message.user.profileName}`)
    clear()
  }

  const handleMessageClick = () => {
    navigate(`/message/${message.id}`)
    clear()
  }


  return <div>
    <SearchItem>
      <UserContainer onClick={() => handleUserClick()}>
        <ProfileImg src={message?.user?.pictureUrl ? message.user.pictureUrl : profilePicture} alt={message.user.name} />
        {message.user.name}
      </UserContainer>
      <MessageContainer onClick={() => handleMessageClick()}>
        {truncate(message.content, 24)}
      </MessageContainer>
    </SearchItem>
  </div>
}