import { Request,Response } from "express"
export interface IArticleController{
  getArticles(req: Request, res: Response): Promise<void>
  createArticle(req: Request, res: Response): Promise<void>
  interactWithArticle(req: Request, res: Response): Promise<void>
}