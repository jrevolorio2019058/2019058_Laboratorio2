const { Router } = require('express');

const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {existeMascotaById} = require("../helpers/db-validators");

const {mascotaPost, mascotasGet, getMascotaByid, mascotaPut, mascotaDelete} = require('../controllers/mascotas.controller');

const router = Router();

router.get("/", mascotasGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], getMascotaByid);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], mascotaPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], mascotaDelete);

router.post(
    "/",
    [
        check("especie", "La especie es obligatoria").not().isEmpty(),
        check("raza", "La raza es obligatoria").not().isEmpty(),
        check("edad", "La edad es obligatoria").not().isEmpty(),
        check("motivoAdopcion", "El motivo es obligatorio").not().isEmpty(),
        validarCampos
    ], mascotaPost);

module.exports = router;