import { Router } from 'express';
import { ArticleController } from '../controllers/articleController.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = Router();
const articleController = new ArticleController();

router.post('/',authMiddleware, articleController.getArticles.bind(articleController));
router.post('/create',authMiddleware, articleController.createArticle.bind(articleController));
router.post('/interact',authMiddleware, articleController.interactWithArticle.bind(articleController));
router.post('/my-articles',authMiddleware, articleController.getMyArticles.bind(articleController));
router.put('/:id',authMiddleware, articleController.updateArticle.bind(articleController));
router.delete('/:id',authMiddleware, articleController.deleteArticle.bind(articleController));

export default router;