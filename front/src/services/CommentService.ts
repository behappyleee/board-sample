import axios from 'axios';

const API_URL = 'http://localhost:8080/api/comments';

export interface Comment {
  id: number;
  postId: number;
  content: string;
  author: string;
  createdAt: string;
  parentId?: number; // 대댓글인 경우 부모 댓글의 ID
  replies?: Comment[]; // 대댓글 목록
}

export const commentService = {
  // 게시글의 댓글 목록 조회
  getComments: async (postId: number): Promise<Comment[]> => {
    const response = await axios.get(`${API_URL}/post/${postId}`);
    return response.data;
  },

  // 댓글 작성
  createComment: async (comment: Omit<Comment, 'id' | 'createdAt' | 'replies'>): Promise<Comment> => {
    const response = await axios.post(API_URL, comment);
    return response.data;
  },

  // 댓글 수정
  updateComment: async (id: number, content: string): Promise<Comment> => {
    const response = await axios.put(`${API_URL}/${id}`, { content });
    return response.data;
  },

  // 댓글 삭제
  deleteComment: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  },
}; 