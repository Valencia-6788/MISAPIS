import express from 'express';
import cors from 'cors';
import indexRoutes from '../routes/index.routes.js';
import * as db from '../db/cnn_mongodb.js';

export default class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.generalRoute = '/api/';
        this.conectarDBMongo();

        // Middlewares
        this.middlewares();
        // Rutas de mi aplicación
        this.routes();

    }

    async conectarDBMongo() {
        if(!db.isConnected) {
            await db.connectarAMongoDB();
        }
        
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));
    }
    routes() {
        //  localhost:3000/api/ejemplo
        this.app.use(this.generalRoute, indexRoutes);
        this.app.use((req, res) => {
            res.status(404).json({
                msg: 'Ruta no encontrada'
            });
        });
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto',`${this.port}`.yellow);
        });
    }

}