import { useQuery } from '@apollo/client';
import { FIND_USER } from '../graphql/queries';


const useFindUser = ({ profileName }: { profileName: string | undefined}) => {


  const { data, loading, ...result } = useQuery(FIND_USER, {
    variables: { profileName },
    fetchPolicy: 'cache-and-network'
  });


  return {
    user: data?.findUser,
    loading,
    ...result
  };
};

export default useFindUser;