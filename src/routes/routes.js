const { Router } = require('express');
const apiRouter = Router();

const { validate } = require('../utils/authHelper');

const authRoutes = require('./authRoutes');
const buyerRoutes = require('./buyerRoutes');
const sellerRoutes = require('./sellerRoutes');

module.exports =
    apiRouter
        .use('/auth', authRoutes())
        .use('/buyer', validate, buyerRoutes())
        .use('/seller', validate, sellerRoutes())




