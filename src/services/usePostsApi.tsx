import { useCallback } from 'react';
import { api } from '../assets/static/ApiRoutes';
import axiosInstance from '../utils/axios';
import useAsync from '../hooks/useAsync';




const usePostsApi = () => {
  const call = useCallback(async () => {
    try {
      const res = await axiosInstance.get<any[]>(
        api.getAllPosts()
      );
      return res.data    
      
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const { isLoading, value, execute } = useAsync(
    call,
    false,
    undefined,    
  );

  return {
    isLoading,
    posts: value,
    getPosts: execute,
  };
};

export default usePostsApi;
