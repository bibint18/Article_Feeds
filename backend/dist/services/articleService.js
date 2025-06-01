import { ArticleRepository } from '../repositories/articleRepository';
export class ArticleService {
    constructor() {
        this.repository = new ArticleRepository();
    }
    async getArticlesByPreferences(userId, preferences, page, limit, search) {
        return await this.repository.findByUserPreferences(userId, preferences, page, limit, search);
    }
    async createArticle(userId, data) {
        console.log("article service", userId, data);
        let imageUrl = '';
        // if (data.image) {
        //   imageUrl = await uploadImage(data.image);
        // }
        const category = await this.repository.findCategoryByName(data.category);
        const articleData = {
            title: data.title,
            description: data.description,
            imageUrl: data.image,
            tags: data.tags,
            category: category?._id,
            author: userId,
        };
        return this.repository.create(articleData);
    }
    async interactWithArticle(articleId, userId, action) {
        const article = await this.repository.updateInteraction(articleId, userId, action);
        if (!article) {
            throw new Error('Article not found');
        }
        return article;
    }
    async getMyArticles(userId, page, limit, search) {
        return await this.repository.findMyArticles(userId, page, limit, search);
    }
    async updateArticle(articleId, userId, data) {
        const category = await this.repository.findCategoryByName(data.category);
        if (!category) {
            throw new Error('Category not found');
        }
        const articleData = {
            title: data.title,
            description: data.description,
            imageUrl: data.image,
            tags: data.tags,
            category: category._id,
        };
        const article = await this.repository.update(articleId, userId, articleData);
        if (!article) {
            throw new Error('Article not found or unauthorized');
        }
        return article;
    }
    async deleteArticle(articleId, userId) {
        return await this.repository.delete(articleId, userId);
    }
}
