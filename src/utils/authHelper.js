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

module.exports = {
    validate
};
