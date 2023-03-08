'use strict';

const express = require('express');
const { PORT } = process.env;

const apiRouter = require('../routes');

module.exports = async () => {

    const app = express();
    app.use(express.json());

    app.use('/api', apiRouter);

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`)
    });

    return app;
};
