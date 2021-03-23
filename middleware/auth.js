
const HTTPStatus = require('http-status');

const AuthMiddleware = {};

AuthMiddleware.requiredAuth = () => async (req, res, next) => {
    const apiKey = req.headers['api-key'];
    try {
        if (apiKey === 'ff6c0eac-18d9-4ef8-be1b-50f3419a51d1') {
            next();
        } else {
            return res.status(HTTPStatus.UNAUTHORIZED).json({ error: 'UNAUTHORIZED' });
        }
    } catch (error) {
        res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({ error: 'INTERNAL_SERVER_ERROR' });
    }
};

module.exports = AuthMiddleware;
