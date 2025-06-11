import { NextFunction, Request,Response } from "express"
export interface IArticleController{
  getArticles(req: Request, res: Response,next:NextFunction): Promise<void>
  createArticle(req: Request, res: Response,next:NextFunction): Promise<void>
  interactWithArticle(req: Request, res: Response,next:NextFunction): Promise<void>
  getMyArticles(req: Request, res: Response,next:NextFunction): Promise<void>;
  updateArticle(req: Request, res: Response,next:NextFunction): Promise<void>;
  deleteArticle(req: Request, res: Response,next:NextFunction): Promise<void>;
}