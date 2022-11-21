import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';


const useMessages = () => {


  const { data, loading, fetchMore, ...result } = useQuery(GET_MESSAGES, {
    fetchPolicy: 'cache-and-network'
  });
console.log("data", data)
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.allMessages.pageInfo.hasNextPage;
    if (!canFetchMore) { return };
    console.log('fetchMore123');
    fetchMore({variables: {after: data?.allMessages.pageInfo.endCursor}});
  };
  return {
    messages: data?.allMessages,
    loading,
    fetchMore: handleFetchMore,
    ...result
  };
};

export default useMessages;