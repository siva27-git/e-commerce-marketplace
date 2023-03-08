const Users = require('../models/Users');

const getSellerList = async (req, res) => {
    try {
        const selectQry = { userName: 1, id: 1, _id: 0 };
        const allSellers = await Users.find({ userType: "seller" }).select(selectQry);
        res.status(200).send(allSellers);
    }
    catch (e) {
        console.log(`Error while adding user ${e.message}`);
        res.status(400).json({ "message": e.message });
    }
};

const getSellerCatalog = async (req, res) => {
    try {
        const selectQry = { userName: 1, id: 1, _id: 0 };
        const allSellers = await Users.find({ userType: "seller" }).select(selectQry);
        res.status(200).send(allSellers);
    }
    catch (e) {
        console.log(`Error while adding user ${e.message}`);
        res.status(400).json({ "message": e.message });
    }
};

module.exports = {
    getSellerList,
    getSellerCatalog
}