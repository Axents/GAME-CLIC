const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const token = req.headers["authorization"];

    if (!token)
        return res.status(403).json({ message: "se requiere tkoen" });

    try {
        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "t invalido" });
    }
};