import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../graphql/mutation";
import { NewUser } from "../types";
import { useApolloClient } from "@apollo/client";

const useSignUp = () => {
  const [mutate, result,] = useMutation(SIGN_UP);
  const apolloClient = useApolloClient()

  const signUp = async (input: NewUser) => {

    const { data } = await mutate({ variables: input })
    apolloClient.resetStore()

    return data
  };

  return { signUp, result };
};

export default useSignUp