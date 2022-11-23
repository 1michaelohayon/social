import { useQuery } from '@apollo/client';
import { FIND_REPLIES } from '../graphql/queries';


const useFindReplies = ({ messageId }: { messageId: number }) => {


  const { data, loading } = useQuery(FIND_REPLIES, {
    variables: { messageId: messageId },
  });

  return {
    messages: data?.findReplies,
    loading,
  };
};

export default useFindReplies;