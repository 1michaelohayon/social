import { useQuery } from '@apollo/client';
import { SEARCH_MESSAGES } from '../graphql/queries';


const useSearchMessages = ({ input }: { input: string | undefined }) => {


  const { data, loading } = useQuery(SEARCH_MESSAGES, {
    variables: { search: input },
    fetchPolicy: 'cache-and-network',
  });

  return {
    messages: data?.searchMessages,
    loading,
  };
};

export default useSearchMessages;