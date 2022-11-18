import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutation";
import { useApolloClient } from "@apollo/client";
import { Credentials } from "../types";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const apolloClient = useApolloClient()


  const signIn = async ({ username, password }: Credentials) => {
    const credentials = { username, password }
    const { data } = await mutate({ variables: credentials })
     localStorage.setItem('socialPlatformUserToken', data.login.value)

    apolloClient.resetStore()

    return data
  };

  return { signIn, result };
};

export default useSignIn