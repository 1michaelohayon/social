import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';


const useMessages = () => {


  const { data, loading, fetchMore, ...result } = useQuery(GET_MESSAGES, {
    fetchPolicy: 'cache-and-network'
  });

  return {
    messages: data?.allMessages,
    loading,
    ...result
  };
};

export default useMessages;