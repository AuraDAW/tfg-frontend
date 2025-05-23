"use strict"

import { pool } from "./db.js"

const addTypes = async () => {
  for (let i = 1; i <= 18; i++) {
    const apiResult = await fetch(`https://pokeapi.co/api/v2/type/${i}`);
    const data = await apiResult.json();
    const image = data.sprites["generation-vii"]["sun-moon"].name_icon
    console.log(data.id);
    console.log(data.name);
    console.log(image);
    const [result] = await pool.query("INSERT INTO types (name, image) VALUES(?,?)", [data.name, image]);
  }
    
};

const addAbilities = async ()=>{
  for (let i = 0; i < 20; i++) {
    const random = Math.floor(Math.random()*307)+1;
    console.log(random);
    let description;
    const dataList = await fetch(`https://pokeapi.co/api/v2/ability/${random}`)
      .then(response => response.json())
      .catch((error) => console.log(error));
      for (const entry in dataList) {
        if (entry === 'flavor_text_entries') { 
          for (const flavor in dataList[`${entry}`]) {
            if (dataList[`${entry}`][`${flavor}`]['language'].name === `en`) {
              description = (dataList[`${entry}`][`${flavor}`].flavor_text);
              break;
            }
          }
        }
      }

console.log(dataList.name);
console.log(description);
    const [result] = await pool.query("INSERT INTO abilities (name, description) VALUES(?,?)", [dataList.name, description]);
  }
}

const addItems = async ()=>{
  for (let i = 0; i < 12; i++) {
    const random = Math.floor(Math.random()*72)+1;
    const response = await fetch("https://pokeapi.co/api/v2/item-category/12")
    const data = await response.json();
    let description="No description found.";

    const itemName = data.items[random].name
    const itemUrl = data.items[random].url

    const dataList = await fetch(itemUrl)
    .then(response => response.json())
    .catch((error) => console.log(error));
    for (const entry in dataList) {
      if (entry === 'flavor_text_entries') { 
        for (const flavor in dataList[`${entry}`]) {
          if (dataList[`${entry}`][`${flavor}`]['language'].name === `en`) {
            description = (dataList[`${entry}`][`${flavor}`].text);
            break;
          }
        }
      }
    }
    console.log(itemName);
    console.log(itemUrl);
    console.log(description);
    const [result] = await pool.query("INSERT INTO items (name, description) VALUES(?,?)", [itemName, description]);
  }
}

const addChoiceItems = async()=>{
  const numberArray = [197, 264, 274]
  for await (const element of numberArray) {
    const data = await fetch(`https://pokeapi.co/api/v2/item/${element}`)
    .then(response => response.json())
    .catch((error) => console.log(error));
    const itemName = data.name;
    let description;

    for (const entry in data) {
      if (entry === 'flavor_text_entries') { 
        for (const flavor in data[`${entry}`]) {
          if (data[`${entry}`][`${flavor}`]['language'].name === `en`) {
            description = (data[`${entry}`][`${flavor}`].text);
            break;
          }
        }
      }
    }
  
    console.log(itemName);
    console.log(description);  
    const [result] = await pool.query("INSERT INTO items (name, description) VALUES (?,?)", [itemName, description])
  };
}

const addMoves = async(name)=>{
    let description;
    const dataList = await fetch(`https://pokeapi.co/api/v2/move/${name}`)
      .then(response => response.json())
      .catch((error) => console.log(error));

      for (const entry in dataList) {
        if (entry === 'flavor_text_entries') { 
          for (const flavor in dataList[`${entry}`]) {
            if (dataList[`${entry}`][`${flavor}`]['language'].name === `en`) {
              description = (dataList[`${entry}`][`${flavor}`].flavor_text);
              break;
            }
          }
        }
      }
console.log(dataList.name);
console.log(dataList.accuracy);
console.log(dataList.power);
console.log(description);
console.log(dataList.type.name);

const [typeId] = await pool.query("SELECT * from types WHERE name=?",[dataList.type.name])
console.log(typeId[0].id);
const [result] = await pool.query("INSERT INTO moves (name, description, type, power, accuracy) VALUES(?,?,?,?,?)", [dataList.name, description, typeId[0].id, dataList.power, dataList.accuracy]);
}

const addPokemon = async()=>{
  for (let i = 0; i < 10; i++) {
    const random = Math.floor(Math.random()*1025)+1;
    const dataList = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}`).then(response => response.json()).catch((error) => console.log(error));
    
    const pokemonId = dataList.id
    const pokemonName = dataList.name;
    const pokemonImage = dataList.sprites.front_default
    const pokemonImageShiny = dataList.sprites.front_shiny
    const baseHP = dataList.stats[0].base_stat
    const baseATK = dataList.stats[1].base_stat
    const baseDEF = dataList.stats[2].base_stat
    const baseSPATK = dataList.stats[3].base_stat
    const baseSPDEF = dataList.stats[4].base_stat
    const baseSPD = dataList.stats[5].base_stat
    let type1, type2=null;
    const [result] = await pool.query("SELECT * FROM types WHERE name=?", dataList.types[0].type.name)
    type1 = result[0].id

    if(dataList.types[1]!=undefined){
      const [result2] = await pool.query("SELECT * FROM types WHERE name=?", dataList.types[1].type.name)
      type2 = result2[0].id
    }
    console.log(pokemonName);
    console.log(pokemonId);
    console.log(pokemonImage);
    console.log(pokemonImageShiny);
    console.log(baseHP, baseATK, baseDEF, baseSPATK, baseSPDEF, baseSPD);

    await pool.query("INSERT INTO pokemon_data (pokedex_id,name,image,image_shiny,type,type_2,base_atk,base_spatk,base_def,base_spdef,base_spd,base_hp) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)", 
      [pokemonId,pokemonName,pokemonImage,pokemonImageShiny,type1,type2,baseATK,baseSPATK,baseDEF,baseSPDEF,baseSPD,baseHP]);

  }
}

// addTypes();
// addAbilities();
// addItems();
// addChoiceItems();
// addMoves("earthquake");
// addMoves("knock-off");
// addMoves("swords-dance");
// addMoves("stealth-rock");
// addMoves("u-turn");
// addMoves("poltergeist");
// addMoves("toxic");
// addMoves("defog");
// addMoves("scald");
// addMoves("stone-edge");
// addMoves("draco-meteor");
// addMoves("make-it-rain");
// addMoves("extreme-speed");
addPokemon();