import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { boardService } from '../../services/boardService';

const BoardWrite: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await boardService.createPost({
        title,
        content,
        author,
      });
      navigate('/board');
    } catch (err) {
      setError('게시글 작성에 실패했습니다.');
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">글쓰기</h1>
      
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
            onClick={() => navigate('/board')}
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

export default BoardWrite; 