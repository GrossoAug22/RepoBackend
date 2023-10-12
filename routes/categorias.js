const { Router } = require("express");
const { check } = require("express-validator");
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, eliminarCategoria } = require("../controllers/categoriasCtrl");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-roles");
const { validarCampos } = require("../middlewares/ValidarCampos");
const { esCategoriaValida } = require("../helpers/db_validation");

const router = Router();

router.get("/", [validarJWT], obtenerCategorias);

router.get("/:id", [validarJWT,
    check("id", "El id No Es Valido!").isMongoId(),
    check("id").custom(esCategoriaValida),
    validarCampos,
], obtenerCategoria);

router.post("/", [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio!").notEmpty()
] ,crearCategoria);

router.put("/:id",[validarJWT,
     esAdminRole,
     check("id", "El id No Es Valido!").isMongoId(),
     check("nombre", "El nombre es obligatorio!").notEmpty(),
     check("id").custom(esCategoriaValida),
     validarCampos,
     ],actualizarCategoria);
     


     router.delete("/:id",[
        validarJWT,
        esAdminRole,
        check("id","No es un id valido!").isMongoId(),
        check("id").custom(esCategoriaValida),
        validarCampos,
     ],eliminarCategoria);


module.exports = router; 