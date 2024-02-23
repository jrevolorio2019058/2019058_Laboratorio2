const { response } = require('express');
const Mascota = require('../models/mascota');

const mascotasGet = async (req, res = response) => {

    const { limite, desde } = req.query;
    const query = { estadoAdopcion: true };

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

const getMascotaByid = async (req, res) => {
    const { id } = req.params;
    const mascota = await Mascota.findOne({ _id: id });
    
    res.status(200).json({
        mascota
    });
}

const mascotaPut = async (req, res) => {

    const { id } = req.params;
    const { _id,estadoAdopcion, ...resto} = req.body;
    await Mascota.findByIdAndUpdate(id, resto);
    const mascota = await Mascota.findOne({_id: id});

    res.status(200).json({

        msd: 'Mascota Actualizado Exitosamente'

    });

}

const mascotaDelete = async (req, res) => {
    
    const { id } = req.params;
   await Mascota.findByIdAndUpdate(id,{estadoAdopcion: false});

    const mascota = await Mascota.findOne({_id: id});;

    res.status(200).json({
        msg: 'Mascota Eliminado Existosamente',
        mascota
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
    mascotasGet,
    getMascotaByid,
    mascotaPut,
    mascotaDelete
}