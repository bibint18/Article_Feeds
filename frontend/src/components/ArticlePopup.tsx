import React from 'react';
import Button from './Shared/Button';

interface Article {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  category: { _id: string; name: string };
  author: { _id: string; firstName: string; lastName: string };
  likes: string[];
  dislikes: string[];
  blocked: string[];
  createdAt: string;
}

interface ArticlePopupProps {
  article: Article;
  userId: string;
  onClose: () => void;
  onInteraction: (articleId: string, action: 'like' | 'dislike' | 'block') => void;
}

const ArticlePopup: React.FC<ArticlePopupProps> = ({ article, userId, onClose, onInteraction }) => {
  const isLiked = article.likes.includes(userId);
  const isDisliked = article.dislikes.includes(userId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{article.title}</h2>
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
        )}
        <p className="text-gray-600 mb-6">{article.description}</p>
        <p className="text-sm text-gray-500 mb-2">
          By {article.author.firstName} {article.author.lastName}
        </p>
        <p className="text-sm text-gray-500 mb-2">Category: {article.category.name}</p>
        <p className="text-sm text-gray-500 mb-4">Tags: {article.tags.join(', ')}</p>
        <p className="text-sm text-gray-500 mb-4">
          Likes: {article.likes.length} | Dislikes: {article.dislikes.length}
        </p>
        <p className="text-sm text-gray-400">
          Posted on {new Date(article.createdAt).toLocaleDateString()}
        </p>
        <div className="flex justify-between mt-6 space-x-2">
          <Button
            onClick={() => onInteraction(article._id, 'like')}
            className={`px-4 py-2 bg-green-600 hover:bg-green-700 transition-colors duration-300 ${isLiked ? 'opacity-50' : ''}`}
            disabled={isLiked}
          >
            {isLiked ? 'Liked' : 'Like'}
          </Button>
          <Button
            onClick={() => onInteraction(article._id, 'dislike')}
            className={`px-4 py-2 bg-red-600 hover:bg-red-700 transition-colors duration-300 ${isDisliked ? 'opacity-50' : ''}`}
            disabled={isDisliked}
          >
            {isDisliked ? 'Disliked' : 'Dislike'}
          </Button>
          <Button
            onClick={() => onInteraction(article._id, 'block')}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 transition-colors duration-300"
          >
            Block
          </Button>
          <Button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticlePopup;