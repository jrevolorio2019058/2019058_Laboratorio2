const Usuario = require('../models/usuario');
const Mascota = require('../models/mascota');
const Role = require('../models/role');

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El email ${correo} ya fue registrada`);
    }
}

const existeUsuarioById = async (id = '') => {
    const existeUsuario = await Usuario.findOne({ id });
    if (existeUsuario) {
        throw new Error(`El usuario con el $(id) no existe`)
    }
}

const existeMascotaById = async (id = '') => {
    const existeMascota = await Mascota.findOne({ id });
    if (existeMascota) {
        throw new Error(`La mascota con el $(id) no existe`)
    }
}

const esRolValido = async (role='') => {
    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new Error(`El role ${ role } no existe en base de datos.` )
    }
}

const validacionLogin = async (correo = '', password = '') => {

    const existeCorreo = await Usuario.findOne({ correo });
    const existePassword = await Usuario.findOne({ password });

    if(!existeCorreo){
        throw new Error(`El correo ${ correo } no existe en base de datos.` )
    } else if (!existePassword) {
        throw new Error(`La contraseña ${ password } no existe en base de datos.` )
    }
    
    /*else if (!existeCorreo || !existePassword) {
        throw new Error(`El correo ${ correo } y la contraseña ${ password } no existe en base de datos.` )
    }*/

}

module.exports = {
    existenteEmail,
    existeUsuarioById,
    esRolValido,
    existeMascotaById,
    validacionLogin
}