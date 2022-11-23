import { useQuery } from '@apollo/client';
import { FIND_REPLIES } from '../graphql/queries';


const useFindReplies = ({ messageId }: { messageId: number }) => {


  const { data, refetch, loading } = useQuery(FIND_REPLIES, {
    variables: { messageId: messageId },
    fetchPolicy: 'cache-and-network',
  });

  return {
    messages: data?.findReplies,
    loading,
    refetch
  };
};

export default useFindReplies;