import { Router } from 'express';
import { addItem, getItem, getItems, updateItem } from '../controllers/items.controllers.js';
import { autenticarToken } from '../controllers/auth.controllers.js';


const router=Router(); //manejar las rutas

router.get('/items',autenticarToken, getItems);
router.get('/items/:id', autenticarToken, getItem);

router.post('/items',autenticarToken,addItem);
router.put('/items/:id',autenticarToken,updateItem)

//exportar las rutas

export {router as routerItems}