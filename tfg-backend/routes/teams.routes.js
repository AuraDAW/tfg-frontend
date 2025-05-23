import { Router } from 'express';
import { addPokemonToTeam, addTeam, delTeam, favoriteTeam, getFavoriteTeams, getTeam, getTeams, getTeamsUser, updateTeam } from '../controllers/teams.controllers.js';
import { autenticarToken } from '../controllers/auth.controllers.js';


const router=Router(); //manejar las rutas

router.get('/teams',autenticarToken, getTeams);
router.get('/teams/favoriteTeam', getFavoriteTeams)
router.get('/teams/:id', autenticarToken, getTeam);
router.get('/teams/userId/:id', autenticarToken, getTeamsUser)
router.get('/teams/favoriteTeam/:id',autenticarToken,favoriteTeam)


router.post('/teams', autenticarToken,addTeam);
router.put('/teams/:id', autenticarToken,updateTeam);
router.post('/teams/addPokemon/:teamId', autenticarToken,addPokemonToTeam)

router.delete('/teams/:id', autenticarToken,delTeam);

//exportar las rutas

export {router as routerTeams}