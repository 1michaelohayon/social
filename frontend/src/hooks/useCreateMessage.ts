import { useMutation } from "@apollo/client";
import { ADD_MESSAGE } from "../graphql/mutation";


const useCreateMessage = () => {
  const [mutate, result] = useMutation(ADD_MESSAGE);

  const addMessage = async (content: string) => {

    const { data } = await mutate({ variables: { content } })
    return data
  };


  const reply = async (content: string, reply: number) => {
    const { data } = await mutate({ variables: { content, reply } })
    return data
  }

  return { addMessage, reply, result, loading: result.loading };
};

export default useCreateMessage