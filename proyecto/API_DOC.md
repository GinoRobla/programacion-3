# Documentación de la API - Control de Gastos

Esta API permite gestionar usuarios y transacciones para un sistema de control de gastos personales. Todas las rutas que requieren autenticación usan JWT en el header `Authorization`.

---

## Autenticación

### POST `/api/auth/register`
- **Descripción:** Registrar un nuevo usuario.
- **Body:**
```json
{
  "name": "string",
  "surname": "string",
  "email": "string",
  "username": "string",
  "password": "string",
  "initialBalance": 1000
}
```
- **Respuesta exitosa:**
```json
{
  "message": "Usuario registrado correctamente"
}
```

### POST `/api/auth/login`
- **Descripción:** Iniciar sesión.
- **Body:**
```json
{
  "username": "string",
  "password": "string"
}
```
- **Respuesta exitosa:**
```json
{
  "token": "jwt_token"
}
```

### GET `/api/auth/me`
- **Descripción:** Obtener datos del usuario autenticado.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Respuesta:**
```json
{
  "name": "string",
  "surname": "string",
  "email": "string",
  "username": "string",
  "initialBalance": 1000,
  ...
}
```

---

## Transacciones

### GET `/api/transacciones`
- **Descripción:** Listar transacciones del usuario autenticado. Permite filtrar por fecha y categoría.
- **Query params:**
  - `desde` (opcional): fecha inicio (YYYY-MM-DD)
  - `hasta` (opcional): fecha fin (YYYY-MM-DD)
  - `categoria` (opcional): nombre de la categoría
- **Headers:**
  - `Authorization: Bearer <token>`
- **Respuesta:**
```json
[
  {
    "tipo": "ingreso",
    "monto": 1000,
    "categoria": "Sueldo",
    "descripcion": "Pago mensual",
    "fecha": "2025-07-09T00:00:00.000Z"
  },
  ...
]
```

### POST `/api/transacciones`
- **Descripción:** Registrar una nueva transacción.
- **Body:**
```json
{
  "tipo": "ingreso" | "gasto",
  "monto": 500,
  "categoria": "Comida",
  "descripcion": "Supermercado"
}
```
- **Headers:**
  - `Authorization: Bearer <token>`
- **Respuesta:**
```json
{
  "tipo": "gasto",
  "monto": 500,
  "categoria": "Comida",
  "descripcion": "Supermercado",
  "fecha": "2025-07-09T00:00:00.000Z"
}
```

### GET `/api/transacciones/categorizar`
- **Descripción:** Listar todas las categorías usadas por el usuario.
- **Headers:**
  - `Authorization: Bearer <token>`
- **Respuesta:**
```json
[
  { "categoria": "Sueldo" },
  { "categoria": "Comida" },
  ...
]
```

### GET `/api/transacciones/balance`
- **Descripción:** Obtener el balance actual del usuario (incluye balance inicial).
- **Headers:**
  - `Authorization: Bearer <token>`
- **Respuesta:**
```json
{
  "balance": 1500
}
```

---

## Notas
- Todos los endpoints que requieren autenticación deben recibir el token JWT en el header `Authorization`.
- Los errores se devuelven en formato `{ "error": "mensaje" }`.
- Ejemplo de error:
```json
{
  "error": "Usuario no encontrado"
}
```