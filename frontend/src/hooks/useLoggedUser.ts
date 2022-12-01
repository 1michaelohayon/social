import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_LOGGED_USER } from '../graphql/queries'
import { User } from '../types';
const useLoggedUser = () => {
  const [logged, setLoggedUser] = useState<User | null>(null);
  const response = useQuery(GET_LOGGED_USER, {
    fetchPolicy: 'cache-and-network'
  });

  const loading = response.loading;

  const fetchLoggedUser = async () => {
    if (response.data) {
      setLoggedUser(response.data.me)
    }
  };

  useEffect(() => {
    if (response.data) {
      fetchLoggedUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response.data]);

  return { logged, loading, refetch: response.refetch, };

};

export default useLoggedUser;