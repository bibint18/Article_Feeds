import { Request, Response } from 'express';
import { IArticleController } from '../interface/IArticleController';
import { ArticleService } from '../services/articleService';
import jwt from 'jsonwebtoken';

export class ArticleController implements IArticleController {
  private articleService: ArticleService;

  constructor() {
    this.articleService = new ArticleService();
  }

  async getArticles(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'access-secret') as { userId: string; email: string };
      const { preferences, page = 1, limit = 9, search = '' } = req.body;
      console.log(preferences,page,limit,search,'backend get articles')
      const { articles, total } = await this.articleService.getArticlesByPreferences(
        decoded.userId,
        preferences,
        Number(page),
        Number(limit),
        search
      );
      res.status(200).json({ articles, total, page: Number(page), limit: Number(limit) });
    } catch (error: any) {
      res.status(401).json({ message: 'Invalid token or error fetching articles' });
    }
  }

  async createArticle(req: Request, res: Response): Promise<void> {
    try {
      console.log("reached jere")
      const token = req.headers.authorization?.split(' ')[1];
      console.log(token)
      if (!token) {
        console.log(true)
        res.status(401).json({ message: 'No token provided' });
        return;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'access-secret') as { userId: string; email: string };
      console.log("decode",decoded)
      const article = await this.articleService.createArticle(decoded.userId, req.body);
      console.log(article)
      res.status(201).json({ message: 'Article created successfully', article });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async interactWithArticle(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'access-secret') as { userId: string; email: string };
      const { articleId, action } = req.body;
      const article = await this.articleService.interactWithArticle(articleId, decoded.userId, action);
      res.status(200).json({ message: `${action} successful`, article });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}