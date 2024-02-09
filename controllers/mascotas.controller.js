const { response, json } = require('express');
const Mascota = require('../models/mascota');

const mascotasGet = async (req, res = response) => {

    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, mascotas] = await Promise.all([
        Mascota.countDocuments(query),
        Mascota.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        mascotas
    });

}

const mascotaPost = async (req, res) => {
        const { especie, raza, edad, motivoAdopcion, estadoAdopcion } = req.body;
        const mascota = new Mascota({ especie, raza, edad, motivoAdopcion, estadoAdopcion });

        await mascota.save();
        res.status(200).json({
            mascota
        });

    }

module.exports = {
    mascotaPost,
    mascotasGet
}