### MATERIA: Programación Web Avanzada

Este proyecto es una aplicación web desarrollada con **React** 

##🎬  PROYECTO DE TP1 : Gestor de Películas y Series

Este proyecto es gestor personal que permite organizar películas y series mediante un sistema de estados, filtros y persistencia de datos.
Componentes Reutilizables: Botones y títulos modulares para evitar código duplicado.

## 👥 Integrantes del Grupo
*   **Daniela Oñatibia** (Scrum Master)
*   **Abril Gavilan** (Desarrolladora)
*   **Erick Gonzales** (Desarrollador)

---

## 📂 Arquitectura y Archivos Base
Para iniciar el proyecto, se analizó la estructura fundamental de React. 

A continuación, se detallan los archivos clave del proyecto:

**index.js (main.jsx en nuestro caso):**
Es el punto de entrada principal de la aplicación. Su función es tomar el componente principal de React y montarlo (renderizarlo) dentro del archivo HTML del navegador (específicamente en un div con id "root").

> **App.js (App.jsx en nuestro caso):**
Es el componente raíz de la aplicación. Funciona como el contenedor principal donde se van a anidar, organizar y renderizar todos los demás componentes (como Home).

> **index.css:**
 Es la hoja de estilos global. Aquí se definen las reglas de CSS que afectan a toda la aplicación en general, como resetear márgenes, definir tipografías base o colores de fondo de toda la página.

> **package.json:**
Es el corazón de la configuración del proyecto en Node.js. Contiene la información básica del proyecto, los scripts para ejecutar o construir la aplicación (como npm run dev), y el listado exacto de todas las dependencias (librerías, como react y react-dom) que el proyecto necesita para funcionar.


### ️ Tecnologías y Prácticas Aplicadas
-**React.js**: Biblioteca principal de UI.
-**Hooks** (useState): Gestión de estados para listas y filtros.
-**LocalStorage**: Persistencia de datos para que no se pierdan al recargar.
-**CSS Modules**: Estilado encapsulado por componente.


## 🚀 Guía de Instalación y Uso
Sigue estos pasos para ejecutar el proyecto en tu entorno local:

 1. **Requisitos previos**
    Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 16 o superior) y [Git](https://git-scm.com/).

 2. **Clonar el repositorio**
Abre una terminal y descarga el proyecto:
```bash
git clone [https://github.com/DanielaOnatibia/TP1-de-PWA.git](https://github.com/DanielaOnatibia/TP1-de-PWA.git)
```

3.**Instalar dependencias** 
Entra en la carpeta del proyecto y descarga todas las librerías necesarias para que React funcione:
   ```bash
    cd TP1-de-PWA
    npm install
    ```

 4.**Ejecutar la aplicacion**
Inicia el servidor de desarrollo local para ver los cambios en tiempo real en tu navegador:
   ```bash
    npm run dev
    ```
    -Una vez ejecutado, abre tu navegador en la dirección que indique la terminal (usualmente http://localhost:5173).-



## 📊 Gestión del Proyecto (Kanban)
Para la organización del flujo de trabajo, utilizamos la metodología **Agile** mediante un tablero Kanban en GitHub Projects.
👉 [Acceder al Tablero de Tareas](https://github.com/users/DanielaOnatibia/projects/1)

