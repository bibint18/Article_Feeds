import { IArticle } from "../models/Article.js";
export interface IArticleService {
  getArticlesByPreferences(
    userId: string,
    preferences: string[],
    page: number,
    limit: number,
    search: string
  ): Promise<{ articles: IArticle[]; total: number }>;
  createArticle(
    userId: string,
    data: { title: string; description: string; image?: string; tags: string[]; category: string }
  ): Promise<IArticle>;
  interactWithArticle(
    articleId: string,
    userId: string,
    action: 'like' | 'dislike' | 'block'
  ): Promise<IArticle>;
  getMyArticles(
    userId: string,
    page: number,
    limit: number,
    search: string
  ): Promise<{ articles: IArticle[]; total: number }>;
  updateArticle(
    articleId: string,
    userId: string,
    data: { title: string; description: string; image?: string; tags: string[]; category: string }
  ): Promise<IArticle>;
  deleteArticle(articleId: string, userId: string): Promise<void>;
}