import { Router } from 'express';
import { autenticarToken } from '../controllers/auth.controllers.js';
import { getTeamCreator, getUser, getUsers } from '../controllers/users.controllers.js';


const router=Router(); //manejar las rutas

router.get('/users', autenticarToken, getUsers);
router.get('/users/teamCreator/:id', getTeamCreator);
router.get('/users/:id', autenticarToken, getUser);


//exportar las rutas

export {router as routerUsers}