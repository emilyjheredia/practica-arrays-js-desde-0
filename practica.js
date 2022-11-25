import { get } from 'https';
import { resolve } from 'path';
import readline from 'readline'; 

const rl = readline.createInterface({  
    input: process.stdin,
    output: process.stdout
});


const students = [{
  age: 32,
  examScores: [],
  gender: 'male',
  name: 'edu'
},
{
  age: 29,
  examScores: [],
  gender: 'female',
  name: 'silvia'
}]

const availableMaleNames = ['pepe', 'juan', 'victor', 'leo', 'francisco', 'carlos'];
const availableFemaleNames = ['cecilia', 'ana', 'luisa', 'silvia', 'isabel', 'virginia'];
const availableGenders = ['male', 'female'];

function requirements() {
  console.log('1- Mostrar en formato de tabla todos los alumnos.')
  console.log('2- Mostrar por consola la cantidad de alumnos que hay en clase.')
  console.log('3- Mostrar por consola todos los nombres de los alumnos.')
  console.log('4- Eliminar el último alumno de la clase.')
  console.log('5- Eliminar un alumno aleatoriamente de la clase.')
  console.log('6- Mostrar por consola todos los datos de los alumnos que son chicas.')
  console.log('7- Mostrar por consola el número de chicos y chicas que hay en la clase.')
  console.log('8- Mostrar true o false por consola si todos los alumnos de la clase son chicas.')
  console.log('9- Mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años.')
  console.log('10- Añadir un alumno nuevo con los siguientes datos:\n- nombre aleatorio.\n- edad aleatoria entre 20 y 50 años.\n- género aleatorio.\n- listado de calificaciones vacío.')
  console.log('11- Mostrar por consola el nombre de la persona más joven de la clase.')
  console.log('12- Mostrar por consola la edad media de todos los alumnos de la clase.')
  console.log('13- Mostrar por consola la edad media de las chicas de la clase.')
  console.log('14- Añadir nueva nota a los alumnos.')
  console.log('15- Ordenar el array de alumnos alfabéticamente según su nombre.')
}

//Funcion para calcular numero aleatorio
function calculateRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

//Calculo de indice aleatorio
const indexNumber = calculateRandomNumber(0, students.length - 1);

//Funcion para pedir numero al usuario
function getNumberFromConsole() {
  const promise = new Promise((resolve, reject) => {
    rl.question('Introduce el numero: ', (num) => {   
      rl.pause();                                      
      resolve(num)
    })
  })

  return promise;
}

let numberFromConsole;


//Funcion para mostrar por consola todos los nombres de los alumnos.
function names() {
  for (let key in students) {
    console.log(students[key].name)
  }
}

//Funcion para mostrar por consola todos los datos de los alumnos que son chicas.
function female() {
  let female = students.filter(student => student.gender === 'female');
  console.log(female)
}

//Funcion para mostrar por consola el numero de chicos que hay en la clase
function boys() {
  const boys = students.filter(student => student.gender === 'male')
  console.log(boys.length)
}  

//Funcion para mostrar por consola el numero de chicas que hay en la clase
function girls() {
  const girls = students.filter(student => student.gender === 'female');
  console.log(girls.length)
}  

//Funcion para mostrar true o false por consola si todos los alumnos de la clase son chicas.            
function allGirls() {
  let allGirls = students.every(student => student.gender === 'female');
  console.log(allGirls)
}


//Funcion para mostrar por consola los nombres de los alumnos que tengan entre 20 y 25 años.
function namesAge() {
  const namesAge = students.filter(student => student.age >= 20 && student.age <= 25);                 
  for (let key in namesAge) {
    console.log(namesAge[key].name)
  }
}


//Funcion que devuelve un array con datos aleatorios
function getRandomData(){ 
  let randomNameFemale = availableFemaleNames[Math.floor(Math.random() * availableFemaleNames.length)];
  let randomNameMale = availableMaleNames[Math.floor(Math.random() * availableMaleNames.length)];
  let randomGender = availableGenders[Math.floor(Math.random() * availableGenders.length)];
  let randomAge = calculateRandomNumber(20, 50);
  return [randomNameFemale,randomNameMale,randomGender,randomAge];
}


//Funcion para añadir un alumno nuevo
function newStudent() {
  let newStudent = new Object();
  let data = getRandomData(); // obtenemos el array de datos aleatorios de la funcion getRandomData()
  newStudent.age = data[3]; // age ahora tiene el valor de data[3] (un numero aleatorio)
  newStudent.examScores = []; 
  newStudent.gender = data[2]; // aca definimos el genero obtenido de data
  newStudent.name = newStudent.gender === 'male' ? data[1] : data[0] // como el nombre depende del genero, si gender es igual a male devuelve data[1], sino data[0]
  students.push(newStudent) // pusheamos el objeto resultante
}

