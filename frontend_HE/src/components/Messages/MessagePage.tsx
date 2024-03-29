import { Message } from "../../types";
import SingleMessage from "./SingleMessage";
import useFindReplies from "../../hooks/useFindReplies";
import { useMatch } from "react-router-dom";
import Loading from "../Loading";
import { MainMessageContainer, ReplyContainer } from "../../theme/message";
import Togglable from "../Togglable";
import MessageForm from "./MessageForm";

const MessagePage = () => {
    const match = useMatch("/message/:id");
    const { messages, loading } = useFindReplies({ messageId: Number(match?.params.id) });

    if (loading) return <Loading />;
    if (!messages) return <div>no messages</div>;


    const message: Message = messages.find((m: Message) => m.id === match?.params.id);
    const replies: Message[] = messages.filter((m: Message) => m.id !== match?.params.id);



    if (!message) return <>
        <Togglable buttonLabel="הודעה חדשה" children={<MessageForm />} />

        <div> message not found</div>
    </>;

    return <>
        <MainMessageContainer>
            <SingleMessage message={message} />
        </MainMessageContainer>

        <ReplyContainer>
            {replies ?
                replies.map((m: Message) => <SingleMessage key={m.id} message={m} />)
                : null}
        </ReplyContainer>
    </>;

};

export default MessagePage;