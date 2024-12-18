import { useCallback } from 'react';
import { api } from '../assets/static/ApiRoutes';
import axiosInstance from '../utils/axios';
import useAsync from '../hooks/useAsync';


const usePostByIdApi = (postId: string) => {
  const call = useCallback(async () => {
    try {
      const res = await axiosInstance.get<any>(
        api.getPostById(postId)
      );
      return res.data    
      
    } catch (error) {
      throw new Error(error);
    }
  }, [postId]);

  const { isLoading, value, execute } = useAsync(
    call,
    false,
    undefined,    
  );

  return {
    isLoading,
    post: value,
    getPost: execute,
  };
};

export default usePostByIdApi;
