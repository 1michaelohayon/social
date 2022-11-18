import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../graphql/mutation";


const useCreateMessage = () => {
  const [mutate, result] = useMutation(ADD_MESSAGE);

  const addMessage = async (content: string) => {

    const { data } = await mutate({ variables: { content } })
    return data
  };

  return { addMessage, result };
};

export default useCreateMessage