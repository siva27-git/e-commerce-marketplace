const Router = require('express-promise-router');

const sellerController = require('./sellerController');

module.exports = () => {
    const router = Router({ mergeParams: true });

    router.route('/create-catalog').post(sellerController.createCatalog);
    router.route('/orders').get(sellerController.getOrders);

    return router;
};

