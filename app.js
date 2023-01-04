//funcion IIFE
/* (function() { //funcion anonima que se va a ejecutar a penas se lea el codigo
    const fruta ="🍉";
    console.log(fruta);
})(); */

//tambien se puede hacer con funciones de flecha
/* (() => { // se tiene la funcion anonima, toda se encierra entre () y al final agrega () para que se ejecute
    const fruta ="😎";
    console.log(fruta);
})();

const nombre = "edgar"; */

/* import { sandia } from "./frutas";

console.log(sandia); */

//localStorage solo guarda string
/* localStorage.setItem("platano", "😀🍌")

//console.log(localStorage.getItem("platano"))

const platano = localStorage.getItem("platano");
console.log(platano);

localStorage.removeItem("platano") */

/* const frutas = [
    {
        nombre : "🍌",
        color: "amarillo",
    },
    {
        nombre : "🍒",
        color: "rojo",
    },
    {
        nombre : "🍏",
        color: "verde",
    },
];
localStorage.setItem("frutas", JSON.stringify(frutas));
 */
/* 
if(localStorage.getItem("frutas")){
    const frutasDesdeLocal = JSON.parse(localStorage.getItem("frutas"))
    console.log(frutasDesdeLocal);
} */


// Javascript #14 2:25:30

const alert = document.querySelector('.alert');
const formulario = document.querySelector('#formulario');
const pintarTodo = document.querySelector('#pintarTodo');
const templateTodo = document.querySelector('#templateTodo').content;

let todos = [];

const agregarTodo = (todo) => {
    const objetoTodo = {
        nombre: todo,
        id: `${Date.now()}`,
    };

    todos.push(objetoTodo);
};

const pintarTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));

    pintarTodo.textContent = "";

    const fragment = document.createDocumentFragment();

    todos.forEach((item) => {
        
        const clone = templateTodo.cloneNode(true);
        clone.querySelector(".lead").textContent = item.nombre;

        clone.querySelector(".btn").dataset.id = item.id;

        //para probar
        fragment.appendChild(clone);
    });

    pintarTodo.appendChild(fragment);

};

document.addEventListener('click', (e) => {
    //console.log(e.target.dataset.id);
    //console.log(e.target.matches(".btn-danger"));

    if(e.target.matches(".btn-danger")) {
        //console.log('diste click al boton eliminar')
        todos = todos.filter((item) => item.id !== e.target.dataset.id);
        pintarTodos();
    }
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    alert.classList.add("d-none");

    //console.log("funcionando formulario");
    const data = new FormData(formulario);
    const [todo] = [...data.values()];
    //console.log(todo);

    if (!todo.trim()) {
        console.log("te equivocaste mandaste vacio");
        alert.classList.remove("d-none");
        return;
    }
    
    agregarTodo(todo);
    pintarTodos();
});

//para que cargue el DOM
document.addEventListener('DOMContentLoaded', (e) => {
    if (localStorage.getItem("todos")) {
        todos = JSON.parse(localStorage.getItem("todos"));
        pintarTodos();
    }
});