const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { existenEmail, existeUsuarioById, validacionLogin} = require("../helpers/db-validators");

const { usuarioPost, usuariosGet, getUsuarioByid, usuariosPut, usuariosDelete, login} = require('../controllers/user.controller')

const router = Router();

router.get("/", usuariosGet);

router.get("/login",
    [
        check("correo", "password").custom(validacionLogin),
        validarCampos
    ], login);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], getUsuarioByid);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], usuariosPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeUsuarioById),
        validarCampos
    ], usuariosDelete);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("password", "El password debe de ser mayor a 6 caracteres").isLength({ min: 6, }),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenEmail),
        validarCampos,
    ],usuarioPost);

module.exports = router;
