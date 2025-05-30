import { IArticle } from "../models/Article";
import { ICategory } from "./ICategory";

export interface IArticleRepository {
  findByUserPreferences(
    userId: string,
    preferences: string[],
    page: number,
    limit: number,
    search: string
  ): Promise<{ articles: IArticle[]; total: number }>;
  create(articleData: Partial<IArticle>): Promise<IArticle>;
  updateInteraction(
    articleId: string,
    userId: string,
    action: 'like' | 'dislike' | 'block'
  ): Promise<IArticle | null>;
  findCategoryByName(name:string):Promise<ICategory | null>
}