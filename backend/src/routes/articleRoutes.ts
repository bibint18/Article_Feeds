import { Router } from 'express';
import { ArticleController } from '../controllers/articleController';

const router = Router();
const articleController = new ArticleController();

router.post('/', articleController.getArticles.bind(articleController));
router.post('/create', articleController.createArticle.bind(articleController));
router.post('/interact', articleController.interactWithArticle.bind(articleController));

export default router;