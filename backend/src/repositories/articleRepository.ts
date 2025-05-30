import { IArticleRepository } from '../interface/IArticleRepository';
import { ICategory } from '../interface/ICategory';
import Article, { IArticle } from '../models/Article';
import mongoose from 'mongoose';
import Category from '../models/Category';

export class ArticleRepository implements IArticleRepository {
  async findByUserPreferences(
    userId: string,
    preferences: string[],
    page: number,
    limit: number,
    search: string
  ): Promise<{ articles: IArticle[]; total: number }> {
    console.log('get repo',preferences)
    const query: any = {
      category: { $in: preferences },
      blocked: { $nin: [userId] },
    };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Article.countDocuments(query);
    const articles = await Article.find(query)
      .populate('category author')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    console.log(articles)
    return { articles, total };
  }

  async create(articleData: Partial<IArticle>): Promise<IArticle> {
    console.log("repo create",articleData)
      return await Article.create(articleData);
  }

  async updateInteraction(
    articleId: string,
    userId: string,
    action: 'like' | 'dislike' | 'block'
  ): Promise<IArticle | null> {
    const update: any = {};
    if (action === 'like') {
      update.$addToSet = { likes: userId };
      update.$pull = { dislikes: userId };
    } else if (action === 'dislike') {
      update.$addToSet = { dislikes: userId };
      update.$pull = { likes: userId };
    } else if (action === 'block') {
      update.$addToSet = { blocked: userId };
    }

    return Article.findByIdAndUpdate(articleId, update, { new: true });
  }

  async findCategoryByName(name: string): Promise<ICategory | null> {
    return await Category.findOne({name})
  }
}