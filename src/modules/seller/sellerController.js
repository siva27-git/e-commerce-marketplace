const { isEmpty } = require('lodash');

const { Products, Orders } = require('../../models');

const createCatalog = async (req, res) => {
    const { id } = req.data;
    const { products = [] } = req.body;
    try {
        if (products.length == 0 || products.length > 10) {
            return res.status(400).send({ message: "products is empty or can create upto 10 products in one api call" });
        }

        if (!Array.isArray(products)) return res.status(400).send({ message: "products must be an array of object" });

        let created = 0, updated = 0, invalid = 0;

        for (let i = 0; i < products.length; i++) {
            const productName = products[i].name && products[i].name.trim().toLowerCase();
            const price = Number(products[i].price);

            if (!isEmpty(productName) && price && Math.sign(price) == 1) {
                const productId = `${productName}-${id}`

                const obj = {
                    productId,
                    name: productName,
                    price: price,
                    sellerId: id
                };
                const result = await Products.updateOne(
                    { productId },
                    { ...obj },
                    { upsert: true }
                )
                if (result.upsertedCount == 1) created++
                if (result.modifiedCount == 1) updated++
            }
            else invalid++
        }
        
        const message = { "products created": created, "products updated": updated, "invalid products": invalid };
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
        const obj = { orders: [...orders] };
        res.status(200).send(obj);

    } catch (e) {
        console.log(`Error while getting orders ${e}`);
        res.status(400).send({ message: e.message });
    }
};

module.exports = {
    createCatalog,
    getOrders
}