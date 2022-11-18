import { useSubscription } from "@apollo/client";
import { Message } from "../types";
import { MESSAGE_ADDED } from "../graphql/queries";
import { useState } from "react";
const useMessageSubscribe = () => {
  const [newMessages, setNewMessages] = useState<Message[]>([]);
  useSubscription(MESSAGE_ADDED, {
    onData: ({ data }) => {
      if (!data.loading) {
        const messages = newMessages.concat(data.data.messageAdd);
        setNewMessages(messages);
      }
      console.log(data.data.messageAdd)
    }
  })


  return { newMessages };
};

export default useMessageSubscribe