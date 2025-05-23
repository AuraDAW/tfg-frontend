"use strict"
import { pool } from '../db.js'

export const getItems = async (req, res)=>{
    try {
        const [result] =await pool.query("SELECT * FROM items");
     res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:'Error al obtener los alumnos'});
     }
     
}

export const getItem = async (req, res)=>{
   
    //extraer el id de la url
    const {id} =req.params;
    try {
        const [result] =await pool.query("SELECT * FROM items WHERE id=?", [id]);
     res.status(200).json(result);
     } catch (error) {
        res.status(500).json({message:'Error al obtener los alumnos'});
     }
     
}

export const addItem = async (req, res) => {
  //extraer los campos del body
  console.log(req.body);
  const { name_en, name_es, description_en, description_es, image } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO items (name_en,name_es,description_en,description_es,image) VALUES (?,?,?,?,?)",
      [name_en, name_es, description_en, description_es, image]
    );

    if (result.affectedRows == 1) {
      res.status(201).json({ id: result.insertId });
    } else {
      res.status(400).json({ message: "Item no insertado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los items" });
  }
};

export const updateItem = async (req, res) => {
  const { id } = req.params; //extraer de la URL el id
  const { name_en, name_es, description_en, description_es, image } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE items SET name_en=?, name_es=?, description_en=?, description_es=?, image=? WHERE id=?",
      [name_en, name_es, description_en, description_es, image, id]
    );

    if (result.affectedRows == 1) {
      res.status(200).json({ message: "Item actualizado" });
    } else {
      res.status(400).json({ message: "Item no existe" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los items" });
  }
};
