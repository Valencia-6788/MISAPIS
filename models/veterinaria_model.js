import mongoose from "mongoose";

const VeterinariaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: false
    },
    contacto:{
        type: [String],
        required: false
    },
    grupo_sanguineo: {
        type: String,
        required: false
    },
    horas_trabajo: {
        type: [String],
        required: false
    },
    contactos_emergencia: {
        type: [String],
        required: false
    },
    especialidades: {
        type: [String],
        required: false
    },
    cedula_veterinaria: {
        type: String,
        required: true,
        unique: true
    },
});

const Veterinaria = mongoose.model('Veterinaria', VeterinariaSchema); 

export default Veterinaria;