const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user.model");

exports.register = (req, res) => {

    const { nombre_gamer, correo, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    user.create(
        { nombre_gamer, correo, password: hashedPassword },
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Usuario registrado correctamente" });
        }
    );
};

exports.login = (req, res) => {

    const { correo, password } = req.body;

    user.buscarPorEmail(correo, (err, results) => {

        if (err) return res.status(500).json({ error: err });

        if (results.length === 0)
            return res.status(400).json({ message: "Usuario no encontrado" });

        const usuario = results[0];

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword)
            return res.status(400).json({ message: "Contraseña incorrecta" });

        const token = jwt.sign(
            { id: usuario.id },
            process.env.jwt_secret,
            { expiresIn: "2h" }
        );

        res.json({ message: "Login exitoso", token });
    });
};