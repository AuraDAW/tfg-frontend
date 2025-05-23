"use strict"
import { pool } from '../db.js'

export const getMoves = async (req, res)=>{
    try {
        const [result] =await pool.query("SELECT * FROM moves");
     res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:'Error al obtener los movimientos'});
     }
     
}

export const getMove = async (req, res)=>{
   
    //extraer el id de la url
    const {id} =req.params;
    try {
        const [result] =await pool.query("SELECT * FROM moves WHERE id=?", [id]);
     res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:'Error al obtener los movimientos'});
     }
     
}

export const getMovesPokemon = async (req,res)=>{
   // extraer id url
   const {id}=req.params;
   try{
      const [result] = await pool.query("SELECT m.* FROM moves m JOIN pokemon_learns_move plm ON m.id = plm.id_move WHERE plm.id_pokemon = ?", [id]);
      res.status(200).json(result);
   }catch(error){
      res.status(500).json({message:"Error al obtener los movimientos."})
   }
}

export const addMove = async (req, res)=>{
    //extraer los campos del body
    console.log(req.body);
    const {name_en, name_es, description_en, description_es, type, power, accuracy} = req.body
    
    try {
        const [result] =await pool.query("INSERT INTO moves (name_en,name_es,description_en,description_es,type,power,accuracy) VALUES (?,?,?,?,?,?,?)", 
            [name_en, name_es,description_en,description_es,type,power,accuracy]);
             
        if (result.affectedRows == 1){
            res.status(201).json({id :result.insertId});
        }else{
            res.status(400).json({message :'Pokemon no insertado'});
        }
        
     } catch (error) {
        res.status(500).json({message:'Error al obtener los pokemon'});
     }
}

export const updateMove = async (req, res)=>{
   
    const {id} =req.params; //extraer de la URL el id
    const {name_en, name_es, description_en, description_es, type, power, accuracy} = req.body
    try {
        const [result] =await pool.query("UPDATE moves SET name_en=?, name_es=?, description_en=?, description_es=?, type=?, power=?, accuracy=? WHERE id=?", 
            [name_en, name_es, description_en, description_es, type, power, accuracy, id]);
             
        if (result.affectedRows == 1){
            res.status(200).json({message: 'Pokemon actualizado'});
        }else{
            res.status(400).json({message :'Pokemon no existe'});
        }
        
     } catch (error) {
        res.status(500).json({message:'Error al obtener los pokemon'});
     }
}

