import jwt from 'jsonwebtoken';
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '');
        req.user = { id: decoded.userId };
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
export default authMiddleware;
