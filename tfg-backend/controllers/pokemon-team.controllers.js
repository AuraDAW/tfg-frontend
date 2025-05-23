"use strict"
import { pool } from '../db.js'

export const getPokemons = async (req, res)=>{
    try {
        const [result] =await pool.query("SELECT * FROM pokemon_team");
     res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:'Error al obtener los alumnos'});
     }
     
}

export const getPokemon = async (req, res)=>{
   
    //extraer el id de la url
    const {id} =req.params;
    try {
        const [result] =await pool.query("SELECT * FROM pokemon_team WHERE id=?", [id]);
     res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:'Error al obtener los alumnos'});
     }
     
}

export const addPokemon = async (req, res)=>{
    //extraer los campos del body
    console.log(req.body);
    const {id_pokemon,move_1,move_2,move_3,move_4,ability,item,iv_atk,iv_spatk,iv_def,iv_spdef,iv_spd,iv_hp,
        ev_atk,ev_spatk,ev_def,ev_spdef,ev_spd,ev_hp,is_shiny,tera_type,level} = req.body
    
    try {
        const [result] =await pool.query("INSERT INTO pokemon_team (id_pokemon,move_1,move_2,move_3,move_4,ability,item,iv_atk,iv_spatk,iv_def,iv_spdef,iv_spd,iv_hp,ev_atk,ev_spatk,ev_def,ev_spdef,ev_spd,ev_hp,is_shiny,tera_type,level) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", 
            [id_pokemon,move_1,move_2,move_3,move_4,ability,item,iv_atk,iv_spatk,iv_def,iv_spdef,iv_spd,iv_hp,
                ev_atk,ev_spatk,ev_def,ev_spdef,ev_spd,ev_hp,is_shiny,tera_type,level]);
             
        if (result.affectedRows == 1){
            res.status(201).json({id :result.insertId});
        }else{
            res.status(400).json({message :'Pokemon no insertado'});
        }
        
     } catch (error) {
        res.status(500).json({message:error});
     }
     
}

export const updatePokemon = async (req, res)=>{
   
    //extraer los campos del body
    const {id_pokemon,move_1,move_2,move_3,move_4,ability,item,iv_atk,iv_spatk,iv_def,iv_spdef,iv_spd,iv_hp,
        ev_atk,ev_spatk,ev_def,ev_spdef,ev_spd,ev_hp,is_shiny,tera_type,level} = req.body
    const {id} =req.params; //extraer de la URL el id
    try {
        const [result] =await pool.query("UPDATE pokemon_team SET id_pokemon=?, move_1=?, move_2=?, move_3=?, move_4=?, ability=?, item=?, iv_atk=?, iv_spatk=?, iv_def=?, iv_spdef=?, iv_spd=?, iv_hp=?, ev_atk=?, ev_spatk=?, ev_def=?, ev_spdef=?, ev_spd=?, ev_hp=?, is_shiny=?, tera_type=?, level=? WHERE id=?", 
            [id_pokemon,move_1,move_2,move_3,move_4,ability,item,iv_atk,iv_spatk,iv_def,iv_spdef,iv_spd,iv_hp,
                ev_atk,ev_spatk,ev_def,ev_spdef,ev_spd,ev_hp,is_shiny,tera_type,level,id]);
             
        if (result.affectedRows == 1){
            res.status(200).json({message: 'Pokemon actualizado'});
        }else{
            res.status(400).json({message :'Pokemon no existe'});
        }
        
     } catch (error) {
        res.status(500).json({message:'Error al obtener los pokemon'});
     }
}

export const delPokemon = async (req, res)=>{
   
    //extraer los campos del body
    const {id} = req.params
    
    try {
        const [result] =await pool.query("DELETE FROM pokemon_team WHERE id=?", [id]);
             
        if (result.affectedRows == 1){
            res.status(200).json({message:'Pokemon borrado'});
        }else{
            res.status(400).json({message :'Pokemon no borrado'});
        }
        
     } catch (error) {
        res.status(500).json({message:'Error al borrar el pokemon'});
     }
     
}