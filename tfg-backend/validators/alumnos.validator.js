"use strict"
import {check, validationResult} from 'express-validator';

export const validar= [
    check('nomApe').exists().withMessage('El nombre de usuario es obligatorio'),
    check('nomApe').notEmpty().withMessage('El nombre del alumno no puede estar vacío'),
    check('nomApe').isLength({min:5,max:50}).withMessage('El nombre del alumno debe tener entre 5 y 50 car.'),
    check('idCurso').exists().notEmpty().isLength({min:3,max:10}).withMessage('El id curso no debe estar vacío y su longitud será entre 3 y 10 carac.'),
    (req, res, next)=>{
        const errores= validationResult(req);
        if (!errores.isEmpty()){ //si hay hay errores
            return res.status(400).json({errors:errores.array()})
        }else{
            next(); //si no hay errores se pasa al siguiente middleware (controlador)
        }
    }
]

