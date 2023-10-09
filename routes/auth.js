const { Router } = require("express");
const { login } = require("../controllers/authCtrl");
const { check } = require("express-validator");

const router = Router();


router.post("/login", [
    check("correo", "El Correo No Es Valido!").isEmail(),
    check("password","La Contraseña Debe tener un minimo de 6 caracteres!").isLength({min:6}),
], login);


module.exports = router;