import veterinaria from "./veterinaria.routes.js";
import { Router } from "express";
const indexRoutes = Router();

indexRoutes.use("/veterinaria", veterinaria);

export default indexRoutes;