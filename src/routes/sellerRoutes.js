const Router = require('express-promise-router');

const sellerController = require('../controllers/sellerController');

module.exports = () => {
    const router = Router({ mergeParams: true });

    router.route('/create-catalog').post(sellerController.createCatalog);
    // router.route('/seller-catalog').get(buyerController.getSellerCatalog);

    return router;
};

