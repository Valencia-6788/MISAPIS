import { Router } from 'express';
import { getAllVeterinarias, getVeterinariaById, postVeterinaria, putVeterinaria, deleteVeterinaria } from '../controllers/veterinaria.controller.js';

const veterinaria = Router();

veterinaria.get("/", getAllVeterinarias);

veterinaria.get("/:id", getVeterinariaById);

veterinaria.put("/:id", putVeterinaria);

veterinaria.post('/', postVeterinaria);

veterinaria.delete("/:id", deleteVeterinaria);

export default veterinaria;