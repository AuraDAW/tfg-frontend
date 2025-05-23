"use strict"
import { pool } from '../db.js'

export const getTypes = async (req, res)=>{
    try {
        const [result] =await pool.query("SELECT * FROM types");
     res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:'Error al obtener los alumnos'});
     }
     
}

export const getType = async (req, res)=>{
   
    //extraer el id de la url
    const {id} =req.params;
    try {
        const [result] =await pool.query("SELECT * FROM types WHERE id=?", [id]);
     res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:'Error al obtener los alumnos'});
     }
     
}

export const getTypePokemon = async (req,res)=>{
   // extraer el id de la url
   const {id} = req.params;
   try{
      const [types] = await pool.query("SELECT type, type_2 FROM pokemon_data WHERE id=?",[id]);
      const [result] = await pool.query("SELECT * FROM types WHERE id IN (?,?)",[types[0].type, types[0].type_2])
      res.status(200).json(result);
   }catch(error){
      res.status(500).json({message:'Error al obtener los tipos'})
   }
}

