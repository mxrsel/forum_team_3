export interface User {
  username: string;
  token: string;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  success: boolean;
  message: {
    [key: string]: string;
  };
}

export interface Posts {
  _id: string;
  user: string;
  postTitle: string;
  commentCount: number;
  postContent: string;
  postImage: string | null;
  datetime: string;
}

export interface PostMutation {
  postTitle: string;
  postContent: string | null;
  images: File | null;
}

export type ApiPosts = Omit<Posts, '_id'>;
