import { Request,Response } from "express"
export interface IArticleController{
  getArticles(req: Request, res: Response): Promise<void>
  createArticle(req: Request, res: Response): Promise<void>
  interactWithArticle(req: Request, res: Response): Promise<void>
  getMyArticles(req: Request, res: Response): Promise<void>;
  updateArticle(req: Request, res: Response): Promise<void>;
  deleteArticle(req: Request, res: Response): Promise<void>;
}