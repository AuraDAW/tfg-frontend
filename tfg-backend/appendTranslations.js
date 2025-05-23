import { pool } from "./db.js"
import fs from 'fs';
async function addTypeTranslations() {

  const [rows] = await pool.execute('SELECT id, name_en, name_es FROM types');

  const enPath = '../tfg-frontend/public/i18n/en.json';
  const esPath = '../tfg-frontend/public/i18n/es.json';

  const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const esJson = JSON.parse(fs.readFileSync(esPath, 'utf8'));

  rows.forEach(row => {
    const key = `types.name.${row.id}`; // Adjust as needed
    enJson[key] = row.name_en;
    esJson[key] = row.name_es;
  });

  fs.writeFileSync(enPath, JSON.stringify(enJson, null, 2));
  fs.writeFileSync(esPath, JSON.stringify(esJson, null, 2));

  console.log('Type Translations Updated');
  await pool.end();
}

async function addItemTranslations() {

  const [rows] = await pool.execute('SELECT id, name_en, name_es FROM items');

  const enPath = '../tfg-frontend/public/i18n/en.json';
  const esPath = '../tfg-frontend/public/i18n/es.json';

  const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const esJson = JSON.parse(fs.readFileSync(esPath, 'utf8'));

  rows.forEach(row => {
    const key = `items.name.${row.id}`; // Adjust as needed
    enJson[key] = row.name_en;
    esJson[key] = row.name_es;
  });

  fs.writeFileSync(enPath, JSON.stringify(enJson, null, 2));
  fs.writeFileSync(esPath, JSON.stringify(esJson, null, 2));

  console.log('Item translations updated');
  await pool.end();
}

async function addAbilityTranslations() {

  const [rows] = await pool.execute('SELECT id, name_en, name_es FROM abilities');

  const enPath = '../tfg-frontend/public/i18n/en.json';
  const esPath = '../tfg-frontend/public/i18n/es.json';

  const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const esJson = JSON.parse(fs.readFileSync(esPath, 'utf8'));

  rows.forEach(row => {
    const key = `abilities.name.${row.id}`; // Adjust as needed
    enJson[key] = row.name_en;
    esJson[key] = row.name_es;
  });

  fs.writeFileSync(enPath, JSON.stringify(enJson, null, 2));
  fs.writeFileSync(esPath, JSON.stringify(esJson, null, 2));

  console.log('Ability translations updated');
  await pool.end();
}

async function addMovesTranslations() {

  const [rows] = await pool.execute('SELECT id, name_en, name_es FROM moves');

  const enPath = '../tfg-frontend/public/i18n/en.json';
  const esPath = '../tfg-frontend/public/i18n/es.json';

  const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const esJson = JSON.parse(fs.readFileSync(esPath, 'utf8'));

  rows.forEach(row => {
    const key = `moves.name.${row.id}`; // Adjust as needed
    enJson[key] = row.name_en;
    esJson[key] = row.name_es;
  });

  fs.writeFileSync(enPath, JSON.stringify(enJson, null, 2));
  fs.writeFileSync(esPath, JSON.stringify(esJson, null, 2));

  console.log('Move translations updated');
  await pool.end();
}

async function addPokemonTranslations() {

  const [rows] = await pool.execute('SELECT id, name_en, name_es FROM pokemon_data');

  const enPath = '../tfg-frontend/public/i18n/en.json';
  const esPath = '../tfg-frontend/public/i18n/es.json';

  const enJson = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const esJson = JSON.parse(fs.readFileSync(esPath, 'utf8'));

  rows.forEach(row => {
    const key = `pokemonData.name.${row.id}`; // Adjust as needed
    enJson[key] = row.name_en;
    esJson[key] = row.name_es;
  });

  fs.writeFileSync(enPath, JSON.stringify(enJson, null, 2));
  fs.writeFileSync(esPath, JSON.stringify(esJson, null, 2));

  console.log('Pokemon translations updated');
  await pool.end();
}

// addTypeTranslations();
// addItemTranslations();
// addAbilityTranslations();
// addMovesTranslations();
// addPokemonTranslations();