"use strict"
//Importar el paquete express
import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import { routerAbilities } from './routes/abilities.routes.js';
import { routerItems } from './routes/items.routes.js';
import { routerMoves } from './routes/moves.routes.js';
import { routerPokemonData } from './routes/pokemon-data.routes.js';
import { routerPokemonTeam } from './routes/pokemon-team.routes.js';
import { routerTeams } from './routes/teams.routes.js';
import { routerTypes } from './routes/types.routes.js';
import { routerAuth } from './routes/auth.routes.js';
import { routerUsers } from './routes/users.routes.js';
//Definer el puerto
//const PORT =3000;

//crear una aplicación express
const app=express();

//establecer cors
app.use(cors());

//para parsear la petición al usuario
app.use(express.json())

//Usar las rutas directas;
app.use(routerAbilities)
app.use(routerItems)
app.use(routerMoves)
app.use(routerPokemonData)
app.use(routerPokemonTeam)
app.use(routerTeams)
app.use(routerTypes)
app.use(routerAuth)
app.use(routerUsers)
 //ruta principal


app.get('/', (req,res)=>{
    res.send("¡Hola Mundo del Servidor Node.js!")
 })

 

 //manejar las rutas no encontradas (404)
 app.use((req, res)=>{
    res.status(404).send("¡¡¡Página errónea!!!")
 }) 
       
//iniciar el servidor y escuchar por el puesto establecido
app.listen(PORT, ()=>{
    console.log(`¡Servidor corriendo en la URL https://localhost:${PORT}` );
})
