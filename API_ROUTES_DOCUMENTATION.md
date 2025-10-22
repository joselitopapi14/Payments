# API Routes - Completado ✅

## 📁 Estructura Creada

```
src/app/api/
├── health/
│   └── route.ts              ← Health check endpoint
└── payments/
    ├── route.ts              ← GET, POST, DELETE (multiple)
    └── [id]/
        └── route.ts          ← GET, PATCH, DELETE (single)
```

## 🔗 Endpoints Disponibles

### Health Check

#### GET /api/health
Verifica el estado de la API y conexión a la base de datos.

**Response 200:**
```json
{
  "status": "healthy",
  "api": "ok",
  "database": "connected",
  "timestamp": "2025-10-19T12:00:00.000Z"
}
```

---

### Payments Collection

#### GET /api/payments
Obtiene todos los pagos ordenados por fecha de creación (más recientes primero).

**Response 200:**
```json
[
  {
    "id": "uuid-123",
    "name": "John Doe",
    "email": "john@example.com",
    "amount": 100.50,
    "status": "pending"
  }
]
```

**Response 500:**
```json
{
  "error": "Failed to fetch payments"
}
```

---

#### POST /api/payments
Crea un nuevo pago.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "amount": 100.50,
  "status": "pending"
}
```

**Validaciones:**
- `name`: Required, string
- `email`: Required, string
- `amount`: Required, positive number
- `status`: Required, must be: "pending" | "processing" | "success" | "failed"

**Response 201:**
```json
{
  "id": "uuid-123",
  "name": "John Doe",
  "email": "john@example.com",
  "amount": 100.50,
  "status": "pending"
}
```

**Response 400:**
```json
{
  "error": "Missing required fields: name, email, amount, status"
}
```
```json
{
  "error": "Invalid status. Must be: pending, processing, success, or failed"
}
```
```json
{
  "error": "Amount must be a positive number"
}
```

---

#### DELETE /api/payments
Elimina múltiples pagos.

**Request Body:**
```json
{
  "ids": ["uuid-123", "uuid-456", "uuid-789"]
}
```

**Response 200:**
```json
{
  "success": true,
  "deleted": 3
}
```

**Response 400:**
```json
{
  "error": "Missing or invalid 'ids' array"
}
```

---

### Single Payment

#### GET /api/payments/[id]
Obtiene un pago específico por ID.

**Response 200:**
```json
{
  "id": "uuid-123",
  "name": "John Doe",
  "email": "john@example.com",
  "amount": 100.50,
  "status": "pending"
}
```

**Response 404:**
```json
{
  "error": "Payment not found"
}
```

---

#### PATCH /api/payments/[id]
Actualiza un pago existente (parcial).

**Request Body:** (todos los campos son opcionales)
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "amount": 200.00,
  "status": "success"
}
```

**Validaciones:**
- `amount`: Si se proporciona, debe ser un número positivo
- `status`: Si se proporciona, debe ser: "pending" | "processing" | "success" | "failed"

**Response 200:**
```json
{
  "id": "uuid-123",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "amount": 200.00,
  "status": "success"
}
```

**Response 404:**
```json
{
  "error": "Payment not found"
}
```

**Response 400:**
```json
{
  "error": "Invalid status. Must be: pending, processing, success, or failed"
}
```

---

#### DELETE /api/payments/[id]
Elimina un pago específico.

**Response 200:**
```json
{
  "success": true,
  "message": "Payment deleted successfully"
}
```

**Response 404:**
```json
{
  "error": "Payment not found"
}
```

---

## 🧪 Cómo Probar

### Usando VS Code REST Client

Instala la extensión "REST Client" y crea un archivo `test.http`:

```http
### Health Check
GET http://localhost:3000/api/health

### Get all payments
GET http://localhost:3000/api/payments

### Create payment
POST http://localhost:3000/api/payments
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "amount": 100.50,
  "status": "pending"
}

### Get specific payment
GET http://localhost:3000/api/payments/{{paymentId}}

### Update payment
PATCH http://localhost:3000/api/payments/{{paymentId}}
Content-Type: application/json

{
  "status": "success",
  "amount": 150.00
}

### Delete payment
DELETE http://localhost:3000/api/payments/{{paymentId}}

### Delete multiple payments
DELETE http://localhost:3000/api/payments
Content-Type: application/json

{
  "ids": ["uuid-1", "uuid-2"]
}
```

### Usando curl

```bash
# Health check
curl http://localhost:3000/api/health

# Get all payments
curl http://localhost:3000/api/payments

# Create payment
curl -X POST http://localhost:3000/api/payments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "amount": 100.50,
    "status": "pending"
  }'

# Update payment
curl -X PATCH http://localhost:3000/api/payments/uuid-123 \
  -H "Content-Type: application/json" \
  -d '{"status": "success"}'

# Delete payment
curl -X DELETE http://localhost:3000/api/payments/uuid-123
```

### Usando Postman

1. Importa la colección desde el JSON
2. Establece `baseUrl` como variable: `http://localhost:3000`
3. Ejecuta las peticiones

---

## ✨ Características Implementadas

- ✅ Validación de datos en todos los endpoints
- ✅ Manejo de errores consistente
- ✅ Códigos de estado HTTP apropiados
- ✅ Logs de errores en consola
- ✅ Type-safety completo con TypeScript
- ✅ Health check para monitoreo
- ✅ Validación de email, amount, status
- ✅ Verificación de existencia antes de update/delete

---

## 🚀 Próximo Paso

Ahora tu aplicación está **100% funcional**:

1. ✅ Frontend conectado
2. ✅ API Routes creados
3. ✅ Base de datos configurada
4. ✅ CRUD completo

**Inicia el servidor:**
```bash
bun run dev
```

**Accede a:**
- App: http://localhost:3000
- Prisma Studio: http://localhost:5555 (si está corriendo)
- Health Check: http://localhost:3000/api/health
