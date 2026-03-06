const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const modeloUsuario = require("../models/usuario.modelo");

exports.registrar = (req, res) => {

    const { nombre_gamer, correo, password } = req.body;

    const encriptado = bcrypt.hashSync(password, 10);

    modeloUsuario.crearUsuario(
        { nombre_gamer, correo, password: encriptado },
        (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Usuario registrado correctamente" });
        }
    );
};

exports.iniciarSesion = (req, res) => {

    const { correo, password } = req.body;

    modeloUsuario.buscarPorCorreo(correo, (err, resultados) => {

        if (err) return res.status(500).json({ error: err });

        if (resultados.length === 0)
            return res.status(400).json({ message: "Usuario no encontrado" });

        const usuarioBD = resultados[0];

        const passwordValido = bcrypt.compareSync(password, usuarioBD.password);

        if (!passwordValido)
            return res.status(400).json({ message: "Contraseña incorrecta" });

        const tokenSesion = jwt.sign(
            { id: usuarioBD.id },
            process.env.jwt_clave,
            { expiresIn: "2h" }
        );

        res.json({ message: "Login exitoso", token: tokenSesion });
    });
};