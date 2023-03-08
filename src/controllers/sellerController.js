const Products = require('../models/Products');

const createCatalog = async (req, res) => {
    try {
        if (!Array.isArray(req.body)) return res.status(400).send({ message: "requires an array" })



    }
    catch (e) {
        console.log(`Error while adding user ${e.message}`);
        res.status(400).json({ "message": e.message });
    }
};

module.exports = {
    createCatalog,
}