//Funcion para mostrar por consola el nombre del alumno mas joven de la clase
function ageMin() {
  let min = students[0].age;
  let minName = students[0].name
  for (let i = 0; i < students.length ; i++) {
    if (students[i].age < min) {
        min = students[i].age;
        minName = students[i].name;
    }
 }
 console.log(minName)
}

//Funcion para mostrar por consola la edad media de todos los alumnos de la clase.
function getAverageAge() {
  let sum = 0
  for (let i = 0; i < students.length; i++) {
    sum = sum + students[i].age
  }
  
  let averageAge = sum / students.length
  console.log(averageAge)
}

//Funcion para mostrar por consola la edad media de las chicas de la clase.
function getAverageFemale() {
  const girls = students.filter(student => student.gender === 'female');
  let sum = 0
  for (let i = 0; i < girls.length; i++) {
    sum = sum + girls[i].age
  }
  
  let averageAgeFemale = sum / girls.length
  console.log(averageAgeFemale)
}

//Funcion para calcular nueva nota a los alumnos.
const randomNote = calculateRandomNumber(0, 10);

function newNote() {
  for (let key in students) {
    const randomNote = calculateRandomNumber(0, 10);
    let newNote = students[key].examScores.push(randomNote)
  }  
}

//Funcion para ordenar el array de alumnos alfabéticamente según su nombre.
function sortNames() {
  students.sort( (a, b) => (a.name > b.name) ? 1 : -1)
}

//Funcion para mostrar por consola el alumno de la clase con las mejores notas. (Nota: examScores con esta funcion se transforma en la suma de todas las notas del alumno)
function sumNotes() {
  for (let key in students) {
      const sumNotes = students[key].examScores.reduce((a, b) => a + b, 0);
      students[key].examScores.splice(0)
      let maxNote = students[key].examScores.push(sumNotes)
  }
  let maxNoteStudent = students[0].examScores;
  let bestStudent = students[0]
  for (let i = 0; i < students.length ; i++) {
      if (students[i].examScores > maxNoteStudent) {
          maxNoteStudent = students[i].examScores;
          bestStudent = students[i]
      }
  } console.log(bestStudent)
} 




async function program() {
  do {
    numberFromConsole = await getNumberFromConsole();
    
    if (numberFromConsole === '1') {
    console.table(students);
    requirements();
    } else if (numberFromConsole === '2') {
    console.log(students.length);
    requirements();
    } else if (numberFromConsole === '3') {
    names();
    requirements();
    } else if (numberFromConsole === '4') {
    students.pop();
    requirements();
    } else if (numberFromConsole === '5') {
    students.splice(indexNumber, 1);
    requirements();
    } else if (numberFromConsole === '6') {
    female();
    requirements();
    } else if (numberFromConsole === '7') {
    boys();
    girls();
    requirements();
    } else if (numberFromConsole === '8') {
    allGirls();
    requirements();
    } else if (numberFromConsole === '9') {
    namesAge();
    requirements();
    } else if (numberFromConsole === '10') {
    newStudent();
    requirements();
    } else if (numberFromConsole === '11') {
    ageMin();
    requirements();
    } else if (numberFromConsole === '12') {
    getAverageAge();
    requirements();
    } else if (numberFromConsole === '13') {
    getAverageFemale();
    requirements();
    } else if (numberFromConsole === '14') {
    newNote();                                 
    requirements();
    } else if (numberFromConsole === '15') {
    sortNames();                                 
    requirements();
    } else if (numberFromConsole === '16') {
    sumNotes();                                 
    requirements();
    } else {
    console.log('THE PROGRAM IS CLOSED.');
    }
        
     } while (numberFromConsole != 0 && numberFromConsole === '1' || numberFromConsole === '2' || numberFromConsole === '3' || numberFromConsole === '4' || numberFromConsole === '5' || numberFromConsole === '6' || numberFromConsole === '7' || numberFromConsole === '8' || numberFromConsole === '9' || numberFromConsole === '10' || numberFromConsole === '11' || numberFromConsole === '12'  || numberFromConsole === '13' || numberFromConsole === '14' || numberFromConsole === '15' || numberFromConsole === '16');  {
    
    }
}

program();


  













