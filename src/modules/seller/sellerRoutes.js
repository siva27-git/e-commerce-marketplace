const Router = require('express-promise-router');

const sellerController = require('./sellerController');
const { sellerAuth } = require('../../utils/authHelper')

module.exports = () => {
    const router = Router({ mergeParams: true });

    router.route('/create-catalog').post(sellerAuth, sellerController.createCatalog);
    router.route('/orders').get(sellerAuth, sellerController.getOrders);

    return router;
};

