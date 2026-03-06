const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

    const tokenUsuario = req.headers["authorization"];

    if (!tokenUsuario)
        return res.status(403).json({ message: "se requiere tkoen" });

    try {
        const datosToken = jwt.verify(tokenUsuario, process.env.jwt_clave);
        req.idUsuario = datosToken.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "t invalido" });
    }
};