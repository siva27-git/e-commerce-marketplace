const { isEmpty } = require('lodash');
const moment = require('moment');
const { Users, Products, Orders } = require('../models');


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

        const selectQry = { name: 1, price: 1, productId: 1, _id: 0 };
        const sellerCatalog = await Products.find({ sellerId: seller_id }).select(selectQry);

        if (sellerCatalog.length == 0) res.status(400).send({ message: "seller not created the catlog" });
        else res.status(200).send(sellerCatalog);

    }
    catch (e) {
        console.log(`Error while getting seller catalog ${e.message}`);
        res.status(400).json({ "message": e.message });
    }
};

const createOrder = async (req, res) => {
    const { seller_id: sellerId = "" } = req.query;
    const { id: buyerId = "" } = req.data;
    const data = req.body;
    try {
        const invalidProducts = []
        if (!Array.isArray(data)) return res.status(400).send({ message: "requires an array" });
        if (isEmpty(sellerId)) return res.status(400).send({ message: "pass seller_id the url" });
        if (isEmpty(buyerId)) return res.status(401).send({ message: "unauthorized" });

        data.map((ele) => {
            const { productId = "", quantity = 0 } = ele
            // Need to check
            if (isEmpty(productId) || quantity == 0 || Math.sign(quantity) == -1 || quantity % 1 != 0) {
                invalidProducts.push({ ...ele })
            }
        })

        if (invalidProducts.length > 0) {
            const message = "orders cannot be created due to invalid products"
            return res.status(400).send({ message, invalidProducts });
        }

        const obj = {
            orderId: `OD-${moment().format('YYMMDDhhmmssss')}`,
            sellerId,
            buyerId,
            products: data
        }

        const result = await Orders.create(obj);
        res.status(200).send({ message: "Order created successfully !" });
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