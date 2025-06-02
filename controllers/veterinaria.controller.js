import mongoose from "mongoose";
import Veterinaria from "../models/veterinaria_model.js";

// Obtener todas las veterinarias
export const getAllVeterinarias = async (req, res) => {
    try {
        const veterinarias = await Veterinaria.find({}, { __v: 0 });
        if (veterinarias.length === 0) {
            return res.status(404).json({
                error: 'No se encontraron veterinarias'
            });
        }
        return res.status(200).json({ veterinarias });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener las veterinarias'
        });
    }
};

// Obtener una veterinaria por ID
export const getVeterinariaById = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const veterinaria = await Veterinaria.findById(id);
        if (!veterinaria) {
            return res.status(404).json({
                msg: 'Veterinaria no encontrada'
            });
        }
        return res.status(200).json({ veterinaria });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al obtener la veterinaria por ID'
        });
    }
};

// Crear una nueva veterinaria
export const postVeterinaria = async (req, res) => {
    const body = req.body;
    const veterinaria = new Veterinaria(body);
    try {
        const validationError = veterinaria.validateSync();
        if (validationError) {
            const errorMessages = Object.values(validationError.errors).map(err => err.message);
            return res.status(400).json({
                error: errorMessages
            });
        }
        await veterinaria.save();
        return res.status(201).json({ veterinaria });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al crear la veterinaria',
        });
    }
};

// Actualizar una veterinaria por ID
export const putVeterinaria = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const veterinaria = await Veterinaria.findByIdAndUpdate(id, body, { new: true, runValidators: true });
        if (!veterinaria) {
            return res.status(404).json({
                msg: 'Veterinaria no encontrada'
            });
        }
        return res.status(200).json({ veterinaria });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al actualizar la veterinaria',
        });
    }
};

// Eliminar una veterinaria por ID
export const deleteVeterinaria = async (req, res) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                msg: 'ID no válido'
            });
        }
        const veterinaria = await Veterinaria.findByIdAndDelete(id);
        if (!veterinaria) {
            return res.status(404).json({
                msg: 'Veterinaria no encontrada'
            });
        }
        return res.status(200).json({
            msg: 'Veterinaria eliminada correctamente',
            veterinaria
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Error al eliminar la veterinaria'
        });
    }
};