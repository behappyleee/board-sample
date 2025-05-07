import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { boardService, Post } from '../../services/BoardService';
import { CommentSection } from '../CommentSection';

const BoardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await boardService.getPost(Number(id));
        setPost(data);
        setError(null);
      } catch (err) {
        setError('게시글을 불러오는데 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await boardService.deletePost(Number(id));
      navigate('/board');
    } catch (err) {
      setError('게시글 삭제에 실패했습니다.');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center p-4">
        게시글이 존재하지 않습니다.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">게시글 상세</h1>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{post.title}</h2>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
            <span>작성자: {post.author}</span>
            <span>작성일: {post.createdAt}</span>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-4">
          <button
            onClick={() => navigate('/board')}
            className="btn btn-secondary"
          >
            목록
          </button>
          <button
            onClick={() => navigate(`/board/edit/${id}`)}
            className="btn btn-primary"
          >
            수정
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-secondary"
          >
            삭제
          </button>
        </div>
      </div>

      <CommentSection postId={Number(id)} />
    </div>
  );
};

export default BoardDetail; 