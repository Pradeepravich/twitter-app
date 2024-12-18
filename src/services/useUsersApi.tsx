import { useCallback } from 'react';
import { api } from '../assets/static/ApiRoutes';
import axiosInstance from '../utils/axios';
import useAsync from '../hooks/useAsync';




const useUsersApi = (userId: string) => {
  const call = useCallback(async () => {
    try {
      const res = await axiosInstance.get<any>(
        api.getUserById(userId)
      );
      return res.data    
      
    } catch (error) {
      throw new Error(error);
    }
  }, [userId]);

  const { isLoading, value, execute } = useAsync(
    call,
    false,
    undefined,    
  );

  return {
    isLoading,
    user: value,
    getUser: execute,
  };
};

export default useUsersApi;
