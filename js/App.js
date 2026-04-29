// Sistema de gestión de dropdowns con estado persistente
console.log("¡iniciando JavaScript del menú principal!");

// Variable para controlar el scroll
let lastScrollTop = 0;
const navbar = document.getElementById('menu-principal');

// Dropdowns que deben permanecer ocultos
const hiddenDropdowns = [];

// Inicializar los dropdowns cerrados al cargar la página
function loadDropdownState() {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
        const content = dropdown.querySelector('.dropdown-content');
        if (content) {
            content.style.display = 'none';
        }
    });
}

// Guardar el estado de los dropdowns
function saveDropdownState() {
    const state = {};
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const label = dropdown.querySelector('a').textContent.trim();
        
        // No guardar el estado de dropdowns ocultos
        if (!hiddenDropdowns.includes(label)) {
            const isActive = dropdown.classList.contains('active');
            state[label] = isActive;
        }
    });
    localStorage.setItem('dropdownState', JSON.stringify(state));
}

// Manejar clicks en los items del dropdown
function setupDropdownListeners() {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        const mainLink = dropdown.children[0]; // Primer hijo es siempre el <a>
        const content = dropdown.querySelector('.dropdown-content');
        const label = mainLink.textContent.trim();
        
        if (mainLink && mainLink.tagName === 'A' && content) {
            mainLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Prevenir que se abran dropdowns ocultos
                if (hiddenDropdowns.includes(label)) {
                    return;
                }
                
                // Cerrar otros dropdowns
                document.querySelectorAll('.dropdown').forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                        const otherContent = other.querySelector('.dropdown-content');
                        if (otherContent) otherContent.style.display = 'none';
                    }
                });
                
                // Alternar estado del dropdown actual
                dropdown.classList.toggle('active');
                content.style.display = dropdown.classList.contains('active') ? 'block' : 'none';
                
                // Guardar estado
                saveDropdownState();
            });
        }
    });
}

// Controlar visibilidad del menú al hacer scroll
function setupScrollListener() {
    window.addEventListener('scroll', () => {
        let scrollTop = window.scrollY;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling hacia abajo
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling hacia arriba
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadDropdownState();
    setupDropdownListeners();
    setupScrollListener();
});