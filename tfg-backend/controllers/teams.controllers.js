"use strict"
import { pool } from '../db.js'

export const getTeams = async (req, res)=>{
    try {
        const [result] =await pool.query("SELECT * FROM teams");
     res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:'Error al obtener los alumnos'});
     }
}

export const getTeamsUser = async (req,res)=>{
    const {id} = req.params;
    try{
        const [result] = await pool.query("SELECT * FROM teams WHERE user_id=?",[id])
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({message:'Error al obtener los equipos'})
    }
}

export const getTeam = async (req, res)=>{
   
    //extraer el id de la url
    const {id} =req.params;
    try {
        const [result] =await pool.query("SELECT * FROM teams WHERE id=?", [id]);
     res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:'Error al obtener los equipos'});
     }
     
}

export const addTeam = async (req, res)=>{
   
    //extraer los campos del body
    console.log(req.body);
    const {name,description,user_id,pokemon_1,pokemon_2,pokemon_3,pokemon_4,pokemon_5,pokemon_6} = req.body
    
    try {
        const [result] =await pool.query("INSERT INTO teams (name,description,user_id,pokemon_1,pokemon_2,pokemon_3,pokemon_4,pokemon_5,pokemon_6) VALUES (?,?,?,?,?,?,?,?,?)", 
            [name,description,user_id,pokemon_1,pokemon_2,pokemon_3,pokemon_4,pokemon_5,pokemon_6]);
             
        if (result.affectedRows == 1){
            res.status(201).json({id :result.insertId});
        }else{
            res.status(400).json({message :'Equipo no insertado'});
        }
        
     } catch (error) {
        res.status(500).json({message:'Error al obtener los equipos'});
     }
     
}

export const addPokemonToTeam = async (req,res)=>{
    const {teamId} = req.params //obtain team id from url
    const {id} = req.body //obtenemos id del pokemon a insertar
    try{
        const [teamRows] = await pool.query("SELECT pokemon_1, pokemon_2, pokemon_3, pokemon_4, pokemon_5, pokemon_6 FROM teams where id=?", [teamId])
        const teams = teamRows[0];
        console.log(teams);

        let columnToUpdate = null;
        for(let i=1; i<=6;i++){
            if(!teams[`pokemon_${i}`]){
                columnToUpdate = `pokemon_${i}`;
                console.log(columnToUpdate);
                break; //we use break so it stops as soon as it finds a row that isnt null, so we dont end up adding onto pokemon_6 instead of pokemon_1
            }
        }
        // if columnToUpdate is still null after looping, all slots must have been filled
        // this is irrelevant as the "add pokemon" button should be disabled if there are 6 pokemon
        if(!columnToUpdate){
            res.status(400).json({message :'Team is full.'});
        }
        await pool.query(`UPDATE teams SET ${columnToUpdate}=? WHERE id=?`,[id, teamId])
        res.status(200).json({ message: 'Pokémon added to team.'});
    }catch(error){
        res.status(500).json({message:'Error.'});
    }
}

export const updateTeam = async (req, res)=>{
   
    //extraer los campos del body
    const {name,description} = req.body
    const {id} =req.params; //extraer de la URL el id
    try {
        const [result] =await pool.query("UPDATE teams SET name=?, description=? WHERE id=?", 
            [name,description,id]);
             
        if (result.affectedRows == 1){
            res.status(200).json({message: 'Equipo actualizado'});
        }else{
            res.status(400).json({message :'Equipo no existe'});
        }
        
     } catch (error) {
        res.status(500).json({message:'Error al obtener los equipos'});
     }
     
}


export const delTeam = async (req, res)=>{
   
    //extraer los campos del body
    const {id} = req.params
    
    try {
        
        const [team] = await pool.query("SELECT pokemon_1, pokemon_2, pokemon_3, pokemon_4, pokemon_5, pokemon_6 FROM teams WHERE id=?",[id])
        
        const pokemonInTeam = Object.values(team[0]).filter(pid => pid !== null);
        
        const [result] = await pool.query("DELETE FROM teams WHERE id=?",[id])
        
        if(result.affectedRows!=1){
            res.status(400).json({message:"Equipo no borrado."})
        }

        if(pokemonInTeam.length>0){
            await pool.query("DELETE FROM pokemon_team WHERE id IN (?)",[pokemonInTeam])
        }
        
        res.status(200).json({message:"Equipo y sus pokemon borrados."})
        
     } catch (error) {
        res.status(500).json({message:'Error al borrar el equipo'});
     }
}

export const favoriteTeam = async (req, res) => {
  const { id } = req.params;

  try {
    // checks whether team is favorited or not
    const [resultFavorite] = await pool.query("SELECT favorited FROM teams WHERE id = ?", [id]);

    if (resultFavorite.length === 0) {
      return res.status(404).json({ message: "Equipo no encontrado." });
    }

    const currentFavorited = resultFavorite[0].favorited;

    // sets favorite to 0 if its 1, to 1 if its 0 (changes value to opposite)
    const newFavorited = currentFavorited ? 0 : 1;

    const [result] = await pool.query("UPDATE teams SET favorited = ? WHERE id = ?",[newFavorited, id]);

    if (result.affectedRows === 1) {
        const messageToShow = newFavorited ? "added" : "removed";
        res.status(200).json({message:messageToShow});
    } else {
        res.status(400).json({ message: "No se pudo actualizar el estado del equipo." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

export const getFavoriteTeams = async (req,res) =>{
    try{
        const [result] = await pool.query ("SELECT * FROM teams WHERE favorited=1");
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({message:'Error al obtener los equipos'});
    }
}