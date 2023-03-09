const jwt = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET } = process.env;

const validate = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(' ')[1];
        const data = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.data = data;
        next();
    }
    catch (e) {
        res.status(401).send({ message: "unauthorized" })
    }
};

const buyerAuth = (req, res, next) => {
    const { userType = "" } = req.data;
    try {
        if (userType == "buyer") next();
        else res.status(401).send({ message: "unauthorized" });
    }
    catch (e) {
        res.status(401).send({ message: e.message });
    }
};

const sellerAuth = (req, res, next) => {
    const { userType = "" } = req.data;
    try {
        if (userType == "seller") next();
        else res.status(401).send({ message: "unauthorized" });
    }
    catch (e) {
        res.status(401).send({ message: e.message });
    }
};

module.exports = {
    validate,
    buyerAuth,
    sellerAuth
};
