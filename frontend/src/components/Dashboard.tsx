
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { RootState } from '../redux/store';
// import { getArticles } from '../services/api/articleService';
// import Button from './Shared/Button';
// import ArticlePopup from './ArticlePopup';
// import ArticleForm from './ArticleForm';
// import Pagination from './Pages/Pagination';
// interface Article {
//   _id: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   tags: string[];
//   category: { _id: string; name: string };
//   author: { _id: string; firstName: string; lastName: string };
//   likes: string[];
//   dislikes: string[];
//   blocked: string[];
//   createdAt: string;
// }

// const Dashboard: React.FC = () => {
//   const navigate = useNavigate();
//   const user = useSelector((state: RootState) => state.auth.user);
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [total, setTotal] = useState(0);
//   const [page, setPage] = useState(1);
//   const [limit] = useState(6);
//   const [search, setSearch] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
//   const [showArticleForm, setShowArticleForm] = useState(false);

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         setLoading(true);
//         if(!user){
//           return
//         }
//         const response = await getArticles(user.articlePreferences, page, limit, search);
//         setArticles(response.articles);
//         setTotal(response.total);
//       } catch (error) {
//         console.error('Error fetching articles:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, [user, navigate, page, search,limit]);

//   const handleInteraction = (updatedArticle: Article) => {
//     setArticles((prev) =>
//       prev.map((article) => (article._id === updatedArticle._id ? updatedArticle : article)).filter((article) => !updatedArticle.blocked.includes(user?._id || ''))
//     );
//   };

//   // const handlePageChange = (newPage: number) => {
//   //   if (newPage >= 1 && newPage <= Math.ceil(total / limit)) {
//   //     setPage(newPage);
//   //   }
//   // };

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);
//     setPage(1);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-6 flex justify-between items-center">
//           <h2 className="text-2xl font-bold text-gray-700">Your Articles</h2>
//           <div className="flex space-x-4">
//             <input
//               type="text"
//               value={search}
//               onChange={handleSearch}
//               placeholder="Search articles..."
//               className="w-64 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <Button
//               onClick={() => setShowArticleForm(true)}
//               className="bg-green-600 hover:bg-green-700 transition-colors duration-300"
//             >
//               Create Article
//             </Button>
//           </div>
//         </div>
//         {loading ? (
//           <p className="text-gray-600 text-center">Loading articles...</p>
//         ) : articles.length === 0 ? (
//           <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
//             <p className="text-gray-600 text-lg">No articles found for your preferences.</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {articles.map((article) => (
//               <div
//                 key={article._id}
//                 className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
//                 onClick={() => setSelectedArticle(article)}
//               >
//                 {article.imageUrl && (
//                   <img
//                     src={article.imageUrl}
//                     alt={article.title}
//                     className="w-full h-48 object-cover rounded-lg mb-4"
//                   />
//                 )}
//                 <h3 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h3>
//                 <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
//                 <p className="text-sm text-gray-500 mb-2">
//                   By {article.author.firstName} {article.author.lastName}
//                 </p>
//                 <p className="text-sm text-gray-500 mb-4">Category: {article.category.name}</p>
//                 <p className="text-sm text-gray-500">Tags: {article.tags.join(', ')}</p>
//               </div>
//             ))}
//           </div>
//         )}
//         <Pagination currentPage={page} totalItems={total} itemsPerPage={limit} onPageChange={setPage}
//         />

//         {/* {total > limit && (
//           <div className="flex justify-center mt-8 space-x-4">
//             <Button
//               onClick={() => handlePageChange(page - 1)}
//               disabled={page === 1}
//               className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50"
//             >
//               Previous
//             </Button>
//             <span className="text-gray-700 self-center">
//               Page {page} of {Math.ceil(total / limit)}
//             </span>
//             <Button
//               onClick={() => handlePageChange(page + 1)}
//               disabled={page === Math.ceil(total / limit)}
//               className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50"
//             >
//               Next
//             </Button>
//           </div>
//         )} */}
//         {selectedArticle && (
//           <ArticlePopup
//             article={selectedArticle}
//             onClose={() => setSelectedArticle(null)}
//             onInteraction={handleInteraction}
//           />
//         )}
//         {showArticleForm && (
//           <ArticleForm
//             onClose={() => setShowArticleForm(false)}
//             onSuccess={() => {
//               setShowArticleForm(false);
//               setPage(1);
//               getArticles(user?.articlePreferences || [], 1, limit, search).then((response) => {
//                 setArticles(response.articles);
//                 setTotal(response.total);
//               });
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { getArticles } from '../services/api/articleService';
import Button from './Shared/Button';
import ArticlePopup from './ArticlePopup';
import ArticleForm from './ArticleForm';
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

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showArticleForm, setShowArticleForm] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        if (!user) {
          return; // Don't fetch articles if user is not logged in
        }
        const response = await getArticles(user.articlePreferences, page, limit, search);
        setArticles(response.articles);
        setTotal(response.total);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [user, page, search, limit]);

  const handleInteraction = (updatedArticle: Article) => {
    setArticles((prev) =>
      prev
        .map((article) => (article._id === updatedArticle._id ? updatedArticle : article))
        .filter((article) => !updatedArticle.blocked.includes(user?._id || ''))
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {!user ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white p-8 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Please Log In</h2>
            <p className="text-lg text-gray-600 mb-6">
              You need to be logged in to view your personalized articles.
            </p>
            <Button
              onClick={() => navigate('/login')}
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-300 px-6 py-3 text-lg rounded-lg"
            >
              Go to Login
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-700">Your Articles</h2>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search articles..."
                  className="w-64 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  onClick={() => setShowArticleForm(true)}
                  className="bg-green-600 hover:bg-green-700 transition-colors duration-300"
                >
                  Create Article
                </Button>
              </div>
            </div>
            {loading ? (
              <p className="text-gray-600 text-center">Loading articles...</p>
            ) : articles.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
                <p className="text-gray-600 text-lg">No articles found for your preferences.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <div
                    key={article._id}
                    className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedArticle(article)}
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
                      By {article.author.firstName} {article.author.lastName}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">Category: {article.category.name}</p>
                    <p className="text-sm text-gray-500">Tags: {article.tags.join(', ')}</p>
                  </div>
                ))}
              </div>
            )}
            <Pagination
              currentPage={page}
              totalItems={total}
              itemsPerPage={limit}
              onPageChange={setPage}
            />
            {selectedArticle && (
              <ArticlePopup
                article={selectedArticle}
                onClose={() => setSelectedArticle(null)}
                onInteraction={handleInteraction}
              />
            )}
            {showArticleForm && (
              <ArticleForm
                onClose={() => setShowArticleForm(false)}
                onSuccess={() => {
                  setShowArticleForm(false);
                  setPage(1);
                  getArticles(user?.articlePreferences || [], 1, limit, search).then((response) => {
                    setArticles(response.articles);
                    setTotal(response.total);
                  });
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;