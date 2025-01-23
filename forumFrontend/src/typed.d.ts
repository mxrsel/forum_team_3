export interface User {
  username: string;
  _id: string;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface Posts {
  _id: string;
  user: string;
  postTitle: string;
  postContent: string;
  postImage: string | null;
  datetime: string;
}

export interface PostsMutation {
  user: string;
  postTitle: string;
  postContent: string;
  postImage: File | null;
  datetime: string;
}

export type ApiPosts = Omit<PostsMutation, '_id'>;
