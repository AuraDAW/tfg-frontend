"use strict"

import { Router } from "express";
import { login, register } from "../controllers/auth.controllers.js";


const router=Router(); //manejar las rutas

router.post('/login', login);
router.post('/register', register);

//exportar las rutas

export {router as routerAuth}