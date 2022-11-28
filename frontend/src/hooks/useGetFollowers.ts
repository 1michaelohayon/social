import { useQuery } from '@apollo/client';
import { GET_USERS } from '../graphql/queries';


const useGetFollowers = ({ ids }: { ids: number[] }) => {


  const { data, refetch, loading } = useQuery(GET_USERS, {
    variables: { ids: ids },
    fetchPolicy: 'cache-and-network',
  });

  return {
    users: data?.users,
    loading,
    refetch
  };
};

export default useGetFollowers;