'use strict';

const express = require('express');

const apiRouter = require('../routes');
const { PORT = 3000 } = process.env;

module.exports = async () => {

    const app = express();
    app.use(express.json());

    app.use('/api', apiRouter);

    app.listen(PORT, () => {
        console.log(`Server started at port ${PORT}`);
    });

    return app;
};
