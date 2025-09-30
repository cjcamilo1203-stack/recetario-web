// ===== ESTRUCTURA DE ARCHIVOS =====
// IMPORTANTE: Cuando agregues una nueva receta, actualiza esta estructura aquí
// Formato: Las carpetas son objetos {}, los archivos .md terminan con ": ''"
const FILE_STRUCTURE = {
    "Desayunos": {
        "Arepas Rellenas.md": "",
        "Huevos Pericos.md": "",
        "Changua Boyacense.md": ""
    },
    "Almuerzos": {
        "Carnes": {
            "Mamona Llanera.md": "",
            "Ternera a la Llanera.md": ""
        },
        "Pescados": {
            "Viudo de Pescado.md": "",
            "Mojarra Frita.md": ""
        }
    },
    "Postres": {
        "Arequipe Casero.md": "",
        "Obleas con Arequipe.md": "",
        "Flan de Caramelo.md": ""
    },
    "Bebidas": {
        "Chicha Llanera.md": "",
        "Masato.md": "",
        "Guarapo.md": ""
    }
};

// ===== Estado de la aplicación =====
const state = {
    currentPath: '',
    fileStructure: FILE_STRUCTURE,
    allRecipes: []
};

// ===== Inicialización =====
document.addEventListener('DOMContentLoaded', () => {
    buildRecipesList(state.fileStructure, '');
    setupEventListeners();
    renderNavigation();
});

// ===== Construir lista de todas las recetas para búsqueda =====
function buildRecipesList(structure, basePath) {
    for (const [name, content] of Object.entries(structure)) {
        const fullPath = basePath ? `${basePath}/${name}` : name;
        
        if (typeof content === 'object' && content !== null) {
            // Es una carpeta
            buildRecipesList(content, fullPath);
        } else {
            // Es un archivo markdown
            if (name.endsWith('.md')) {
                state.allRecipes.push({
                    name: name.replace('.md', ''),
                    path: fullPath,
                    folder: basePath
                });
            }
        }
    }
}

// ===== Configurar event listeners =====
function setupEventListeners() {
    // Botón de volver
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        showNavigationView();
    });
}

// ===== Renderizar navegación =====
function renderNavigation() {
    const navigationView = document.getElementById('navigationView');

    // Obtener elementos del path actual
    const items = getCurrentPathItems();
    
    if (!items || items.length === 0) {
        showEmptyState(
            'No hay recetas aquí todavía',
            'Los cocineros están preparando deliciosas recetas para ti. ¡Vuelve pronto!'
        );
        return;
    }

    // Renderizar breadcrumbs
    renderBreadcrumbs();

    // Renderizar items
    const html = `
        <div class="items-grid">
            ${items.map(item => renderItem(item)).join('')}
        </div>
    `;
    
    navigationView.innerHTML = html;

    // Agregar event listeners a los items
    items.forEach((item, index) => {
        const card = navigationView.querySelectorAll('.item-card')[index];
        card.addEventListener('click', () => handleItemClick(item));
    });
}

// ===== Obtener items del path actual =====
function getCurrentPathItems() {
    if (!state.fileStructure) return [];
    
    let current = state.fileStructure;
    
    if (state.currentPath) {
        const pathParts = state.currentPath.split('/');
        for (const part of pathParts) {
            if (current[part]) {
                current = current[part];
            } else {
                return [];
            }
        }
    }

    const items = [];
    
    for (const [name, content] of Object.entries(current)) {
        if (typeof content === 'object' && content !== null) {
            // Es una carpeta
            items.push({
                name: name,
                type: 'folder',
                icon: '📁'
            });
        } else {
            // Es un archivo markdown
            if (name.endsWith('.md')) {
                items.push({
                    name: name.replace('.md', ''),
                    type: 'recipe',
                    icon: '🍽️',
                    file: name
                });
            }
        }
    }

    // Ordenar: carpetas primero, luego recetas
    items.sort((a, b) => {
        if (a.type === 'folder' && b.type !== 'folder') return -1;
        if (a.type !== 'folder' && b.type === 'folder') return 1;
        return a.name.localeCompare(b.name);
    });

    return items;
}

// ===== Renderizar item individual =====
function renderItem(item) {
    return `
        <div class="item-card ${item.type}">
            <span class="item-icon">${item.icon}</span>
            <h3 class="item-name">${item.name}</h3>
            <p class="item-type">${item.type === 'folder' ? 'Categoría' : 'Receta'}</p>
        </div>
    `;
}

// ===== Manejar click en item =====
function handleItemClick(item) {
    if (item.type === 'folder') {
        // Navegar a la carpeta
        state.currentPath = state.currentPath ? `${state.currentPath}/${item.name}` : item.name;
        renderNavigation();
    } else if (item.type === 'recipe') {
        // Mostrar la receta
        const recipePath = state.currentPath ? `${state.currentPath}/${item.file}` : item.file;
        showRecipe(recipePath);
    }
}

// ===== Renderizar breadcrumbs =====
function renderBreadcrumbs() {
    const breadcrumbsContainer = document.getElementById('breadcrumbs');
    
    const pathParts = state.currentPath ? state.currentPath.split('/') : [];
    
    let html = `
        <button class="breadcrumb-item ${!state.currentPath ? 'active' : ''}" data-path="">
            🏠 Inicio
        </button>
    `;
    
    let accumulatedPath = '';
    pathParts.forEach((part, index) => {
        accumulatedPath += (accumulatedPath ? '/' : '') + part;
        const isLast = index === pathParts.length - 1;
        html += `
            <button class="breadcrumb-item ${isLast ? 'active' : ''}" data-path="${accumulatedPath}">
                ${part}
            </button>
        `;
    });
    
    breadcrumbsContainer.innerHTML = html;
    
    // Agregar event listeners
    breadcrumbsContainer.querySelectorAll('.breadcrumb-item').forEach(button => {
        button.addEventListener('click', () => {
            state.currentPath = button.dataset.path;
            renderNavigation();
        });
    });
}

