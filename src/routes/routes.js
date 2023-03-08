const { Router } = require('express');
const apiRouter = Router();

const authRoutes = require('./authRoutes');
const buyerRoutes = require('./buyerRoutes');
const sellerRoutes = require('./sellerRoutes');

module.exports =
    apiRouter
        .use('/auth', authRoutes())
        .use('/buyer', buyerRoutes())
        .use('/seller', sellerRoutes())




