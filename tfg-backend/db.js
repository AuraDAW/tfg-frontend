"use strict"

import mysql from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config.js';

//Configurar un pool de conexiones con MYSQL
export const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT,
    waitForConnections : true, //Espera a la conexión si todas están ocupadas
    connectionLimit: 10, //Números máximo de conexiones simultáneas en el pool
    queueLimit: 0, //Limite para la cola de solicitudes (0 significa ilimitado)
});

//verificar si la conexión es exitosa
(async()=>{
    try {
        //Intentar crear una conexión
        const connection = await pool.getConnection();
        console.log('Conexión con MySQL establecida correctamente');
        //liberar la conexión
        connection.release();
    } catch (error) {
        console.log(`Error al conectar con MySQL ${error.message}`);
    }

})()
