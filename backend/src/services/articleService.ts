import { IArticleService } from '../interface/IArticleService';
import { IArticleRepository } from '../interface/IArticleRepository';
import { ArticleRepository } from '../repositories/articleRepository';
import { IArticle } from '../models/Article';
import { uploadImage } from './cloudinary';

export class ArticleService implements IArticleService {
  private repository: IArticleRepository;

  constructor() {
    this.repository = new ArticleRepository();
  }

  async getArticlesByPreferences(
    userId: string,
    preferences: string[],
    page: number,
    limit: number,
    search: string
  ): Promise<{ articles: IArticle[]; total: number }> {
    return await this.repository.findByUserPreferences(userId, preferences, page, limit, search);
  }

  async createArticle(
    userId: string,
    data: { title: string; description: string; image?: string; tags: string[]; category: string }
  ): Promise<IArticle> {
    console.log("article service",userId,data)
    let imageUrl = '';
    // if (data.image) {
    //   imageUrl = await uploadImage(data.image);
    // }
    const category = await this.repository.findCategoryByName(data.category)
    const articleData: Partial<IArticle> = {
      title: data.title,
      description: data.description,
      imageUrl:data.image,
      tags: data.tags,
      category: category?._id,
      author: userId,
    };

    return this.repository.create(articleData);
  }

  async interactWithArticle(
    articleId: string,
    userId: string,
    action: 'like' | 'dislike' | 'block'
  ): Promise<IArticle> {
    const article = await this.repository.updateInteraction(articleId, userId, action);
    if (!article) {
      throw new Error('Article not found');
    }
    return article;
  }
}