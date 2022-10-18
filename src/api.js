#!/usr/bin/env node

//Import the path module
const path = require("path");
// File system module
const fs = require("fs");
//Modulo, solicitud HTTP
const fetch = require("node-fetch");

////////// 1. Returns an array containing the arguments,
// the second element is the path for the js file.
const arguments = process.argv[2];
const [ , , ruta, ...args] = process.argv

////////// 2. Verifica si existe el archivo en la ruta dada o no (retorna true o false)
const validatePath = (route) => fs.existsSync(route);

////////// 3. Retorna un string con la ruta absoluta
const absolutePath = (route) => path.resolve(route);

////////// 4.Verifica si la ruta es archivo o directorio
const itsDirectory = (route) => fs.statSync(route).isDirectory();

///////// 5. Retorna archivos con .md extension
const mdExtension = (routes) => {
  return routes.filter((route) => {
    // console.log('extension',path.extname(route));
    return path.extname(route) === ".md";
  });
};

///////// 6. Leer el archivo y retornar su contenido
const readFile = (route) => {
  console.log({route})
  return fs.readFileSync(absolutePath(route), { encoding: "utf-8", flag: "r" });
}
  
//////////// 6.Función que extrae archivos .md
function searchFileMd(route) {
  let allLinks = [];
  if (itsDirectory(route)) {
    //Leer el contenido del directorio y retornar una array de objetos que contienen los archivos en el directorio.
    const readDirectory = fs.readdirSync(route);
    // console.log({readDirectory});
    const filesMd = mdExtension(readDirectory);
    filesMd.forEach((file) => {
      console.log({file})
      const dataFile = readFile(file);
      //console.log({dataFile});
      //const regularExpression = /(((https?:\/\/)|(www\.))[^\s]+)/g;
      const regularExpression =
        /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
      const folder = readFile(file).match(regularExpression);
      //console.log(folder);
      folder.forEach((element) => {
        allLinks.push(element);
      });
    });
  }
  console.log("Aquí estan los links", allLinks);
  return allLinks;
}

//7. Función que valida los links

const validateLinks = (arrlinks) => {
  console.log({ arrlinks });
  const arrayPromesas = arrlinks.map((link) => {
    return fetch(link)
      .then((res) => {
        const statusText = res.status == 200 ? res.statusText : "FAIL";
        return {
          ...link,
          status: res.status,
          message: statusText,
        };
      })
      .catch((rej) => {
        return {
          ...link,
          status: rej.status,
          message: "Fail",
        };
      });
  });
  return arrayPromesas;
};

//
const mdLinks = () => {
  try {
    const urls = searchFileMd(arguments);
    if (args.includes("--validate")) {
      const result = validateLinks(urls);
      let arrayLinks = [];
      //console.log({ result });
     Promise.allSettled(result)
      .then((response) => {
        response.forEach((resLinks) => {
          //console.log(resLinks);
          // Obteniendo links válidos
          if (resLinks.value.status === 200) {
            arrayLinks.push(resLinks);
          }
        });
        console.log("Total de links＝", response.length)
        console.log("Total de links válidos✅:", arrayLinks.length)
        console.log("Total de links rotos❌:", response.length - arrayLinks.length)
      })
      .catch((error) => console.log({ error }));
    }
    
  } catch (error) {
    console.error({ error });
  }
};
mdLinks();

