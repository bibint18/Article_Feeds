import { ArticleService } from "../services/articleService";
export class ArticleController {
    constructor() {
        this.articleService = new ArticleService();
    }
    async getArticles(req, res) {
        try {
            const userId = req.user?.id;
            const { preferences, page = 1, limit = 9, search = "" } = req.body;
            console.log(preferences, page, limit, search, "backend get articles");
            const { articles, total } = await this.articleService.getArticlesByPreferences(userId, preferences, Number(page), Number(limit), search);
            res
                .status(200)
                .json({ articles, total, page: Number(page), limit: Number(limit) });
        }
        catch (error) {
            res
                .status(401)
                .json({ message: "Invalid token or error fetching articles" });
        }
    }
    async createArticle(req, res) {
        try {
            const userId = req.user?.id;
            const article = await this.articleService.createArticle(userId, req.body);
            console.log(article);
            res
                .status(201)
                .json({ message: "Article created successfully", article });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async interactWithArticle(req, res) {
        try {
            const userId = req.user?.id;
            const { articleId, action } = req.body;
            const article = await this.articleService.interactWithArticle(articleId, userId, action);
            res.status(200).json({ message: `${action} successful`, article });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async getMyArticles(req, res) {
        try {
            const userId = req.user?.id;
            const { page = 1, limit = 9, search = "" } = req.body;
            const { articles, total } = await this.articleService.getMyArticles(userId, Number(page), Number(limit), search);
            res
                .status(200)
                .json({ articles, total, page: Number(page), limit: Number(limit) });
        }
        catch (error) {
            res
                .status(401)
                .json({ message: "Invalid token or error fetching articles" });
        }
    }
    async updateArticle(req, res) {
        try {
            const userId = req.user?.id;
            const { id } = req.params;
            const article = await this.articleService.updateArticle(id, userId, req.body);
            res
                .status(200)
                .json({ message: "Article updated successfully", article });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    async deleteArticle(req, res) {
        try {
            const userId = req.user?.id;
            const { id } = req.params;
            await this.articleService.deleteArticle(id, userId);
            res.status(200).json({ message: "Article deleted successfully" });
        }
        catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
