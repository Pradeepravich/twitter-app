import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";
import axios from "axios";
import useCommentsByPostApi from "../services/useCommentsByPostApi";
import { Button, Container, CssBaseline, TextField } from "@mui/material";
import moment from "moment";
import useAuth from "../hooks/useAuth";
import usePostByIdApi from "../services/usePostByIdApi";
import useUserByIdApi from "../services/useUserByIdApi";
import useLogout from "../hooks/useLogout";
import { logout } from "../utils/reusable";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditComment from "../components/EditComment";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>(); // Access the 'id' from the URL
  //   console.log("PostDetail", id);
  // const [post, setPost] = useState<any>(null);
  const [comment, setComment] = useState<any>("");
  const [comments, setComments] = useState<any>([]);
  const { userData } = useAuth();

  // console.log("userData", userData);
  const { getComments } = useCommentsByPostApi(id as string);

  const { post, getPost } = usePostByIdApi(id as string);
  const { user, getUser } = useUserByIdApi(userData?.id as string);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await getComments();
        setComments(response);
        getUser();
        getPost();
      } catch (error) {
        throw new Error("Error fetching post details:", error);
      }
    };
    if (id) {
      fetchPostDetails();
    }
  }, [getComments, getPost, getUser, id]);

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

  // console.log("comments", comments);
  // console.log("id", id);
  // console.log("post", post);
  // console.log("user", user);

  return (
    <>
      <Container>
        <CssBaseline />
        <div className="mt-4">
          <div className="flex flex-wrap justify-between items-center">
            <Button
              variant="contained"
              color="primary"
              startIcon={<ArrowBackIosIcon />}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => logout(navigate)}
            >
              Logout
            </Button>
          </div>
          <div className="text-center mt-8 w-[50%] mx-auto ">
            {id ? (
              <div>
                <h1>Title: {post?.title}</h1>
                <p>Description: {post?.description}</p>
                <p>Author: {user?.name}</p>
                <p>
                  Created:{" "}
                  {moment(post?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </p>
                <p>
                  Updated:{" "}
                  {moment(post?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                </p>
                <div className="mt-2 ">
                  {comments && comments?.length > 0 ? (
                    <>
                      <div className="border-4 border-indigo-600 p-4 my-12">
                        <span className="text-red-600 text-xl">Comments</span>
                        {comments?.map((item: any) => (
                          <div key={item?.id}>
                            <div className="mt-4 flex flex-wrap items-center justify-between ml-16 ">
                              <div className="text-left">{item?.text}</div>
                              <div>
                              <EditComment
                              rowId={item?.id}
                              setData={setComments}
                              data={comments}
                            />
                              <Button
                                variant="contained"
                                color="error"
                                className="!mx-2"
                                onClick={() => handleDelete(item?.id)}
                              >
                                Delete
                              </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="!mt-4 mb-16">
                        <TextField
                          label="Comments"
                          name="comments"
                          variant="outlined"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          size="small"
                        />
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleAddComment}
                          className="!ml-3"
                        >
                          Add Comment
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="!mt-4 mb-16">
                        <TextField
                          label="Comments"
                          name="comments"
                          variant="outlined"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          size="small"
                        />
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={handleAddComment}
                          className="!ml-3"
                        >
                          Add Comment
                        </Button>
                      </div>
                    </>
                  )}
                  <div className="!my-2"></div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default PostDetail;
