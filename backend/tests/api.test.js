const request = require("supertest");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = require("../config/conexionBD");
jest.mock("../config/conexionBD", () => ({
    query: jest.fn()
}));

const authMiddleware = require("../middleware/autenticacion.middleware.js");
const express = require("express");

const app = express();
app.use(express.json());

app.get("/api/test-protegido", authMiddleware, (req, res) => {
    res.json({ estatus: "Acceso Permitido", usuarioId: req.usuarioId });
});

describe("Pruebas Prácticas Automatizadas - GAME AND CLIC", () => {
    
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.jwt_clave = "clave_secreta_pruebas_2026";
    });

    describe("Pruebas sobre autenticacion.middleware.js", () => {
        
        test("TC-04 (Frontera): Debe denegar acceso (HTTP 403) si no se envía la cabecera 'authorization'", async () => {
            const respuesta = await request(app)
                .get("/api/test-protegido");

            expect(respuesta.statusCode).toBe(403);
            expect(respuesta.body).toHaveProperty("message", "Token requerido");
        });

        test("TC-05 (Equivalencia Inválida): Debe denegar acceso (HTTP 401) si el token es corrupto o inválido", async () => {
            const respuesta = await request(app)
                .get("/api/test-protegido")
                .set("authorization", "TOKEN_TOTALMENTE_FALSO_O_ALTERADO");

            expect(respuesta.statusCode).toBe(401);
            expect(respuesta.body).toHaveProperty("message", "Token inválido o expirado");
        });

        test("Equivalencia Válida: Debe permitir el acceso (HTTP 200) y parsear el usuarioId con un token correcto", async () => {
            const tokenValido = jwt.sign({ id: 99 }, process.env.jwt_clave, { expiresIn: "1h" });

            const respuesta = await request(app)
                .get("/api/test-protegido")
                .set("authorization", tokenValido);

            expect(respuesta.statusCode).toBe(200);
            expect(respuesta.body).toHaveProperty("estatus", "Acceso Permitido");
            expect(respuesta.body).toHaveProperty("usuarioId", 99);
        });
    });

    describe("Pruebas Unitarias de Lógica y Seguridad", () => {
        test("Debe verificar que el hashing de contraseñas de usuarios funciona y es seguro", () => {
            const passwordOriginal = "Cyberpunk2077!";
            const hash = bcrypt.hashSync(passwordOriginal, 10);
            
            expect(hash).not.toBe(passwordOriginal);
            expect(bcrypt.compareSync(passwordOriginal, hash)).toBe(true);
        });
    });
});