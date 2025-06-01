import { Request, Response } from "express";
import { IArticleController } from "../interface/IArticleController.js";
import { ArticleService } from "../services/articleService.js";

interface AuthRequest extends Request {
  user?: { id: string };
}
export class ArticleController implements IArticleController {
  private articleService: ArticleService;

  constructor() {
    this.articleService = new ArticleService();
  }

  async getArticles(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id as string;
      const { preferences, page = 1, limit = 9, search = "" } = req.body;
      console.log(preferences, page, limit, search, "backend get articles");
      const { articles, total } =
        await this.articleService.getArticlesByPreferences(
          userId,
          preferences,
          Number(page),
          Number(limit),
          search
        );
      res
        .status(200)
        .json({ articles, total, page: Number(page), limit: Number(limit) });
    } catch (error: any) {
      res
        .status(401)
        .json({ message: "Invalid token or error fetching articles" });
    }
  }

  async createArticle(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.id as string;
      const article = await this.articleService.createArticle(userId, req.body);
      console.log(article);
      res
        .status(201)
        .json({ message: "Article created successfully", article });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async interactWithArticle(req: AuthRequest, res: Response): Promise<void> {
    try {
const userId=req.user?.id as string
      const { articleId, action } = req.body;
      const article = await this.articleService.interactWithArticle(
        articleId,
        userId,
        action
      );
      res.status(200).json({ message: `${action} successful`, article });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getMyArticles(req: AuthRequest, res: Response): Promise<void> {
    try {
const userId=req.user?.id as string
      const { page = 1, limit = 9, search = "" } = req.body;
      const { articles, total } = await this.articleService.getMyArticles(
        userId,
        Number(page),
        Number(limit),
        search
      );
      res
        .status(200)
        .json({ articles, total, page: Number(page), limit: Number(limit) });
    } catch (error: any) {
      res
        .status(401)
        .json({ message: "Invalid token or error fetching articles" });
    }
  }

  async updateArticle(req: AuthRequest, res: Response): Promise<void> {
    try {
const userId=req.user?.id as string
      const { id } = req.params;
      const article = await this.articleService.updateArticle(
        id,
        userId,
        req.body
      );
      res
        .status(200)
        .json({ message: "Article updated successfully", article });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteArticle(req: AuthRequest, res: Response): Promise<void> {
    try {
const userId=req.user?.id as string
      const { id } = req.params;
      await this.articleService.deleteArticle(id, userId);
      res.status(200).json({ message: "Article deleted successfully" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
