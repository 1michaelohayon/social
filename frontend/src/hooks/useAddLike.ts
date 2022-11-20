import { useMutation } from "@apollo/client";
import { ADD_LIKE } from "../graphql/mutation";

const useAddLike = () => {
  const [mutate, result,] = useMutation(ADD_LIKE);

  const likeMessage = async (messageId: number) => {
    const { data } = await mutate({ variables: { messageId: Number(messageId) } })
    return data
  };

  return { likeMessage, result };
};

export default useAddLike