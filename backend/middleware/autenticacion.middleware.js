const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    const tokenUsuario = req.headers["authorization"];
    if(!tokenUsuario){
        return res.status(403).json({ message: "Token requerido" });
    }

    try{
        const datosToken = jwt.verify(tokenUsuario, process.env.jwt_clave);
        req.usuarioId = datosToken.id; 
        next();
    }catch (err){
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};