
// Modulos clases que se necesitan
const fs = require('fs');
const readline = require('readline');
const Alumno = require('./alumnos');
const Carrera = require('./carreras');

const rl = readline.createInterface({
    input: process.stdin, //proceso de entrada (pregunta o instrucciones para leer entrada de datos)
    output: process.stdout //funcion que procesa el dato recibido en el input lo transforma y genera un output
});

const dataFolder = './data/';
const alumnosFile = dataFolder + 'alumnos.json';
const carrerasFile = dataFolder + 'carreras.json';

let alumnos = [];
let carreras = [];

function generarID(entidad) {
    if (entidad == 'alumnos') {
        return alumnos[alumnos.length - 1].id + 1;
    } else {
        return carreras[carreras.length - 1].id + 1;
    }
}

// Lee datos del archivo .json y los carga en los arreglos
function cargarDatos() {
    try {
        const alumnosData = fs.readFileSync(alumnosFile, 'utf8');
        const carrerasData = fs.readFileSync(carrerasFile, 'utf8');
        alumnos = JSON.parse(alumnosData);
        carreras = JSON.parse(carrerasData);
    } catch (err) {
        console.error('Error al leer los archivos:', err);
    }
}

function guardarDatos(entidad, jsonEntidad) {
    try {
        fs.writeFileSync(`data/${entidad}.json`, jsonEntidad, 'utf8');
        console.log('Se modificó la entidad correctamente.');
    } catch (err) {
        console.error('Error al modificar la entidad:', err);
    }
}

function mostrarMenuPrincipal() {
    console.log('\n** Menú **');
    console.log('1. Alumnos');
    console.log('2. Carreras');
    console.log('3. Salir');
}

function mostrarSubMenuEntidad(entidad) {
    console.log(`\n** ${entidad} **`);
    console.log('1. Ver listado');
    console.log('2. Agregar');
    console.log('3. Borrar');
    console.log('4. Cambiar');
    console.log('5. Agregar alumno a carrera');
    console.log('6. Volver al menú principal');
}

function mostrarListado(entidad) {
    //instrucciones para mostrar el listado
    if (entidad == 'alumnos') {
        console.log('--Lista de alumnos--');
        for (const alumno of alumnos) {
            console.log('ID: ' + alumno.id);
            console.log('Nombre: ' + alumno.nombre);
            console.log('Carrera: ' + alumno.carrera);
            console.log('-----')
        }
    } else {
        console.log('--Lista de carreras--');
        for (const carrera of carreras) {
            console.log('ID: ' + carrera.id);
            console.log('Nombre: ' + carrera.nombre);
            console.log('-----')
        }
    }
}

function agregar(entidad, clase) {
    rl.question(`Ingrese el nombre del nuevo ${entidad}: `, nombre => {
        const nuevaEntidad = new clase(generarID(entidad), nombre);

        if (entidad == 'alumnos') {
            alumnos.push(nuevaEntidad);
            var jsonEntidad = JSON.stringify(alumnos);
        } else {
            carreras.push(nuevaEntidad);
            var jsonEntidad = JSON.stringify(carreras);
        }

        guardarDatos(entidad, jsonEntidad);
        seleccionarAccionEntidad(`${entidad}`);
    });
}

function borrar(entidad, clase) {
    mostrarListado(entidad);
    rl.question(`Ingrese el ID del ${entidad} que desea borrar: `, idString => {
        const id = parseInt(idString);

        if (entidad == 'alumnos') {
            var indice = alumnos.findIndex(alumno => alumno.id === id);
            alumnos.splice(indice, 1);
            var jsonEntidad = JSON.stringify(alumnos);
        } else {
            var indice = carreras.findIndex(carrera => carrera.id === id);
            carreras.splice(indice, 1);
            var jsonEntidad = JSON.stringify(carreras);
        }

        guardarDatos(entidad, jsonEntidad);
        seleccionarAccionEntidad(`${entidad}`);
    });
}

function cambiar(entidad, clase) {
    mostrarListado(entidad);
    rl.question(`Ingrese el ID del ${entidad} que desea cambiar: `, id => {
        //instrucciones para modificar el elemento a la lista (recuerda guardar los cambios en el json)
    });
}

function asignarAlumnoACarrera() {
    mostrarListado('alumnos');
    rl.question(`Ingrese el ID del alumno que desea asignar a una carrera: `, idAlumno => {
        //instrucciones para asignar un alumno a una clase
    });
}

function seleccionarAccionPrincipal() {
    cargarDatos();
    mostrarMenuPrincipal();
    rl.question('Seleccione una opción: ', opcion => {
        switch (opcion) {
            case '1':
                seleccionarAccionEntidad('alumnos');
                break;
            case '2':
                seleccionarAccionEntidad('carreras');
                break;
            case '3':
                console.log('¡Hasta luego!');
                rl.close();
                break;
            default:
                console.log('Opción no válida.');
                seleccionarAccionPrincipal();
        }
    });
}

// Modifica la función para seleccionar acción en entidad (listado, agregar, borrar, cambiar)
function seleccionarAccionEntidad(entidad) {
    cargarDatos();
    mostrarSubMenuEntidad(entidad);
    rl.question(`Seleccione una opción en ${entidad}: `, opcion => {
        switch (opcion) {
            case '1':
                mostrarListado(entidad);
                seleccionarAccionEntidad(entidad);
                break;
            case '2':
                agregar(entidad, entidad === 'alumnos' ? Alumno : Carrera);
                break;
            case '3':
                borrar(entidad, entidad === 'alumnos' ? Alumno : Carrera);
                break;
            case '4':
                cambiar(entidad, entidad === 'alumnos' ? Alumno : Carrera);
                break;
            case '5':
                asignarAlumnoACarrera();
                break;
            case '6':
                seleccionarAccionPrincipal();
                break;
            default:
                console.log('Opción no válida.');
                seleccionarAccionEntidad(entidad);
        }
    });
}

// Iniciar el programa
seleccionarAccionPrincipal();
