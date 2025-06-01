import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { getMyArticles, deleteArticle } from '../services/api/articleService';
import Button from './Shared/Button';
import ArticleForm from './ArticleForm';
import Swal from 'sweetalert2';
import Pagination from './Pages/Pagination';
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

const MyArticles: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [editArticle, setEditArticle] = useState<Article | null>(null);

  useEffect(() => {

    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await getMyArticles(page, limit, search);
        setArticles(response.articles);
        setTotal(response.total);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [user, navigate, page, search,limit]);

  // const handlePageChange = (newPage: number) => {
  //   if (newPage >= 1 && newPage <= Math.ceil(total / limit)) {
  //     setPage(newPage);
  //   }
  // };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleEdit = (article: Article) => {
    setEditArticle(article);
  };

  const handleDelete = async (articleId: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This article will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await deleteArticle(articleId);
        setArticles((prev) => prev.filter((article) => article._id !== articleId));
        setTotal((prev) => prev - 1);
        Swal.fire('Deleted!', 'Your article has been deleted.', 'success');
      } catch (error: any) {
        Swal.fire('Error!', error.message || 'Failed to delete article.', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-700">My Articles</h2>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search my articles..."
            className="w-64 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {loading ? (
          <p className="text-gray-600 text-center">Loading articles...</p>
        ) : articles.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
            <p className="text-gray-600 text-lg">You haven't created any articles yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <div
                key={article._id}
                className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
                <p className="text-sm text-gray-500 mb-2">
                  Likes: {article.likes.length} | Dislikes: {article.dislikes.length} | Blocks: {article.blocked.length}
                </p>
                <p className="text-sm text-gray-500 mb-4">Category: {article.category.name}</p>
                <p className="text-sm text-gray-500 mb-4">Tags: {article.tags.join(', ')}</p>
                <div className="flex justify-end space-x-2">
                  <Button
                    onClick={() => handleEdit(article)}
                    className="bg-yellow-600 hover:bg-yellow-700 transition-colors duration-300"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(article._id)}
                    className="bg-red-600 hover:bg-red-700 transition-colors duration-300"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Pagination currentPage={page} totalItems={total} itemsPerPage={limit} onPageChange={setPage}
        />

        {/* {total > limit && (
          <div className="flex justify-center mt-8 space-x-4">
            <Button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50"
            >
              Previous
            </Button>
            <span className="text-gray-700 self-center">
              Page {page} of {Math.ceil(total / limit)}
            </span>
            <Button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === Math.ceil(total / limit)}
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50"
            >
              Next
            </Button>
          </div>
        )} */}
        {editArticle && (
          <ArticleForm
            onClose={() => setEditArticle(null)}
            onSuccess={() => {
              setEditArticle(null);
              getMyArticles(page, limit, search).then((response) => {
                setArticles(response.articles);
                setTotal(response.total);
              });
            }}
            initialData={editArticle}
          />
        )}
      </div>
    </div>
  );
};

export default MyArticles;