#!/usr/bin/env node

//Import the path module
const path = require('path');
// File system module
const fs = require('fs');

// Modulo, solicitud HTTP
//const fetch = require("node-fetch");

// 1. Obteniendo la ruta
const arguments = process.argv[2];
console.log(process.argv)

////////// 2 Función que comprueba si existe la ruta 
const validatePath = (route) => fs.existsSync(route)

////////// 3.Funcion que comprueba si la ruta es absoluta
const convertToAbsolute = (route) => path.resolve(route);

////////// 4.Funcion que verifica si es directorio
const itsDirectory = (route) => fs.statSync(route).isDirectory();

///////// 5. Funcion que verdifica si tiene archivos md
const mdExtension = (route) => path.extname(route);

///////// 6. Funcion que lee los archivoS
const readFile = (route) => fs.readFileSync(route, { encoding: "utf-8", flag: "r" });



//Probando
const temporal = () => {
    try {
      const result =  validatePath(arguments);
        console.log({result});
    } catch (error) {
        console.error({error});
    }
}
temporal();
module.exports = { validatePath};