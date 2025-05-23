"use strict"
import { pool } from '../db.js'

export const getUsers = async (req, res)=>{
    try {
        const [result] =await pool.query("SELECT * FROM users");
     res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:'Error al obtener los usuarios'});
     }
     
}

export const getUser = async (req, res)=>{
   
    //extraer el id de la url
    const {id} =req.params;
    try {
        const [[result]] =await pool.query("SELECT * FROM users WHERE id=?", [id]);
     res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:'Error al obtener los usuarios'});
     }
}

export const getTeamCreator = async (req, res)=>{
   
    //extraer el id de la url
    const {id} =req.params;
    try {
        const [[result]] =await pool.query("SELECT * FROM users WHERE id=?", [id]);
     res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:'Error al obtener los usuarios'});
     }
}