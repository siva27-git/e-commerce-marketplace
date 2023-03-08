const Router = require('express-promise-router');

const buyerController = require('./buyerController');
const { buyerAuth } = require('../../utils/authHelper');

module.exports = () => {
    const router = Router({ mergeParams: true });

    router.route('/list-of-sellers').get(buyerAuth, buyerController.getSellerList);
    router.route('/seller-catalog').get(buyerAuth, buyerController.getSellerCatalog);
    router.route('/create-order').post(buyerAuth, buyerController.createOrder);

    return router;
};
