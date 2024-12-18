import { useCallback } from 'react';
import { api } from '../assets/static/ApiRoutes';
import axiosInstance from '../utils/axios';
import useAsync from '../hooks/useAsync';




const useUserInfoDataApi = (email: string, password: string) => {
  const call = useCallback(async () => {
    try {
      const res = await axiosInstance.get<any[]>(
        api.userInfoData(email,password)
      );
      return res.data    
      
    } catch (error) {
      throw new Error(error);
    }
  }, [email, password]);

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

export default useUserInfoDataApi;
