#!/usr/bin/env node

//Import the path module
const path = require('path');
// File system module
const fs = require('fs');
// Expresión regular para la función que busca los links en los archivos
// const urlRegEx = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
// Modulo, solicitud HTTP
const fetch = require("node-fetch");


////////// 1. Función que comprueba si existe la ruta 
const validatePath = (route) => fs.existsSync(route)

////////// 2.Funcion que comprueba si la ruta es absoluta
const convertToAbsolute = (route) => path.resolve(route);

////////// 3.Funcion que verifica si es directorio
const itsDirectory = (route) => fs.statSync(route).isDirectory();

///////// 4. Funcion que verdifica si tiene archivos md
const mdExtension = (route) => path.extname(route);

///////// 5. Funcion que lee los archivoS
const readFile = (route) =>
  fs.readFileSync(route, { encoding: "utf-8", flag: "r" });




module.exports = { validatePath};