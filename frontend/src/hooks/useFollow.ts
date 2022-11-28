import { useMutation } from "@apollo/client";
import { FOLLOW_USER } from "../graphql/mutation";

const useFollow = () => {
  const [mutate, result,] = useMutation(FOLLOW_USER);

  const followUser = async (userId: number) => {
    const { data } = await mutate({ variables: { userId: Number(userId) } })
    return data
  };

  return { followUser, result, loading: result.loading };
};

export default useFollow