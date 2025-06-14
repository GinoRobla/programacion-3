# Práctico 3 - Sistema de Turnos Clínica

## 🚀 Instalación

```bash
git clone https://github.com/GinoRobla/programacion-3.git
cd programacion-3
npm install
npm start
```

### 🔑 Login
- `GET /`
- `POST /login`

### 🖥️ Panel de gestión
- `GET /app`

### 👤 Pacientes (API)
- `GET /api/v1/pacientes`
- `POST /api/v1/pacientes`
- `PUT /api/v1/pacientes/:id`
- `DELETE /api/v1/pacientes/:id`
- `POST /api/v1/pacientes/login`
- `POST /api/v1/pacientes/findByEmail`

### 📅 Turnos (API)
- `GET /api/v1/turnos/:idPaciente`
- `POST /api/v1/turnos`
- `PUT /api/v1/turnos/:idTurno`
- `DELETE /api/v1/turnos/:idTurno`

### 📝 Notas
Para ingresar al sistema, usá el siguiente usuario de prueba:<br> Email: email@gmail.com<br> Contraseña: 12345<br> (Este usuario es el único paciente creado al iniciar la app.)
