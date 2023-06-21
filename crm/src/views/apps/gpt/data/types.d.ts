export interface GPTDataResponse {
  data: GPTData;
}

export interface GPTData {
  id: string;
  title: string;
  category: string[];
  used: number;
  author: Author;
  input: string;
  output: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Author {
  name: string;
  avatar: string;
  followers: number;
}