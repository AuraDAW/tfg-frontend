"use strict"
import { pool } from '../db.js'

export const getPokemons = async (req, res)=>{
    try {
        const [result] =await pool.query("SELECT * FROM pokemon_data");
     res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:'Error al obtener los alumnos'});
     }
}

export const getPokemon = async (req, res)=>{
    //extraer el id de la url
    const {id} =req.params;
    try {
        const [result] =await pool.query("SELECT * FROM pokemon_data WHERE id=?", [id]);
     res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:'Error al obtener los alumnos'});
     }
}

export const getPokemonDataFromTeam = async (req,res)=>{
   //extraer el id de la url
   const {id} =req.params;
   try {
      const [pokemonTeam] =await pool.query("SELECT * FROM pokemon_team WHERE id_pokemon=?", [id]);
      const [result] = await pool.query("SELECT * FROM pokemon_data WHERE id=?",[pokemonTeam[0].id_pokemon])
      res.status(200).json(result);
   } catch (error) {
      res.status(500).json({message:'Error al obtener los alumnos'});
   }
}

export const addPokemon = async (req, res)=>{
    //extraer los campos del body
    console.log(req.body);
    const {pokedex_id, name_en, image, image_shiny, type, type_2, base_atk, 
      base_spatk, base_def, base_spdef, base_spd, base_hp, name_es} = req.body
    
    try {
        const [result] =await pool.query("INSERT INTO pokemon_data (pokedex_id,name_en,image,image_shiny,type,type_2,base_atk,base_spatk,base_def,base_spdef,base_spd,base_hp,name_es) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)", 
            [pokedex_id, name_en, image, image_shiny, type, type_2, base_atk,
               base_spatk, base_def, base_spdef, base_spd, base_hp, name_es]);
             
        if (result.affectedRows == 1){
            res.status(201).json({id :result.insertId});
        }else{
            res.status(400).json({message :'Pokemon no insertado'});
        }
        
     } catch (error) {
        res.status(500).json({message:'Error al obtener los pokemon'});
     }
}

export const updatePokemon = async (req, res)=>{
   
    //extraer los campos del body
    const {pokedex_id, name_en, image, image_shiny, type, type_2, base_atk, 
      base_spatk, base_def, base_spdef, base_spd, base_hp, name_es} = req.body
    const {id} =req.params; //extraer de la URL el id
    try {
        const [result] =await pool.query("UPDATE pokemon_data SET pokedex_id=?, name_en=?, image=?, image_shiny=?, type=?, type_2=?, base_atk=?, base_spatk=?, base_def=?, base_spdef=?, base_spd=?, base_hp=?, name_es=? WHERE id=?", 
            [pokedex_id, name_en, image, image_shiny, type, type_2, base_atk, 
      base_spatk, base_def, base_spdef, base_spd, base_hp, name_es, id]);
             
        if (result.affectedRows == 1){
            res.status(200).json({message: 'Pokemon actualizado'});
        }else{
            res.status(400).json({message :'Pokemon no existe'});
        }
        
     } catch (error) {
        res.status(500).json({message:'Error al obtener los pokemon'});
     }
}

export const pokemonHasAbility = async(req,res)=>{
    const data = req.body;
    const values = data.map(({ pokemonId, abilityId }) => `(${pokemonId}, ${abilityId})`).join(', ');
    try{
        const [result] = await pool.query(`INSERT INTO pokemon_has_ability VALUES ${values}`);

        if (result.affectedRows >= 1){
            res.status(201).json({id :result.insertId});
        }else{
            res.status(400).json({message :'Pokemon no insertado'});
        }
    }catch(error){
        res.status(500).json({message:'Error al obtener los pokemon o habilidades.'});
    }
}

export const pokemonLearnsMove = async(req,res)=>{
    const data = req.body;

    const values = data.map(({ pokemonId, moveId }) => `(${pokemonId}, ${moveId})`).join(', ');
    try{
        const [result] = await pool.query(`INSERT INTO pokemon_learns_move VALUES ${values}`);
        if (result.affectedRows >= 1){
            res.status(201).json({id :result.insertId});
        }else{
            res.status(400).json({message :'Pokemon no insertado'});
        }
    }catch(error){
        res.status(500).json({message:'Error al obtener los pokemon o movimientos.'});
    }
}

