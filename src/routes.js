const { Router } = require('express');

const { validate } = require('./utils/authHelper');
const authRoutes = require('./modules/auth/authRoutes');
const buyerRoutes = require('./modules/buyer/buyerRoutes');
const sellerRoutes = require('./modules/seller/sellerRoutes');

const apiRouter = Router();

module.exports =
    apiRouter
        .use('/auth', authRoutes())
        .use('/buyer', validate, buyerRoutes())
        .use('/seller', validate, sellerRoutes())