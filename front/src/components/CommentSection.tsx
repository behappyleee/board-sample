import React, { useState, useEffect } from 'react';
import { Comment, commentService } from '../services/CommentService';

interface CommentSectionProps {
  postId: number;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      const fetchedComments = await commentService.getComments(postId);
      setComments(fetchedComments);
    } catch (error) {
      console.error('댓글을 불러오는데 실패했습니다:', error);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await commentService.createComment({
        postId,
        content: newComment,
        author: '사용자', // 실제로는 로그인된 사용자 정보를 사용해야 합니다
      });
      setNewComment('');
      loadComments();
    } catch (error) {
      console.error('댓글 작성에 실패했습니다:', error);
    }
  };

  const handleSubmitReply = async (e: React.FormEvent, parentId: number) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    try {
      await commentService.createComment({
        postId,
        content: replyContent,
        author: '사용자', // 실제로는 로그인된 사용자 정보를 사용해야 합니다
        parentId,
      });
      setReplyContent('');
      setReplyTo(null);
      loadComments();
    } catch (error) {
      console.error('답글 작성에 실패했습니다:', error);
    }
  };

  const renderComment = (comment: Comment) => (
    <div key={comment.id} className="comment-container mb-4">
      <div className="comment bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-start">
          <div>
            <span className="font-bold">{comment.author}</span>
            <span className="text-gray-500 text-sm ml-2">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <button
            onClick={() => setReplyTo(comment.id)}
            className="text-blue-500 hover:text-blue-700"
          >
            답글
          </button>
        </div>
        <p className="mt-2">{comment.content}</p>
        
        {replyTo === comment.id && (
          <form onSubmit={(e) => handleSubmitReply(e, comment.id)} className="mt-2">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="답글을 작성하세요"
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => setReplyTo(null)}
                className="mr-2 px-3 py-1 text-gray-600 hover:text-gray-800"
              >
                취소
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                답글 작성
              </button>
            </div>
          </form>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-8 mt-4">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="reply bg-gray-50 p-3 rounded-lg mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold">{reply.author}</span>
                    <span className="text-gray-500 text-sm ml-2">
                      {new Date(reply.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="mt-1">{reply.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="comment-section mt-8">
      <h3 className="text-xl font-bold mb-4">댓글</h3>
      
      <form onSubmit={handleSubmitComment} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-3 border rounded-lg"
          placeholder="댓글을 작성하세요"
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            댓글 작성
          </button>
        </div>
      </form>

      <div className="comments-list">
        {comments.map(renderComment)}
      </div>
    </div>
  );
}; 