import axiosInstance from "../axiosInstance";

export const getArticles = async (
  preferences: string[],
  page: number,
  limit: number,
  search: string
) => {
  const response = await axiosInstance.post('/articles', { preferences, page, limit, search });
  return response.data;
};

export const createArticle = async (data: {
  title: string;
  description: string;
  image?: string;
  tags: string[];
  category: string;
}) => {
  const response = await axiosInstance.post('/articles/create', data);
  console.log('response',response.data)
  return response.data;
};

export const interactWithArticle = async (articleId: string, action: 'like' | 'dislike' | 'block') => {
  const response = await axiosInstance.post('/articles/interact', { articleId, action });
  return response.data;
};

export const getMyArticles = async (
  page: number,
  limit: number,
  search: string
): Promise<{ articles: any[]; total: number }> => {
  const response = await axiosInstance.post('/articles/my-articles', { page, limit, search });
  return response.data;
};

export const updateArticle = async (
  articleId: string,
  data: {
    title: string;
    description: string;
    image?: string;
    tags: string[];
    category: string;
  }
) => {
  const response = await axiosInstance.put(`/articles/${articleId}`, data);
  return response.data;
};

export const deleteArticle = async (articleId: string)=> {
  const response = await axiosInstance.delete(`/articles/${articleId}`);
  return response.data;
};