// Inside createSecretToken.js
const jwt = require("jsonwebtoken");
require("dotenv").config();
const createSecretToken = (userId) => {
    if (!process.env.SECRET_TOKEN) {
        throw new Error("SECRET_TOKEN is not defined in environment variables");
    }
    return jwt.sign({ id: userId }, process.env.SECRET_TOKEN, { expiresIn: "1h" });
};

module.exports = createSecretToken;
