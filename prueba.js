let fs = require('fs');
const readline = require('readline-sync');
const Alumno = require('./alumnos');
const Carrera = require('./carreras');
//const path = require('path');
// Ruta al archivo JSON



// Ruta al archivo JSON
//const rutaArchivo = 'data/';

var opcion = readline.question("estudiantes o alumnos: ");
const nombreArchivo = `data/${opcion}.json`;
//const filePath = path.join(rutaArchivo, nombreArchivo);

// Leer el archivo JSON de forma sincrónica (ten en cuenta que bloqueará el hilo principal)
// try {
//   const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
//   const datos = JSON.parse(contenido);
//   console.log(datos);
// } catch (error) {
//   console.error('Error al leer el archivo JSON:', error);
// }
let alumnos = [];
let carreras = [];
const alumno = new Alumno(1, 'Ximena Islas');
const carrera = new Carrera(1, 'Ingenieria en Software');


function leerArchivo() {
  fs.readFile(nombreArchivo, 'utf-8', (err, data) => {
    if (err) {
      console.log('error: ' + err);
    } else {
      alumnos = JSON.parse(data);
      console.log(alumnos);
    }
  });
}
leerArchivo();

// function agregar(){
//   alumnos.push(alumno);
//   const jsonString = JSON.stringify(alumnos);
//   fs.writeFileSync(nombreArchivo, jsonString, 'utf8');
//   // fs.writeFile(nombreArchivo, alumnos, (err) => {
//   //   if(err){
//   //     console.log('error: ' +err);
//   //   }else{
//   //     console.log('ya se guardó' + jsonString);
//   //   }
//   // });
// }

//agregar();