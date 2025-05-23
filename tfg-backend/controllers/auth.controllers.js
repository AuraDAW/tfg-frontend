"use strict"
import {pool} from "../db.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { SECRET_KEY } from "../config.js"
export const login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const [result] = await pool.query("SELECT * FROM users where email=?",[email]);
        // console.log(result);
        // comprobar si email existe
        if(result.length==0){
            return res.status(401).json({message:"Email y|o password incorrectas."})
        }
        // verificamos que la contraseña sea correcta con bcrypt
        const validarPass = await bcrypt.compare(password, result[0].password);
        if(!validarPass){ //las contraseñas no coinciden
            return res.status(401).json({message:"Email y|o password incorrectas."})
        }
        // generar el token
        const jwtBearerToken = jwt.sign({userId:result[0].id, role:result[0].role, createTo:new Date().toISOString()}, SECRET_KEY,{
            "expiresIn":28800
        });
        // console.log(jwtBearerToken);
        res.status(200).json({
            idToken: jwtBearerToken, 
            expiresIn: "28800"
          })
    }catch(error){
        res.status(500).json({message:"Error al obtener los usuarios."})
    }
};

export const autenticarToken=(req,res,next)=>{
    // extraemos header de la peticion
    const autHeader = req.headers['authorization']
    // comprobamos que el header con el token existe
    if(!autHeader){
        return res.status(403).json({message:"Token no proporcionado."})
    }
    // extraemos el JWT del header
    // el header tiene formato Bearer jwttoken, separamos por espacios y cogemos el segundo elemento (que es el jwt)
    const token = autHeader.split(" ")[1];
    // console.log(token);
    // verificamos que el token sea correcto
    jwt.verify(token, SECRET_KEY,(err,user)=>{
        if(err){ //el token no es correcto
            return res.status(403).json({message:"Token no valido."})
        }
        // console.log(user);
        req.user=user;
        next();
    })
}

export const register = async (req, res) => {
    // extraer los campos del body
    const {username, password, email} = req.body;
    // creamos contraseña cifrada
    try {
      // comprobar si el email ya existe en algun usuario
      const [user] = await pool.query("SELECT * FROM users WHERE email=?",[email]);
      if(user.length==1){
        return res.status(400).json({message:'Ya existe un usuario con ese email.'})
      }
      const rounds=10; //numero de rondas para el hash de la contraseña
      const passEncrypted = await bcrypt.hash(password, rounds);
      const [result] = await pool.query("INSERT INTO users (username, password, email, role) VALUES(?,?,?,?)", [username,passEncrypted,email,1]);
    //   console.log(result);
        
      if(result.affectedRows==1){
          res.status(201).json({message:"Usuario creado con exito",id:result.insertId});
      }else{
          res.status(400).json({message:'Usuario no creado.'})
      }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios." });
    }
};