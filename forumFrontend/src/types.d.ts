export interface User {
  username: string;
  token: string;
}

export interface PostMutation {
  postTitle: string;
  postContent: string | null;
  images: File | null;
}
