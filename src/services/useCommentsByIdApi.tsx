import { useCallback } from 'react';
import { api } from '../assets/static/ApiRoutes';
import axiosInstance from '../utils/axios';
import useAsync from '../hooks/useAsync';


const useCommentsByIdApi = (commentId: string) => {
  const call = useCallback(async () => {
    try {
      const res = await axiosInstance.get<any>(
        api.getCommentsById(commentId)
      );
      return res.data    
      
    } catch (error) {
      throw new Error(error);
    }
  }, [commentId]);

  const { isLoading, value, execute } = useAsync(
    call,
    false,
    undefined,    
  );

  return {
    isLoading,
    comments: value,
    getComments: execute,
  };
};

export default useCommentsByIdApi;
