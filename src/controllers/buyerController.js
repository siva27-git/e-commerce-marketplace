const { isEmpty } = require('lodash');
const { Users, Products } = require('../models');

const getSellerList = async (req, res) => {
    try {
        const selectQry = { userName: 1, id: 1, _id: 0 };
        const allSellers = await Users.find({ userType: "seller" }).select(selectQry);
        res.status(200).send(allSellers);
    }
    catch (e) {
        console.log(`Error while getting seller list ${e.message}`);
        res.status(400).json({ "message": e.message });
    }
};

const getSellerCatalog = async (req, res) => {
    try {
        const { seller_id = "" } = req.query;
        if (isEmpty(seller_id)) return res.status(400).send({ message: "pass seller_id the url" });

        const sellerRec = await Users.findOne({ id: seller_id });
        if (isEmpty(sellerRec)) return res.status(404).send({ message: "seller not found" });

        const selectQry = { name: 1, price: 1, _id: 0 };
        const sellerCatalog = await Products.find({ sellerId: seller_id }).select(selectQry);

        if (sellerCatalog.length == 0) res.status(400).send({ message: "seller not created the catlog" });
        else res.status(200).send(sellerCatalog);

    }
    catch (e) {
        console.log(`Error while getting seller catalog ${e.message}`);
        res.status(400).json({ "message": e.message });
    }
};

const createOrder = (req, res) => {
    const { seller_id = "" } = req.query;
    const { id: buyerId = "" } = req.data;
    const data = req.body;
    try {
        if (!Array.isArray(data)) return res.status(400).send({ message: "requires an array" });
        if (isEmpty(seller_id)) return res.status(400).send({ message: "pass seller_id the url" });
        if (isEmpty(seller_id)) return res.status(401).send({ message: "unauthorized" });
        console.log(data)




    } catch (e) {
        console.log(`Error while creating order ${e.message}`);
        res.status(400).json({ "message": e.message });
    }
};

module.exports = {
    getSellerList,
    getSellerCatalog,
    createOrder
};