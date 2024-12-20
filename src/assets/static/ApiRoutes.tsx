export const api = {
  userInfoData: (email: string, password: string) => `users?email=${email}&password=${password}`,  
  getAllPosts: () => `posts`,
  getPostById: (postId: string) => `posts/${postId}`,
  getCommentsByPost: (postId: string) => `comments${postId ? `?postId=${postId}` : ``}`,
  getUserById: (userId: string) => `users${userId ? `/${userId}` : ''}`,  
  updateCommentById: (commentId: string) => `comments/${commentId}`, 
  getCommentsById: (commentId: string) => `comments/${commentId}`, 
};
