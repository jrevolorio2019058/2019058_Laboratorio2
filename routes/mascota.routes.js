const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {mascotaPost, mascotasGet} = require('../controllers/mascotas.controller');

const router = Router();

router.get("/", mascotasGet);

router.post(
    "/",
    [
        check("edad","La edad maximo es 100").isLength({max: 6,}),
        validarCampos,
    ]
), mascotaPost;

module.exports = router;