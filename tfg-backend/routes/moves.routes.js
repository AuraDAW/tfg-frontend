import { Router } from 'express';
import { addMove, getMove, getMoves, getMovesPokemon, updateMove } from '../controllers/moves.controllers.js';
import { autenticarToken } from '../controllers/auth.controllers.js';


const router=Router(); //manejar las rutas

router.get('/moves', autenticarToken, getMoves);
router.get('/moves/:id',autenticarToken, getMove);
router.get('/moves/pokemonMoves/:id', autenticarToken, getMovesPokemon)

router.post('/moves',autenticarToken,addMove)
router.put('/moves/:id',autenticarToken,updateMove)

//exportar las rutas

export {router as routerMoves}