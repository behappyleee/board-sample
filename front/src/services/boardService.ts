import axios from 'axios';

const API_URL = 'http://localhost:8080/api/boards';

export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export const boardService = {
  // 게시글 목록 조회
  getPosts: async (): Promise<Post[]> => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  // 게시글 상세 조회
  getPost: async (id: number): Promise<Post> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // 게시글 작성
  createPost: async (post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
    const response = await axios.post(API_URL, post);
    return response.data;
  },

  // 게시글 수정
  updatePost: async (id: number, post: Partial<Post>): Promise<Post> => {
    const response = await axios.put(`${API_URL}/${id}`, post);
    return response.data;
  },

  // 게시글 삭제
  deletePost: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
}; 