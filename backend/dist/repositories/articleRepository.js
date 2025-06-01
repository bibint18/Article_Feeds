import Article from '../models/Article';
import Category from '../models/Category';
export class ArticleRepository {
    async findByUserPreferences(userId, preferences, page, limit, search) {
        console.log('get repo0000000000', preferences);
        const query = {
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
        console.log(articles);
        return { articles, total };
    }
    async create(articleData) {
        console.log("repo create", articleData);
        return await Article.create(articleData);
    }
    async updateInteraction(articleId, userId, action) {
        const update = {};
        if (action === 'like') {
            update.$addToSet = { likes: userId };
            update.$pull = { dislikes: userId };
        }
        else if (action === 'dislike') {
            update.$addToSet = { dislikes: userId };
            update.$pull = { likes: userId };
        }
        else if (action === 'block') {
            update.$addToSet = { blocked: userId };
        }
        return Article.findByIdAndUpdate(articleId, update, { new: true });
    }
    async findCategoryByName(name) {
        return await Category.findOne({ name });
    }
    async findMyArticles(userId, page, limit, search) {
        const query = { author: userId };
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
        return { articles, total };
    }
    async update(articleId, userId, data) {
        return await Article.findOneAndUpdate({ _id: articleId, author: userId }, { $set: data }, { new: true }).populate('category author');
    }
    async delete(articleId, userId) {
        const result = await Article.deleteOne({ _id: articleId, author: userId });
        if (result.deletedCount === 0) {
            throw new Error('Article not found or unauthorized');
        }
    }
}
