# Proyecto Final - Control de Gastos

Este proyecto es un sistema web full-stack para el control de gastos personales, desarrollado como entrega final para la materia Programación 3. Utiliza React en el frontend, Express en el backend y MongoDB como base de datos. El sistema permite registrar usuarios, ingresar un balance inicial, agregar y categorizar transacciones, ver el balance actualizado, consultar historial y filtrar por fechas/categorías.

---

## 🚀 Tecnologías principales
- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Base de datos:** MongoDB
- **Autenticación:** JWT
- **Contenedores:** Docker Compose 

---

## 📦 Estructura del proyecto
```
proyecto/
├── backend/                 # API Express, modelos y controladores
│   ├── config/              # Configuración (conexión a DB, JWT, etc.)
│   ├── controllers/         # Lógica de rutas (auth, transacciones, etc.)
│   ├── database/            # Scripts de inicialización y seed.js
│   ├── middleware/          # Middlewares personalizados (auth, errores, etc.)
│   ├── models/              # Esquemas de Mongoose (User.js, etc.)
│   ├── routes/              # Definición de rutas Express
│   ├── .env.example         # Variables de entorno de ejemplo para backend
│   └── app.js               # Punto de entrada del backend
├── frontend/                # Aplicación React (Vite)
│   ├── src/                 # Componentes, vistas y lógica del frontend
│   ├── .env.example         # Variables de entorno de ejemplo para frontend
│   └── Dockerfile           # Dockerfile para el frontend
├── docker-compose.yml       # Orquestación de servicios (MongoDB, backend, frontend)
├── .gitignore               # Archivos a ignorar por git
├── README.md                # Este archivo
└── API_DOC                  # Documentación de la API
```
- **backend/config/**: Configuración de la app (DB, JWT, etc.).
- **backend/middleware/**: Middlewares personalizados (autenticación, manejo de errores, etc.).
- **backend/database/seed.js**: Script para poblar la base de datos con datos de ejemplo.
- **frontend/.env**: Variables de entorno para el frontend (solo para desarrollo local).
- **docker-compose.yml**: Levanta MongoDB, backend y frontend en

## ⚙️ Instalación y ejecución rápida

### 1. Clonar el repositorio
```sh
git clone <https://github.com/GinoRobla/programacion-3>
cd proyecto
```

### 2. Configurar variables de entorno
- Copia `backend/.env.example` a `backend/.env` y `frontend/.env.example` a `frontend/.env`, y completa los valores necesarios en cada uno.

### 3. Instalar dependencias
```sh
cd backend && npm install
cd ../frontend && npm install
```

### 4. (Opcional) Ejecutar seed de la base de datos
- Para crear un usuario y transacciones de ejemplo, ejecutá:
```sh
cd backend
node database/seed.js
```
Esto conectará a MongoDB y cargará datos iniciales si no existen.

### 5. Levantar el backend
```sh
cd backend
npm run dev
```

### 6. Levantar el frontend
```sh
cd frontend
npm run dev
```

### 7. Acceder a la app
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:3001/api](http://localhost:3001/api)

---

## 🐳 Ejecución con Docker Compose (opcional)

1. Asegúrate de tener Docker y Docker Compose instalados.
2. Ejecuta:
```sh
docker-compose up --build
```
3. Accede a la app en [http://localhost:3000](http://localhost:3000)

---

## 📝 Funcionalidades principales
- Registro de usuario con balance inicial
- Login y logout seguro (JWT)
- Agregar, listar y eliminar transacciones
- Categorizar transacciones
- Ver balance actualizado
- Filtrar historial por fecha y categoría
- Manejo de errores amigable

---

## 📄 Documentación de la API
Ver archivo [`API_DOC.md`](API_DOC.md) o la colección de Postman incluida.

---

## 🛠️ Comandos útiles
- `npm run dev` (backend/frontend): modo desarrollo con hot reload
- `docker-compose up --build`: levanta todo con Docker
- `docker-compose down`: detiene y limpia los servicios

---

## ⚠️ Notas importantes sobre el entorno

- **Datos independientes:**  
  Los datos creados en modo Docker y en modo local son independientes.  
  - Si corrés la app en Docker, los datos se guardan en el contenedor y podés verlos conectando MongoDB Compass a `localhost:27018` (o el puerto que uses en Docker).
  - Si corrés la app en local, los datos se guardan en tu MongoDB local (`localhost:27017`).

- **Persistencia de datos en Docker:**  
  Los datos de MongoDB en Docker se mantienen entre reinicios normales (`docker-compose down` y `up`).  
  Solo se borran si usás `docker-compose down -v`.

- **Seed de la base de datos:**  
  El script `seed.js` por defecto carga datos en la base local.  
  Si querés cargar datos en la base de Docker, ejecutá:
  ```sh
  MONGO_URI="mongodb://localhost:27018/control-gastos" node database/seed.js
  ```
  (o usá `docker exec` para correrlo dentro del contenedor backend).

- **Variables de entorno:**  
  Asegurate de que los valores de JWT_SECRET y MONGO_URI sean iguales en `.env` y en `docker-compose.yml` para evitar problemas de autenticación