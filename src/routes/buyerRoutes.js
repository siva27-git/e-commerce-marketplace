const Router = require('express-promise-router');

const buyerController = require('../controllers/buyerController');

module.exports = () => {
    const router = Router({ mergeParams: true });

    router.route('/list-of-sellers').get(buyerController.getSellerList);
    router.route('/seller-catalog').get(buyerController.getSellerCatalog);
    router.route('/create-order').post(buyerController.createOrder);

    return router;
};
