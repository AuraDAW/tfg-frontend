import { Router } from 'express';
import { addPokemon, getPokemon, getPokemonDataFromTeam, getPokemons, pokemonHasAbility, pokemonLearnsMove, updatePokemon } from '../controllers/pokemon-data.controllers.js';
import { autenticarToken } from '../controllers/auth.controllers.js';


const router=Router(); //manejar las rutas

router.get('/pokemonData',autenticarToken, getPokemons);
router.get('/pokemonData/:id',autenticarToken, getPokemon);
router.get('/pokemonData/getData/:id',autenticarToken, getPokemonDataFromTeam)

router.post('/pokemonData', autenticarToken, addPokemon)
router.put('/pokemonData/:id', autenticarToken, updatePokemon)

router.post('/pokemonData/addAbilities', autenticarToken, pokemonHasAbility)
router.post('/pokemonData/addMoves', autenticarToken, pokemonLearnsMove)

//exportar las rutas

export {router as routerPokemonData}