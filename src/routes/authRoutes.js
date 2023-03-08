const Router = require('express-promise-router');

const authController = require('../controllers/authController');

module.exports = () => {
    const router = Router({ mergeParams: true });

    router.route('/register').post(authController.registerUser);
    router.route('/login').post(authController.loginUser);

    return router;
};

