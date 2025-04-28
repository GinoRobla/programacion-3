//ejercicios 1
const titulo = document.getElementById("tituloPrincipal");
titulo.textContent = "Hola Mundo desde JavaScript";

const parrafos = document.getElementsByClassName("parrafos");
for(let i = 0; i < parrafos.length; i++) {
    parrafos[i].style.color = "blue";
}

const elementosLista = document.querySelectorAll("#contenedor li");
elementosLista.forEach((li) => {
    li.textContent += " agregando texto desde JavaScript";
})



//ejercicio 2
const inputElemento = document.getElementById("inputElemento");
const btnAgregar = document.getElementById("btnAgregar");
const btnEliminar = document.getElementById("btnEliminar");
const lista = document.getElementById("listaDinamica");

btnAgregar.addEventListener("click", () => {
    const texto = inputElemento.value.trim();
    if (texto === ""){
        return;
    }
    else {
        const nuevoLi = document.createElement("li");
        nuevoLi.textContent = texto;
        lista.appendChild(nuevoLi);
    }
});

btnEliminar.addEventListener("click", () => {
    lista.removeChild(lista.lastElementChild);
});



//ejercicio 3
const parrafosExtra = document.querySelectorAll(".parrafo");
const btnResaltar = document.getElementById("btnResaltar");
const btnOcultar = document.getElementById("btnOcultar");

btnResaltar.addEventListener("click", () => {
    parrafosExtra.forEach(p => {
        p.classList.add("resaltado");
    });
});

btnOcultar.addEventListener("click", () => {
    parrafosExtra.forEach(p => {
        p.classList.toggle("oculto");
    });
});



//ejercicio 4
const formulario = document.getElementById("formularioTareas");
const inputTarea = document.getElementById("tareaInput");
const listaTareas = document.getElementById("listaTareasInteractivas");

formulario.addEventListener("click", (e) => {
    e.preventDefault();
    
    const texto = inputTarea.value.trim();
    if (texto === ""){
        return;
    }
    const nuevoLi = document.createElement("li");
    nuevoLi.textContent = texto;
    
    nuevoLi.addEventListener("click", () => {
        nuevoLi.classList.toggle("completado");
    });
    listaTareas.appendChild(nuevoLi);
});


//ejercicio 5
const form = document.getElementById("formularioValidacion");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const edad = document.getElementById("edad");

const errorNombre = document.getElementById("errorNombre");
const errorEmail = document.getElementById("errorEmail");
const errorEdad = document.getElementById("errorEdad");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // No se envía el formulario

    let valido = true;
    
    if (nombre.value.trim() === "") {
        errorNombre.textContent = "El nombre es obligatorio.";
        valido = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
        errorEmail.textContent = "El email es obligatorio.";
        valido = false;
    } else if (!emailRegex.test(email.value)) {
        errorEmail.textContent = "El formato del email no es válido.";
        valido = false;
    }
    
    const edadNumero = parseInt(edad.value.trim(), 10); // Convertir el valor de edad a número
    if (edad.value.trim() === "") {
        errorEdad.textContent = "La edad es obligatoria.";
        valido = false;
    } else if (isNaN(edadNumero) || edadNumero < 18) { // Verificar si es un número válido y si es menor de 18
        errorEdad.textContent = "Debes tener más de 18 años.";
        valido = false;
    }
    
    if (valido === true) {
        alert("Formulario enviado correctamente");
        form.reset(); // Limpiamos el formulario
    }
});