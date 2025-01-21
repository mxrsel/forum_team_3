export interface UserTypes {
  username: string;
  password: string;
  token: string;
}

export interface Post {
  _id: string;
  user: string;
  postTitle: string;
  postContent: string;
  postImage: string | null;
  datetime: string;
}

export interface Comment {
  _id: string;
  user: string;
  post: string;
  commentText: string;
}

export type PostWithoutId = Omit<Post, '_id'>;
export type CommentWithoutId = Omit<Comment, '_id'>;