#!/usr/bin/env node

//Import the path module
const path = require("path");
// File system module
const fs = require("fs");

// Modulo, solicitud HTTP
//const fetch = require("node-fetch");

////////// 1. Returns an array containing the arguments,
// the second element is the path for the js file.
const arguments = process.argv[2];
// console.log(process.argv);

////////// 2. Verifica si existe el archivo en la ruta dada o no (retorna true o false)
const validatePath = (route) => fs.existsSync(route);

////////// 3. Retorna un string con la ruta absoluta
const absolutePath = (route) => path.resolve(route);

////////// 4.Verifica si la ruta es archivo o directorio 
const itsDirectory = (route) => fs.statSync(route).isDirectory();

///////// 5. Retorna archivos con .md extension
const mdExtension = (routes) => {
  return routes.filter((route) => {
    console.log('extension',path.extname(route));
  return  path.extname(route) === ".md"})

}

///////// 6. Leer el archivo y retornar su contenido
const readFile = (route) => fs.readFileSync(route, { encoding: "utf-8", flag: "r" });


//////////// 6.Funcion que extrae archivos .md
function searchFileMd(route) {
  let allFilesMd = [];
  if(itsDirectory(route)) {
    //Leer el contenido del directorio y retornar una array de objetos que contienen los archivos en el directorio.
    const readDirectory = fs.readdirSync(route);
    console.log({readDirectory});
    const filesMd = mdExtension(readDirectory)
    filesMd.forEach((file) => {
      const dataFile = readFile(file)
      console.log({dataFile});
    })
  }
  return allFilesMd;
}





module.exports = { validatePath };


//Probando
const temporal = () => {
  try {
    const result = searchFileMd(arguments);
    console.log({ result });
  } catch (error) {
    console.error({ error });
  }
};
temporal();