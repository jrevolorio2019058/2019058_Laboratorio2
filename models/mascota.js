const { Schema, model } = require('mongoose');

const MascotaSchema = Schema({
   
    especie: {
        type: String,
        require: [true, 'La especie es obligatoria']
    },
    raza: {
        type: String,
        require: [true, 'La raza es obligatoria']
    },
    edad: {
        type: String,
        require: [true, 'La edad es obligatoria']
    },
    motivoAdopcion: {
        type: String,
        require: [true, 'Es necesario un motivo por el cual esta en adopcion']
    },
    estadoAdopcion: {
        type: Boolean,
        default: true
    }

});

module.exports = model('Mascota', MascotaSchema);