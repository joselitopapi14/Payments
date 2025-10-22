# Configuración de Base de Datos con Prisma y PostgreSQL

## 📁 Estructura Creada

```
prisma/
  └── schema.prisma          # Definición del modelo de datos

src/
  └── lib/
      └── db/
          ├── index.ts       # Exportaciones principales
          ├── prisma.ts      # Cliente Prisma singleton
          └── payments.ts    # Funciones CRUD para payments
```

## 🗄️ Schema de Base de Datos

### Modelo Payment

```prisma
model Payment {
  id        String   @id @default(uuid())
  name      String
  email     String
  amount    Float
  status    String   // "pending" | "processing" | "success" | "failed"
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("payments")
}
```

**Campos:**
- `id`: UUID generado automáticamente (Primary Key)
- `name`: Nombre del cliente
- `email`: Email del cliente
- `amount`: Monto del pago (Float para decimales)
- `status`: Estado del pago (pending, processing, success, failed)
- `createdAt`: Timestamp de creación (automático)
- `updatedAt`: Timestamp de última actualización (automático)

## 🔧 Configuración

### 1. Variables de Entorno

Edita el archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

**Ejemplo local:**
```env
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/payments_db?schema=public"
```

**Ejemplo con Supabase:**
```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true"
```

**Ejemplo con Neon:**
```env
DATABASE_URL="postgresql://[user]:[password]@[endpoint].neon.tech/[dbname]?sslmode=require"
```

### 2. Generar Cliente de Prisma

Después de configurar `DATABASE_URL`, ejecuta:

```bash
# Generar el cliente de Prisma (crea tipos TypeScript)
bunx prisma generate

# O si prefieres usar npx
npx prisma generate
```

Esto creará el cliente de Prisma en `node_modules/.prisma/client` con tipos TypeScript completos.

### 3. Crear la Base de Datos

```bash
# Crear la base de datos y aplicar el schema
bunx prisma db push

# O crear una migración (recomendado para producción)
bunx prisma migrate dev --name init
```

**Diferencia entre los comandos:**
- `db push`: Rápido, ideal para desarrollo, sincroniza schema sin crear migraciones
- `migrate dev`: Crea archivos de migración, ideal para producción y control de versiones

### 4. Verificar la Conexión

```bash
# Abrir Prisma Studio (UI web para ver/editar datos)
bunx prisma studio
```

## 📚 Funciones Disponibles

El archivo `src/lib/db/payments.ts` proporciona:

### `getAllPayments()`
Obtiene todos los pagos ordenados por fecha de creación (más reciente primero)
```typescript
const payments = await getAllPayments();
```

### `getPaymentById(id)`
Obtiene un pago específico por ID
```typescript
const payment = await getPaymentById("uuid-123");
```

### `createPayment(data)`
Crea un nuevo pago
```typescript
const newPayment = await createPayment({
  name: "John Doe",
  email: "john@example.com",
  amount: 100.50,
  status: "pending",
});
```

### `updatePayment(id, data)`
Actualiza un pago existente (solo los campos proporcionados)
```typescript
const updated = await updatePayment("uuid-123", {
  status: "success",
  amount: 150.00,
});
```

### `deletePayment(id)`
Elimina un pago por ID
```typescript
await deletePayment("uuid-123");
```

### `deletePayments(ids)`
Elimina múltiples pagos
```typescript
const count = await deletePayments(["uuid-1", "uuid-2", "uuid-3"]);
console.log(`Deleted ${count} payments`);
```

### `checkDatabaseConnection()`
Verifica si la conexión a la base de datos funciona
```typescript
const isConnected = await checkDatabaseConnection();
```

## 🚀 Uso en API Routes

```typescript
import { getAllPayments, createPayment } from "@/lib/db";

// En un API route
export async function GET() {
  const payments = await getAllPayments();
  return Response.json(payments);
}

export async function POST(request: Request) {
  const body = await request.json();
  const payment = await createPayment(body);
  return Response.json(payment, { status: 201 });
}
```

## 🛠️ Comandos Útiles de Prisma

```bash
# Generar cliente (después de cambios en schema.prisma)
bunx prisma generate

# Aplicar cambios al schema sin migraciones
bunx prisma db push

# Crear una migración
bunx prisma migrate dev --name nombre_descriptivo

# Aplicar migraciones en producción
bunx prisma migrate deploy

# Abrir Prisma Studio (GUI)
bunx prisma studio

# Ver estado de la base de datos
bunx prisma db pull

# Formatear schema.prisma
bunx prisma format

# Resetear base de datos (¡CUIDADO! Borra todos los datos)
bunx prisma migrate reset
```

## 🔒 Singleton Pattern

El archivo `prisma.ts` usa un patrón singleton para evitar crear múltiples instancias de PrismaClient en desarrollo (hot reload):

```typescript
// ✅ Correcto - reutiliza la misma instancia
import { prisma } from "@/lib/db";

// ❌ Incorrecto - crea nueva instancia cada vez
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
```

## 📊 Próximos Pasos

1. ✅ Configura `DATABASE_URL` en `.env`
2. ✅ Ejecuta `bunx prisma generate`
3. ✅ Ejecuta `bunx prisma db push` o `prisma migrate dev`
4. ✅ Crea los API routes en `src/app/api/payments/`
5. ✅ Conecta el frontend (ya está listo!)

## 🐛 Troubleshooting

### Error: "Can't reach database server"
- Verifica que PostgreSQL esté corriendo
- Verifica las credenciales en `DATABASE_URL`
- Verifica el puerto (default: 5432)

### Error: "Schema not found"
- Ejecuta `bunx prisma db push` para crear las tablas
- O ejecuta `bunx prisma migrate dev`

### Error: "@prisma/client no exporta Payment"
- Ejecuta `bunx prisma generate` para generar tipos
- Reinicia TypeScript server en VS Code

### Los cambios en schema.prisma no se reflejan
- Ejecuta `bunx prisma generate` después de cada cambio
- Luego ejecuta `bunx prisma db push` o `prisma migrate dev`
