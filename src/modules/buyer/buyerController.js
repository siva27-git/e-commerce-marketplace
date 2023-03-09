const { isEmpty } = require('lodash');
const moment = require('moment');

const { Users, Products, Orders } = require('../../models');

const getSellerList = async (req, res) => {
    try {
        const selectQry = { userName: 1, id: 1, _id: 0 };
        const allSellers = await Users.find({ userType: "seller" }).select(selectQry);
        const obj = { sellers: [...allSellers] }
        res.status(200).send(obj);
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
        if (isEmpty(sellerRec)) return res.status(404).send({ message: "invalid seller_id" });

        const selectQry = { name: 1, price: 1, productId: 1, _id: 0 };
        const sellerCatalog = await Products.find({ sellerId: seller_id }).select(selectQry);
        const obj = { data: [...sellerCatalog] };

        if (sellerCatalog.length == 0) res.status(400).send({ message: "seller not created the catlog" });
        else res.status(200).send(obj);
    }
    catch (e) {
        console.log(`Error while getting seller catalog ${e.message}`);
        res.status(400).json({ "message": e.message });
    }
};

const createOrder = async (req, res) => {
    const { seller_id: sellerId = "" } = req.query;
    const { id: buyerId = "" } = req.data;
    const { products = [] } = req.body;
    try {
        // data format validation
        if (products.length == 0 || products.length > 10) {
            return res.status(400).send({ message: "no products or 1 order can have max 10 products" });
        }
        if (!Array.isArray(products)) return res.status(400).send({ message: "products should be an array of objects" });
        if (isEmpty(sellerId)) return res.status(400).send({ message: "pass seller_id the url" });
        // seller id validation
        const sellerRec = await Users.findOne({ id: sellerId });
        if (isEmpty(sellerRec)) return res.status(404).send({ message: "seller not found" });
        // buyerId validation
        if (isEmpty(buyerId)) return res.status(401).send({ message: "unauthorized" });

        const invalidProducts = [];

        products.map((ele) => {
            const { productId = "", quantity = 0 } = ele
            if (isEmpty(productId) || quantity == 0 || Math.sign(quantity) == -1 || quantity % 1 != 0) {
                invalidProducts.push({ ...ele })
            }
            // can add further validation also
        })

        if (invalidProducts.length > 0) {
            const message = "orders cannot be created due to invalid products"
            return res.status(400).send({ message, invalidProducts });
        }

        const obj = {
            orderId: `OD-${moment().format('YYMMDDhhmmssss')}`,
            sellerId,
            buyerId,
            products
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