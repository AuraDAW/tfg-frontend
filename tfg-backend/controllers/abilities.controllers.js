"use strict"
import { pool } from '../db.js'

export const getAbilities = async (req, res)=>{
    try {
        const [result] =await pool.query("SELECT * FROM abilities");
     res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:'Error al obtener las habilidades'});
     }
     
}

export const getAbility = async (req, res)=>{
   
    //extraer el id de la url
    const {id} =req.params;
    try {
        const [result] =await pool.query("SELECT * FROM abilities WHERE id=?", [id]);
     res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:'Error al obtener las habilidades'});
     }
}

export const getAbilityPokemon = async(req,res)=>{
   // extraer el id de la url
   const {id} = req.params;
   try{
      const [result] = await pool.query("SELECT a.* FROM abilities a JOIN pokemon_has_ability pha ON a.id = pha.id_ability WHERE pha.id_pokemon = ?;", [id]);
      res.status(200).json(result);
   }catch(error){
      res.status(500).json({message:"Error al obtener las habilidades"})
   }
}

export const addAbility = async (req, res) => {
  //extraer los campos del body
  console.log(req.body);
  const { name_en, name_es, description_en, description_es} = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO abilities (name_en,name_es,description_en,description_es) VALUES (?,?,?,?)",
      [name_en, name_es, description_en, description_es]
    );

    if (result.affectedRows == 1) {
      res.status(201).json({ id: result.insertId });
    } else {
      res.status(400).json({ message: "Habilidad no insertada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las habilidades" });
  }
};

export const updateAbility = async (req, res) => {
  const { id } = req.params; //extraer de la URL el id
  const { name_en, name_es, description_en, description_es } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE abilities SET name_en=?, name_es=?, description_en=?, description_es=?, WHERE id=?",
      [name_en, name_es, description_en, description_es, id]
    );

    if (result.affectedRows == 1) {
      res.status(200).json({ message: "Habilidad actualizada" });
    } else {
      res.status(400).json({ message: "Habilidad no existe" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las habilidades" });
  }
}

export const pokemonHasAbility = async(req,res)=>{
    const data = req.body;

    const values = data.map(({ pokemonId, abilityId }) => `(${pokemonId}, ${abilityId})`).join(', ');
    try{
        const [result] = await pool.query(`INSERT INTO pokemon_has_ability VALUES ${values}`);

        if (result.affectedRows == 1){
            res.status(201).json({id :result.insertId});
        }else{
            res.status(400).json({message :'Pokemon no insertado'});
        }
    }catch(error){
        res.status(500).json({message:'Error al obtener los pokemon o habilidades.'});
    }
}

