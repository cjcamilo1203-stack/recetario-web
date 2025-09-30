# 🍳 Recetario Web Unillanista

Portal web dedicado al futuro programa de Gastronomía de la Universidad de los Llanos.

## 🚀 Cómo Usar

### Opción 1: Abrir directamente (Más Simple)

**Abre el archivo `index.html` en tu navegador** haciendo doble clic.

✅ **Firefox:** Funciona perfectamente sin problemas
⚠️ **Chrome/Edge:** Puede tener restricciones de seguridad

### Opción 2: Servidor Local Simple (Recomendado)

Si tienes problemas, usa un servidor local simple:

**Con Python** (si lo tienes instalado):
```bash
python -m http.server 8000
```
Luego abre: `http://localhost:8000`

**Con Node.js** (si lo tienes instalado):
```bash
npx http-server
```
Luego abre: `http://localhost:8080`

**Con VS Code:**
- Instala la extensión "Live Server"
- Clic derecho en `index.html` → "Open with Live Server"

## 👨‍🍳 Cómo Agregar una Nueva Receta

### Paso 1: Crear el archivo de la receta

1. Ve a la carpeta `Recetas/`
2. Elige la categoría apropiada (Desayunos, Almuerzos, Postres, Bebidas)
3. Puedes crear nuevas carpetas si necesitas
4. Crea un archivo `.md` con el nombre de tu receta

**Ejemplo:** `Recetas/Almuerzos/Bandeja Paisa.md`

### Paso 2: Escribir la receta en Markdown

Usa esta estructura básica:

```markdown
# Nombre de la Receta

Descripción breve.

## Información General

| Propiedad | Valor |
|-----------|-------|
| ⏱️ Tiempo de preparación | 20 minutos |
| ⏱️ Tiempo de cocción | 30 minutos |
| 🍽️ Porciones | 4 personas |
| 📊 Dificultad | Media |

## Ingredientes

- Ingrediente 1
- Ingrediente 2
- Ingrediente 3

## Preparación

1. Primer paso
2. Segundo paso
3. Tercer paso

## Consejos del Chef

> **Tip:** Tus consejos aquí

---

*Nota final*
```

### Paso 3: Actualizar el archivo `app.js`

Abre `app.js` y busca la sección `FILE_STRUCTURE` al inicio del archivo.

Agrega tu nueva receta siguiendo el formato existente:

```javascript
const FILE_STRUCTURE = {
    "Desayunos": {
        "Arepas Rellenas.md": "",
        "Huevos Pericos.md": "",
        "Changua Boyacense.md": ""
    },
    "Almuerzos": {
        "Bandeja Paisa.md": "",  // ← AGREGAR AQUÍ tu nueva receta
        "Carnes": {
            "Mamona Llanera.md": "",
            "Ternera a la Llanera.md": ""
        },
        "Pescados": {
            "Viudo de Pescado.md": "",
            "Mojarra Frita.md": ""
        }
    },
    // ... resto de categorías
};
```

**Reglas importantes:**
- Las carpetas son objetos con `{ }` 
- Los archivos `.md` terminan con `: ""`
- Respeta las comas entre elementos
- Usa comillas dobles `" "`

### Paso 4: ¡Listo!

Abre `index.html` y verás tu nueva receta en la categoría correspondiente.

## 📝 Formato Markdown Soportado

### Títulos
```markdown
# Título Principal
## Subtítulo
### Subtítulo Pequeño
```

### Listas
```markdown
- Item con viñeta
- Otro item

1. Paso numerado
2. Siguiente paso
```

### Formato de Texto
```markdown
**Texto en negrita**
*Texto en cursiva*
```

### Tablas
```markdown
| Columna 1 | Columna 2 |
|-----------|-----------|
| Dato 1    | Dato 2    |
```

### Citas (Para tips)
```markdown
> **Tip:** Este es un consejo importante
```

### Enlaces e Imágenes
```markdown
[Texto del enlace](url)
![Descripción](ruta/imagen.jpg)
```

## 🎨 Emojis Recomendados

- 🥕 Ingredientes
- 👨‍🍳 Preparación  
- 💡 Tips y consejos
- ⏱️ Tiempo
- 🍽️ Porciones
- 🔥 Temperatura/Dificultad
- ❄️ Refrigeración
- ⚠️ Advertencias

## 📁 Estructura del Proyecto

```
recetario-web/
│
├── index.html          # Página principal (ABRIR ESTE)
├── styles.css          # Estilos
├── app.js              # Lógica (EDITAR AQUÍ para agregar recetas)
├── README.md           # Este archivo
│
└── Recetas/            # TODAS LAS RECETAS AQUÍ
    ├── Desayunos/
    ├── Almuerzos/
    │   ├── Carnes/
    │   └── Pescados/
    ├── Postres/
    └── Bebidas/
```

## 🔧 Solución de Problemas

### Las recetas no se cargan

**Solución 1:** Usa Firefox (es más permisivo con archivos locales)

**Solución 2:** Usa Chrome/Edge con una extensión:
1. Instala "Web Server for Chrome"
2. Apunta a la carpeta del proyecto
3. Abre en `http://localhost:8887`

**Solución 3:** Servidor local simple (si tienes Python):
```bash
python -m http.server 8000
# Abre: http://localhost:8000
```

### Mi receta nueva no aparece

✅ Verifica:
1. El archivo está en la carpeta `Recetas/` (o subcarpeta)
2. Tiene extensión `.md`
3. Agregaste la ruta en `FILE_STRUCTURE` dentro de `app.js`
4. La sintaxis del JSON es correcta (comas, comillas)
5. Refrescaste la página (Ctrl + F5)

### El formato Markdown no se ve bien

✅ Revisa:
- Títulos tienen espacio: `# Título` ✅ no `#Título` ❌
- Listas tienen espacio: `- Item` ✅ no `-Item` ❌  
- Las tablas están bien formadas con las barras `|`

## 📚 Recetas Incluidas

El proyecto incluye 13 recetas de ejemplo:

- **Desayunos:** Arepas Rellenas, Huevos Pericos, Changua Boyacense
- **Almuerzos:** Mamona Llanera, Ternera a la Llanera, Viudo de Pescado, Mojarra Frita
- **Postres:** Arequipe Casero, Obleas con Arequipe, Flan de Caramelo
- **Bebidas:** Chicha Llanera, Masato, Guarapo

## 🎓 Universidad de los Llanos

Este proyecto apoya el futuro programa de Gastronomía de la Universidad de los Llanos, promoviendo la cocina tradicional llanera y colombiana.

---

**¡Buen provecho! 🍳👨‍🍳👩‍🍳**