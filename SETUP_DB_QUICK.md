# Database Setup - Quick Start

## ✅ Estructura Creada

```
✓ prisma/schema.prisma       - Schema de base de datos
✓ src/lib/db/prisma.ts        - Cliente Prisma (singleton)
✓ src/lib/db/payments.ts      - Funciones CRUD
✓ src/lib/db/index.ts         - Exportaciones
✓ .env                        - Variables de entorno
```

## 🚀 Próximos 3 Pasos

### Paso 1: Configurar DATABASE_URL

Edita `.env` con tus credenciales de PostgreSQL:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/payments_db?schema=public"
```

### Paso 2: Generar Cliente Prisma

```bash
bunx prisma generate
```

### Paso 3: Crear Tablas en la BD

```bash
# Opción rápida (desarrollo)
bunx prisma db push

# O crear migración (producción)
bunx prisma migrate dev --name init
```

## ✨ Listo!

Ahora puedes:
- Ver datos: `bunx prisma studio`
- Crear API routes usando las funciones de `src/lib/db/payments.ts`

**Ver documentación completa en:** `DATABASE_SETUP.md`
