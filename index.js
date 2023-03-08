'use strict';

require("dotenv").config();
const mongoose = require("mongoose");

const { MONGO_DB_URI } = process.env;

mongoose.connect(MONGO_DB_URI, {});

const db = mongoose.connection;

db.once('open', async () => {
    console.log('Connected to DB')
    const setUpExpress = require('./src/configs/express');
    await setUpExpress();
});

db.on('error', (err) => {
    console.log(`Error while connecting to db ${err.message}`);
});