// ===== Mostrar receta =====
async function showRecipe(recipePath) {
    const navigationView = document.getElementById('navigationView');
    const recipeView = document.getElementById('recipeView');
    const recipeContent = document.getElementById('recipeContent');

    navigationView.style.display = 'none';
    recipeView.style.display = 'block';
    recipeContent.innerHTML = '<div class="loading"><div class="spinner"></div><p>Cargando receta...</p></div>';

    try {
        // Cargar el archivo markdown desde la carpeta Recetas
        const response = await fetch(`Recetas/${recipePath}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const markdown = await response.text();
        
        // Configurar marked para un renderizado más bonito
        if (typeof marked !== 'undefined') {
            marked.setOptions({
                breaks: true,
                gfm: true,
                headerIds: true,
                mangle: false
            });

            const html = marked.parse(markdown);
            recipeContent.innerHTML = html;

            // Agregar emojis a los títulos si no los tienen
            enhanceRecipeContent();
        } else {
            throw new Error('La librería marked.js no está cargada');
        }

    } catch (error) {
        console.error('Error cargando receta:', error);
        
        // Mensaje de error más informativo
        let errorMessage = 'No se pudo cargar esta receta.';
        
        if (error.message.includes('Failed to fetch')) {
            errorMessage = `
                <p><strong>Error de seguridad del navegador (CORS).</strong></p>
                <p>Tu navegador bloquea la carga de archivos locales por seguridad.</p>
                <br>
                <p><strong>Soluciones:</strong></p>
                <ol style="text-align: left; display: inline-block;">
                    <li><strong>Usar Firefox:</strong> Es el navegador más permisivo con archivos locales</li>
                    <li><strong>Usar un servidor local simple:</strong>
                        <ul>
                            <li>Con Python: <code>python -m http.server 8000</code></li>
                            <li>Con Node.js: <code>npx http-server</code></li>
                            <li>Con extensión de VS Code: "Live Server"</li>
                        </ul>
                    </li>
                    <li><strong>Chrome/Edge:</strong> Instalar extensión "Web Server for Chrome"</li>
                </ol>
            `;
        }
        
        recipeContent.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">😕</div>
                <h2>Error al cargar la receta</h2>
                ${errorMessage}
            </div>
        `;
    }
}

// ===== Mejorar contenido de receta con emojis =====
function enhanceRecipeContent() {
    const recipeContent = document.getElementById('recipeContent');
    
    // Agregar emojis a títulos comunes
    const h2Elements = recipeContent.querySelectorAll('h2');
    h2Elements.forEach(h2 => {
        const text = h2.textContent.toLowerCase();
        if (text.includes('ingrediente')) {
            h2.innerHTML = '🥕 ' + h2.innerHTML;
        } else if (text.includes('preparación') || text.includes('instruccion')) {
            h2.innerHTML = '👨‍🍳 ' + h2.innerHTML;
        } else if (text.includes('tip') || text.includes('consejo')) {
            h2.innerHTML = '💡 ' + h2.innerHTML;
        } else if (text.includes('tiempo')) {
            h2.innerHTML = '⏱️ ' + h2.innerHTML;
        } else if (text.includes('porcion') || text.includes('racion')) {
            h2.innerHTML = '🍽️ ' + h2.innerHTML;
        }
    });
}

// ===== Mostrar vista de navegación =====
function showNavigationView() {
    const navigationView = document.getElementById('navigationView');
    const recipeView = document.getElementById('recipeView');

    navigationView.style.display = 'block';
    recipeView.style.display = 'none';
    
    renderNavigation();
}

// ===== Renderizar resultados de búsqueda =====
function renderSearchResults() {
    const navigationView = document.getElementById('navigationView');
    
    const filteredRecipes = state.allRecipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(state.searchTerm) ||
               recipe.folder.toLowerCase().includes(state.searchTerm);
    });

    if (filteredRecipes.length === 0) {
        showEmptyState(
            'No se encontraron recetas',
            `No hay recetas que coincidan con "${state.searchTerm}"`
        );
        return;
    }

    const html = `
        <div class="items-grid">
            ${filteredRecipes.map(recipe => `
                <div class="item-card recipe" data-recipe-path="${recipe.path}">
                    <span class="item-icon">🍽️</span>
                    <h3 class="item-name">${recipe.name}</h3>
                    <p class="item-type">${recipe.folder || 'Recetas'}</p>
                </div>
            `).join('')}
        </div>
    `;
    
    navigationView.innerHTML = html;

    // Agregar event listeners
    filteredRecipes.forEach((recipe, index) => {
        const card = navigationView.querySelectorAll('.item-card')[index];
        card.addEventListener('click', () => {
            showRecipe(recipe.path);
        });
    });
}

// ===== Mostrar estado vacío =====
function showEmptyState(title, message) {
    const navigationView = document.getElementById('navigationView');
    navigationView.innerHTML = `
        <div class="empty-state">
            <div class="empty-state-icon">🍳</div>
            <h2>${title}</h2>
            <p>${message}</p>
        </div>
    `;
}
