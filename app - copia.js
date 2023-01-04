const formulario = document.querySelector("#formulario");
const cardsEstudiantes = document.querySelector("#cardsEstudiantes");
const cardsProfesores = document.querySelector("#cardsProfesores");
const templateEstudiante = document.querySelector("#templateEstudiante").content;
const templateProfesor = document.querySelector("#templateProfesor").content;
const alert = document.querySelector(".alert");

const estudiantes = []; //va a ser un array de todos los objetos de estudiante
const profesores = [];

document.addEventListener('click', (e) => {
    //console.log(e.target.dataset.uid);
    if (e.target.dataset.uid) {
        //console.log(e.target.matches(".btn-success"));
        if (e.target.matches(".btn-success")) {
            estudiantes.map((item) => {
                if (item.uid === e.target.dataset.uid){
                    item.setEstado = true;
                }
                console.log(item);
                return item;
            });
            
        }
        if (e.target.matches(".btn-danger")) {            
            estudiantes.map((item) => {
                if (item.uid === e.target.dataset.uid) {
                    item.setEstado = false;
                }
                console.log(item);
                return item;
            });            
        }
        Persona.pintarPersonaUI(estudiantes, "Estudiante")
    }    
});

class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
        //this.uid = Date.now() // genera un numero en milisegundos que lo utilizaremos para darle un ID al usuario`
        this.uid = `${Date.now()}`;
    }

    static pintarPersonaUI(personas, tipo) {
        if (tipo === "Estudiante") {
            cardsEstudiantes.textContent = "";
            const fragment = document.createDocumentFragment();

            personas.forEach((item) => {
                fragment.appendChild(item.agregarNuevoEstudiante());
            });

            cardsEstudiantes.appendChild(fragment);
        }

        if (tipo === "Profesor") {
            cardsProfesores.textContent = "";
            const fragment = document.createDocumentFragment();
            personas.forEach((item) => {
                fragment.appendChild(item.agregarNuevoProfesor());
            });
            cardsProfesores.appendChild(fragment);

        }

    }

}

class Estudiante extends Persona {
    //dos propiedades privadas
    #estado = false;
    #estudiante = "Estudiante";

    //como son propiedades privadas debe haber un set para poder modificarlas
    set setEstado(estado) {
        this.#estado = estado;
    }

    get getEstudiante() {
        return this.#estudiante;
    }

    agregarNuevoEstudiante() {
        const clone = templateEstudiante.cloneNode(true);
        clone.querySelector('h5 .text-primary').textContent = this.nombre;
        clone.querySelector('h6').textContent = this.getEstudiante;
        clone.querySelector(".lead").textContent = this.edad;

        if(this.#estado){
            clone.querySelector('.badge').className = "badge bg-success";
            clone.querySelector('.btn-success').disabled = true;
            clone.querySelector('.btn-danger').disabled = false;
        }else {
            clone.querySelector('.badge').className = "badge bg-danger";
            clone.querySelector('.btn-danger').disabled = true;
            clone.querySelector('.btn-success').disabled = false;
        }
        clone.querySelector('.badge').textContent = this.#estado ? "Aprobado" : "Reprobado";

        clone.querySelector('.btn-success').dataset.uid = this.uid;
        clone.querySelector('.btn-danger').dataset.uid = this.uid;

        return clone;
    }
    

}

class Profesor extends Persona {

    #profesor = "Profesor"

    agregarNuevoProfesor(){
        const clone = templateProfesor.cloneNode(true)
        clone.querySelector('h5').textContent = this.nombre
        clone.querySelector('h6').textContent = this.#profesor
        clone.querySelector('.lead').textContent = this.edad
        return clone;
    }
    

}

formulario.addEventListener('submit', e => {
    e.preventDefault();

    alert.classList.add("d-none");

    const datos = new FormData(formulario);
    //console.log(datos);
    //datos.forEach((item) => console.log(item));
    //con un destructuring, un array con los valores correspondientes
    //console.log([...datos.values()]);

    const [nombre, edad, opcion] = [...datos.values()];
    //console.log(nombre, edad, opcion);

    //validar el usuario
    if(!nombre.trim() || !edad.trim() || !opcion.trim()){
        console.log("algun dato en blanco");
        alert.classList.remove("d-none");
        return
    }

    if(opcion === "Estudiante") {
        const estudiante = new Estudiante(nombre, edad);
        estudiantes.push(estudiante); 
        Persona.pintarPersonaUI(estudiantes, opcion);
    }

    if(opcion === "Profesor") {
       //console.log("al dar click en profesor");
       const profesor = new Profesor(nombre, edad);
       profesores.push(profesor);
       Persona.pintarPersonaUI(profesores, opcion);
    }
    //console.log(estudiante);
    //console.log(estudiantes);
});
