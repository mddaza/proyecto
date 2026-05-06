// Variable para guardar el estado del video de fondo
const bgVideo = document.getElementById('artemis-bg-video');

function openInfoPanel(evt, tabId) {
    // 1. Mostrar la Ventana de Mando Principal
    const windowControl = document.getElementById('info-display-window');
    windowControl.style.display = 'block';

    // 2. Ocultar todas las pestañas de información
    const tabs = document.querySelectorAll('.info-tab-content');
    tabs.forEach(t => t.classList.remove('active'));

    // 3. Desactivar todos los botones de navegación
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(b => b.classList.remove('active'));

    // 4. Mostrar la pestaña seleccionada y activar su botón
    document.getElementById(tabId).classList.add('active');
    evt.currentTarget.classList.add('active');

    // Opcional: Pausar el video de fondo para ahorrar recursos
    if (bgVideo) bgVideo.pause();
}

function closeInfoPanel() {
    // 1. Ocultar la Ventana de Mando Principal
    const windowControl = document.getElementById('info-display-window');
    windowControl.style.display = 'none';

    // 2. Desactivar todos los botones de navegación
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(b => b.classList.remove('active'));

    // Opcional: Reanudar el video de fondo
    if (bgVideo) bgVideo.play();
}
// Función para el ejercicio de Edad
function verificarEdad() {
    let edad = document.getElementById("inputEdad").value;
    let visor = document.getElementById("resultadoEdad");

    if (edad === "") {
        visor.innerHTML = "INGRESE VALOR";
    } else if (edad >= 18) {
        visor.innerHTML = "MAYOR DE EDAD ✅";
        visor.style.color = "#00f2ff";
    } else {
        visor.innerHTML = "MENOR DE EDAD ⚠️";
        visor.style.color = "#ff00ff";
    }
}

// Función para el ejercicio de Calificaciones
function verificarNota() {
    let calificacion = parseFloat(document.getElementById("inputNota").value);
    let visor = document.getElementById("resultadoNota");

    if (isNaN(calificacion)) {
        visor.innerHTML = "DATO INVÁLIDO";
    } else if (calificacion < 3.5) {
        visor.innerHTML = "DESEMPEÑO BAJO ❌";
    } else if (calificacion < 4) {
        visor.innerHTML = "DESEMPEÑO BÁSICO 🟦";
    } else if (calificacion < 4.5) {
        visor.innerHTML = "DESEMPEÑO ALTO 🟪";
    } else if (calificacion <= 5) {
        visor.innerHTML = "DESEMPEÑO SUPERIOR 💎";
    } else {
        visor.innerHTML = "FUERA DE RANGO 🚫";
    }
}
// --- TUS FUNCIONES ORGANIZADAS ---

// Función que retorna si es mayor de edad
function mayor_edad(edad) {
    let mayor = false;
    if (edad >= 18) {
        mayor = true;
    } else {
        mayor = false;
    }
    return mayor;
}

// Función que genera el mensaje de bienvenida
function generarMensaje(nombre) {
    return "Hola " + nombre + ", bienvenido a la terminal Artemis.";
}

// --- LÓGICA DE LA INTERFAZ ---

function ejecutarAcceso() {
    let nombre = document.getElementById("inputNombre").value;
    let edad = document.getElementById("inputEdadAcceso").value;
    let visorStatus = document.getElementById("statusAcceso");

    // Validación de campos vacíos
    if (nombre === "" || edad === "") {
        visorStatus.innerHTML = "⚠️ ERROR: DATOS INCOMPLETOS";
        visorStatus.style.color = "#ff375f";
        return;
    }

    // Usamos la función mayor_edad
    if (mayor_edad(edad)) {
        // Acceso Permitido
        visorStatus.innerHTML = "ACCESO CONCEDIDO ✅<br>" + generarMensaje(nombre);
        visorStatus.style.color = "#00f2ff"; // Brillo Cian
    } else {
        // Acceso Denegado
        visorStatus.innerHTML = "ACCESO DENEGADO 🚫<br>No puedes ingresar por ser menor de edad.";
        visorStatus.style.color = "#ff00ff"; // Brillo Magenta
    }
}
// --- TU OBJETO JUGADOR ---
const jugador = {
    nombre: "PixelHero",
    nivel: 16,
    salud: 100,
    curar: function () {
        if (this.salud < 100) {
            this.salud += 20;
            if (this.salud > 100) this.salud = 100; // Límite máximo
        }
    },
    lostlife: function () {
        this.salud -= 40;
        if (this.salud < 0) this.salud = 0; // Límite mínimo
    }
};

// --- ELEMENTOS DEL DOM ---
const playerName = document.getElementById("playerName");
const health = document.getElementById("health");
const tabla = document.getElementById("consola-combate");
const botonShoot = document.getElementById("shoot");
const botonrecovery = document.getElementById("recoveryHealth");

// Inicialización
playerName.textContent = jugador.nombre;
actualizarInterfaz();

// --- FUNCIONES DE ANIMACIÓN ---

function actualizarInterfaz() {
    health.textContent = jugador.salud;
    
    // Cambiar color según salud
    if (jugador.salud <= 40) {
        health.style.color = "#ff375f"; // Crítico
    } else {
        health.style.color = "#00f2ff"; // Normal
    }
}

function animarEfecto(clase) {
    tabla.classList.add(clase);
    setTimeout(() => {
        tabla.classList.remove(clase);
    }, 500);
}

// --- EVENTOS ---

botonShoot.addEventListener("click", function () {
    jugador.lostlife();
    actualizarInterfaz();
    animarEfecto("shake-animation"); // Animación de disparo
});

botonrecovery.addEventListener("click", function () {
    jugador.curar();
    actualizarInterfaz();
    animarEfecto("glow-animation"); // Animación de curación
});