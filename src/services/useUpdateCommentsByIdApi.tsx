import { useCallback } from "react";
import { api } from "../assets/static/ApiRoutes";
import axiosInstance from "../utils/axios";
import useAsync from "../hooks/useAsync";

interface CommentRequest {
  id: string;
  text: string;
  postId?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const useUpdateCommentsByIdApi = () => {
  const call = useCallback(async (params: CommentRequest = {} as CommentRequest) => {
    try {
      const { id, ...rest } = params;
      const res = await axiosInstance.put<CommentRequest>(api.updateCommentById(id),rest);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const { execute } = useAsync(call, false);

  return {    
    updateComment: execute,
  };
};

export default useUpdateCommentsByIdApi;
