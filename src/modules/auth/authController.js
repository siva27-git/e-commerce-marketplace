const { isEmpty } = require('lodash');
const validator = require("email-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const { Users } = require('../../models');
const { ACCESS_TOKEN_SECRET } = process.env;

const registerUser = async (req, res) => {
    let { userName = "", password = "", userType = "" } = req.body;
    userType = userType.toLowerCase();
    userName = userName.trim();
    try {
        if (isEmpty(userName) || isEmpty(password) || isEmpty(userType)) return res.status(400).send({ message: "missing mandatory fields!" });
        if (!validator.validate(userName)) return res.status(400).send({ message: "userName should be an email" });
        if (password.length < 8) return res.status(400).send({ message: "password length should be minium 8 characters" });
        if (!['buyer', 'seller'].includes(userType)) return res.status(400).send({ message: "userType shoud be buyer or seller!" });

        const findUser = await Users.findOne({ userName });

        if (!isEmpty(findUser)) {
            return res.status(400).send({ message: "user already exists with the userName" });
        } else {
            password = await bcrypt.hash(password, 10);
            const currentTime = moment().format('YYMMDDhhmmssss');
            const prefix = userType == "buyer" ? "BU" : "SE"
            const obj = {
                userName,
                password,
                userType,
                id: `${prefix}-${currentTime}`
            }
            const result = await Users.create(obj);
            console.log(`User added successfully  -${result.userName}`);
            res.status(200).send({ message: 'User added successfully!' });
        }
    }
    catch (e) {
        console.log(`Error while adding user ${e.message}`);
        res.status(400).json({ "message": e.message });
    }
};

const loginUser = async (req, res) => {
    let { userName = "", password = "" } = req.body;
    userName = userName.trim();
    try {
        if (isEmpty(userName) || isEmpty(password)) return res.status(400).send({ message: "missing mandatory fields!" });
        const user = await Users.findOne({ userName });
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                const access_token = jwt.sign({ name: user.userName, id: user.id, userType: user.userType }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
                res.status(200).json({ message: "logged in successfully !", access_token },);
            }
            else res.status(400).json({ message: "invalid password" });
        }
        else res.status(400).send({ message: "user not exist , please register" });
    }
    catch (e) {
        console.log(`Error while logging in ${userName} -${e.message}`);
        res.status(400).send({ message: e.message });
    }
};

module.exports = {
    registerUser,
    loginUser
}