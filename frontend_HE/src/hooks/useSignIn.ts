import { useMutation } from "@apollo/client";
import { SIGN_IN } from "../graphql/mutation";
import { useApolloClient } from "@apollo/client";
import { Credentials } from "../types";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const apolloClient = useApolloClient()


  const signIn = async (creds: Credentials) => {

    const { data } = await mutate({ variables: creds })
     localStorage.setItem('socialPlatformUserToken', data.login.value)

    apolloClient.resetStore()

    return data
  };

  return { signIn, result};
};

export default useSignIn