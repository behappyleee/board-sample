import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { boardService, Post } from '../../services/boardService';

const BoardEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await boardService.getPost(Number(id));
        setTitle(post.title);
        setContent(post.content);
        setAuthor(post.author);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await boardService.updatePost(Number(id), {
        title,
        content,
        author,
      });
      navigate(`/board/${id}`);
    } catch (err) {
      setError('게시글 수정에 실패했습니다.');
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

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">글수정</h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
          />
        </div>
        
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
            작성자
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="input"
            required
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            내용
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea"
            required
          />
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/board/${id}`)}
            className="btn btn-secondary"
          >
            취소
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardEdit; 