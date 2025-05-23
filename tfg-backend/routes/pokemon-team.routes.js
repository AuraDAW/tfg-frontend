import { Router } from 'express';
import { addPokemon, delPokemon, getPokemon, getPokemons, updatePokemon } from '../controllers/pokemon-team.controllers.js';
import { autenticarToken } from '../controllers/auth.controllers.js';


const router=Router(); //manejar las rutas

router.get('/pokemonTeam',autenticarToken, getPokemons);
router.get('/pokemonTeam/:id',autenticarToken, getPokemon);

router.post('/pokemonTeam',autenticarToken, addPokemon);
router.put('/pokemonTeam/:id',autenticarToken, updatePokemon);

router.delete('/pokemonTeam/:id',autenticarToken, delPokemon);

//exportar las rutas

export {router as routerPokemonTeam}