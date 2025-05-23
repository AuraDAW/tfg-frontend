import { Router } from 'express';
import { addAbility, getAbilities, getAbility, getAbilityPokemon, updateAbility } from '../controllers/abilities.controllers.js';
import { autenticarToken } from '../controllers/auth.controllers.js';


const router=Router(); //manejar las rutas

router.get('/abilities', autenticarToken, getAbilities);
router.get('/abilities/:id', autenticarToken, getAbility);
router.get('/abilities/pokemonAbilities/:id', autenticarToken, getAbilityPokemon)

router.post('/abilities',autenticarToken, addAbility)
router.put('/abilities/:id',autenticarToken,updateAbility)

//exportar las rutas

export {router as routerAbilities}