import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import axios from "axios";
import useCommentsByPostApi from "../services/useCommentsByPostApi";
import { Button, TextField } from "@mui/material";
import moment from "moment";
import useAuth from "../hooks/useAuth";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>(); // Access the 'id' from the URL
  //   console.log("PostDetail", id);
  const [post, setPost] = useState<any>(null);
  const [comment, setComment] = useState<any>("");
  const [comments, setComments] = useState<any>([]);
  const { userData } = useAuth();
  // console.log("userData", userData);
  const { comments: postComments, getComments } = useCommentsByPostApi(
    id as string
  );

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        throw new Error("Error fetching post details:", error);
      }
    };
    if (id) {
      fetchPostDetails();
      getComments();
      setComments(postComments);
    }
  }, [postComments, getComments, id]);

  const handleAddComment = async () => {
    try {
      if (!comment) {
        return;
      }
      const response = await axios.post(`${API_BASE_URL}/comments`, {
        postId: id,
        userId: userData?.id || "",
        text: comment,
        created: moment().toISOString(),
      });
      setComments((prev) => [...prev, response.data]);
      setComment("");
      getComments();
    } catch (error) {
      throw new Error("Error adding comment:", error);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      await axios.delete(`${API_BASE_URL}/comments/${commentId}`);
      setComments(comments?.filter((item: any) => item?.id !== commentId));
      //   setData(data?.filter((item: any) => item?.id !== rowId));
    } catch (error) {
      throw new Error("Error deleting post:", error);
    }
  };

  console.log("comments", comments);

  return (
    <div className="text-center mt-8">
      {post ? (
        <div>
          <h1>Title: {post.title}</h1>
          <p>Description: {post.description}</p>
          <div className="mt-4">
            {comments && comments.length > 0 ? (
              <>
                <span>
                  Comments:{" "}
                  {comments.map((comment) => (
                    <div key={comment.id}>
                      <p className="mt-4">
                        {comment.text}
                        <Button
                          variant="contained"
                          color="error"
                          className="!mx-2"
                          onClick={() => handleDelete(comment?.id)}
                        >
                          Delete
                        </Button>
                      </p>
                    </div>
                  ))}
                </span>
                <div className="!mt-4">
                  <TextField
                    label="Comments"
                    name="comments"
                    variant="outlined"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    size="small"
                  />
                  <Button onClick={handleAddComment}>Add Comment</Button>
                </div>
              </>
            ) : (
              <div className="!mt-4">
                <TextField
                  label="Comments"
                  name="comments"
                  variant="outlined"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  size="small"
                />
                <Button onClick={handleAddComment}>Add Comment</Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PostDetail;
