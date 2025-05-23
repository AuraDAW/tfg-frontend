import { Router } from 'express';
import { getType, getTypePokemon, getTypes } from '../controllers/types.controllers.js';
import { autenticarToken } from '../controllers/auth.controllers.js';


const router=Router(); //manejar las rutas

router.get('/types', autenticarToken,getTypes);
router.get('/types/:id', autenticarToken,getType);
router.get('/types/getTypes/:id',autenticarToken, getTypePokemon)

//exportar las rutas

export {router as routerTypes}