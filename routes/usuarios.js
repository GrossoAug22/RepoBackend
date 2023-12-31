const { Router } = require("express");

const router = Router();

const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require("../controllers/usuariosCtrl");

const { esAdminRole } = require("../middlewares/validar-roles");

const { validarJWT } = require("../middlewares/validar-jwt");

const { validarCampos } = require("../middlewares/ValidarCampos");


const { check } = require("express-validator");


const { esMailValido, esRolValido, esIdValido } = require("../helpers/db_validation");

router.get("/", usuariosGet);


router.post("/",
    [check("nombre", "Nombre Es Un Campo Obligatorio!").notEmpty(),
    check("password", "La Contraseña Debe Contener Como Minimo 6 Caracteres!").isLength({ min: 6 }),
    check("correo", "No Es Un Correo Valido!").isEmail(),
    check("correo").custom(esMailValido),
    check("rol").custom(esRolValido),
        validarCampos,
    ],
    usuariosPost);


router.put("/:id", [
    check("id", "No es un id valido!").isMongoId(),
    check("id").custom(esIdValido),
    validarCampos,
], usuariosPut);


router.delete("/:id",
    [
        validarJWT,
        esAdminRole,
        check("id", "No es un id valido!").isMongoId(),
        check("id").custom(esIdValido),
        validarCampos
    ],
    usuariosDelete
);


module.exports = router;