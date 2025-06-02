import e from 'express';

import mongoose from 'mongoose';

let isConnected = false;

const yellow = '\x1b[33m';
const green = '\x1b[32m';
const reset = '\x1b[0m';

const connectarAMongoDB = async () => {
    if (isConnected) {
        console.log('Ya estamos conectados a MongoDB'.green);
        return;

    }

    try {


        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log('----------------------'.yellow);
        console.log(`${yellow}|${reset} ${green}Conectado a MongoDB${reset} ${yellow}|${reset}`);
        console.log('----------------------'.yellow);
    } catch (error) {
        console.error('Error al conectar a MongoDB:'.red, error);
        isConnected = false;

    }
}

const db = mongoose.connection;

db.on('error', (error) => {
    isConnected = false;
    console.error('Error en la conexión a MongoDB:'.blue, error);
});

db.once('open', () => {
    isConnected = true;

});

db.on('disconnected', () => {
    isConnected = false;
    console.log('Desconectado de MongoDB'.yellow);
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Conexión a MongoDB cerrada por la señal SIGINT'.yellow);
    process.exit(0);
});

export { connectarAMongoDB, isConnected };