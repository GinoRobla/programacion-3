//ejercicios 1
const titulo = document.getElementById("tituloPrincipal");
titulo.textContent = "Hola Mundo desde JavaScript";

const parrafos = document.getElementsByClassName("parrafos");
for (let p of parrafos) {
    p.style.color = "blue";
}

const elementosLista = document.querySelectorAll("#contenedor li");
elementosLista.forEach((li) => {
    li.textContent += ` "agregando texto desde JavaScript"`;
})
//ejercicio 2
const inputElemento = document.getElementById("inputElemento");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("listaDinamica");

btnAgregar.addEventListener("click", () => {
    const texto = inputElemento.value.trim();

    if (texto === "") {
        alert("Escribí algo antes de agregar.");
        return;
    }

    const nuevoLi = document.createElement("li");
    nuevoLi.textContent = texto;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
        nuevoLi.remove();
    });

    nuevoLi.appendChild(btnEliminar);
    lista.appendChild(nuevoLi);

    inputElemento.value = ""; // Limpiar input
});

//ejercicio 3
const parrafosExtra = document.querySelectorAll(".parrafo");
const btnResaltar = document.getElementById("btnResaltar");
const btnOcultar = document.getElementById("btnOcultar");

// Al hacer clic en "Resaltar", agrega la clase 'resaltado'
btnResaltar.addEventListener("click", () => {
    parrafosExtra.forEach(p => {
        p.classList.add("resaltado");
    });
});

// Al hacer clic en "Ocultar/Mostrar", alterna la clase 'oculto'
btnOcultar.addEventListener("click", () => {
    parrafosExtra.forEach(p => {
        p.classList.toggle("oculto");
    });
});

//ejercicio 4
const formulario = document.getElementById("formularioTareas");
const inputTarea = document.getElementById("tareaInput");
const listaTareas = document.getElementById("listaTareasInteractivas");

formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita que se recargue la página

    const texto = inputTarea.value.trim();
    if (texto === "") return;

    const nuevoLi = document.createElement("li");
    nuevoLi.textContent = texto;

    // Al hacer clic en la tarea, se marca o desmarca como completada
    nuevoLi.addEventListener("click", () => {
        nuevoLi.classList.toggle("completado");
    });

    listaTareas.appendChild(nuevoLi);
    inputTarea.value = "";
    inputTarea.focus();
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

    // Limpiar errores previos
    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorEdad.textContent = "";

    let valido = true;

    // Validar nombre
    if (nombre.value.trim() === "") {
        errorNombre.textContent = "El nombre es obligatorio.";
        valido = false;
    }

    // Validar email con expresión regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
        errorEmail.textContent = "El email es obligatorio.";
        valido = false;
    } else if (!emailRegex.test(email.value)) {
        errorEmail.textContent = "El formato del email no es válido.";
        valido = false;
    }

    // Validar edad
    const edadNumero = parseInt(edad.value);
    if (edad.value.trim() === "") {
        errorEdad.textContent = "La edad es obligatoria.";
        valido = false;
    } else if (isNaN(edadNumero) || edadNumero <= 18) {
        errorEdad.textContent = "Debes tener más de 18 años.";
        valido = false;
    }

    // Si todo está bien
    if (valido) {
        alert("Formulario enviado correctamente 😄");
        form.reset(); // Limpiamos el formulario
    }
});
