# React Tareas Api 2526

Proyecto de ejemplo para **aprender React consumiendo una API** (peticiones HTTP y CRUD básico) en un entorno moderno, del módulo de Desarrollo Web en Entorno Cliente, para el curso 2025 / 2026.

La app se ejecuta con **Vite** y realiza llamadas a una API REST simulada usando **Axios**. Para el backend de prácticas se utiliza **json-server** con el fichero **`tasks.json`** incluido en el repositorio.

## Objetivo didáctico

- Practicar **componentes**, **estado**, **props** y flujo de datos.
- Aprender a **consumir una API REST** desde React (GET/POST/PUT/PATCH/DELETE).
- Entender la separación **frontend (React)** / **backend simulado (json-server)**.
- Familiarizarse con el flujo de trabajo típico con **Vite**.

## Tecnologías

- React + TypeScript
- Vite (dev server y build)
- Axios (HTTP client)
- json-server (API REST falsa a partir de un JSON)
- ESLint (configuración de linting)

## Requisitos

- Node.js (recomendado: versión LTS)
- npm (incluido con Node.js)


## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/sambrista/dwec-react-task-list-example.git
   cd dwec-react-task-list-example
   ```

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Haz una copia del archivo `tasks.json.dist` y nómbralo como `tasks.json`.

## Levantar la API (json-server)

Este proyecto incluye el fichero `tasks.json` en la raíz.

### Opción A: usar json-server con npx (recomendado para clase)

```bash
npx json-server tasks.json
```

* API disponible en: `http://localhost:3000`
* Los recursos disponibles dependen de las claves de `tasks.json` (por ejemplo: `/tasks`, `/todos`, etc.).
  Consejo: abre `tasks.json` y fíjate en el nombre del array principal para saber el endpoint exacto.

### Opción B: instalar json-server globalmente

```bash
npm i -g json-server
json-server tasks.json
```

## Levantar el frontend (React + Vite)

En otra terminal:

```bash
npm run dev
```

Por defecto, Vite suele servir en:

* `http://localhost:5173`

## Orden recomendado de ejecución

1. Terminal 1 (API):

   ```bash
   npx json-server tasks.json
   ```

2. Terminal 2 (frontend):

   ```bash
   npm run dev
   ```