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