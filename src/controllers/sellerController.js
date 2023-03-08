const { isEmpty } = require('lodash');

const { Products, Orders } = require('../models');

const createCatalog = async (req, res) => {
    const { id } = req.data;
    try {
        const data = req.body
        if (!Array.isArray(data)) return res.status(400).send({ message: "requires an array" });

        let created = 0, updated = 0, invalid = 0;

        for (let i = 0; i < data.length; i++) {
            const productName = data[i].name.trim().toLowerCase();
            const price = Number(data[i].price);

            if (!isEmpty(productName) && price && Math.sign(price) == 1) {

                const obj = {
                    productId: `${productName}-${id}`,
                    name: productName,
                    price: price,
                    sellerId: id
                };
                const result = await Products.updateOne(
                    { name: productName, sellerId: id },
                    { ...obj },
                    { upsert: true }
                )
                if (result.upsertedCount == 1) created++
                if (result.modifiedCount == 1) updated++
            }
            else invalid++
        }
        const message = { "No Of records created": created, "No of records updated": updated, "Invalid Records": invalid };

        res.status(200).send(message);
    }
    catch (e) {
        console.log(`Error while adding Products ${e.message}`);
        res.status(400).json({ "message": e.message });
    }
};

const getOrders = async (req, res) => {
    const { id: sellerId = "" } = req.data;
    try {
        const selectQry = { orderId: 1, buyerId: 1, products: 1, _id: 0 };
        const orders = await Orders.find({ sellerId }).select(selectQry);
        res.status(200).send(orders);

    } catch (e) {
        console.log(`Error while getting orders ${e}`);
        res.status(400).send({ message: e.message });
    }
};

module.exports = {
    createCatalog,
    getOrders
}