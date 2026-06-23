# Mis Gastos — Sistema multiplataforma (RD$)

Aplicación completa para registrar gastos personales en **pesos dominicanos (DOP)** con:

- **Backend** ASP.NET Core 8 + **SQL Server** + autenticación JWT
- **Web** React (Vite)
- **Móvil** React Native (Expo) para Android e iOS

## Arquitectura

```
┌─────────────┐     ┌─────────────┐
│  Web React  │     │ App Expo    │
│  :5173      │     │ Android/iOS │
└──────┬──────┘     └──────┬──────┘
       │    JWT REST API    │
       └─────────┬──────────┘
                 ▼
        ┌────────────────┐
        │  API C# :5000  │
        └────────┬───────┘
                 ▼
        ┌────────────────┐
        │   SQL Server     │
        └────────────────┘
```

## Requisitos

- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org/)
- [Docker](https://www.docker.com/) (para SQL Server) o SQL Server local
- [Expo Go](https://expo.dev/go) en el celular (para probar la app móvil)

## Inicio rápido con Docker

```bash
# 1. Levantar SQL Server + API
docker compose up -d

# 2. Web
cd gastos-personales
cp .env.example .env
npm install
npm run dev

# 3. Móvil (en otra terminal)
cd mobile
cp .env.example .env
npm install
npx expo start
```

- **API / Swagger:** http://localhost:5000/swagger  
- **Web:** http://localhost:5173  
- **Móvil:** escanea el QR con Expo Go

> En el celular físico, cambia `localhost` por la IP de tu PC en `.env` de web y mobile  
> Ejemplo: `EXPO_PUBLIC_API_URL=http://192.168.1.10:5000`

## Desarrollo sin Docker

### 1. SQL Server

Asegúrate de tener SQL Server corriendo y actualiza la cadena de conexión en  
`backend/GastosPersonales.Api/appsettings.json`.

### 2. Backend (C#)

```bash
cd backend/GastosPersonales.Api
dotnet run
```

La API aplica migraciones automáticamente al iniciar.

### 3. Web (React)

```bash
cd gastos-personales
npm install
npm run dev
```

### 4. Móvil (Expo)

```bash
cd mobile
npm install
npx expo start
```

## API — Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registro de usuario |
| POST | `/api/auth/login` | Inicio de sesión |
| GET | `/api/auth/me` | Perfil (requiere token) |
| GET | `/api/expenses` | Listar gastos |
| GET | `/api/expenses/summary` | Resumen en DOP |
| POST | `/api/expenses` | Crear gasto |
| DELETE | `/api/expenses/{id}` | Eliminar gasto |

## Moneda

Todos los importes se manejan en **DOP (peso dominicano)** con formato `es-DO`.

## Estructura del repositorio

```
backend/GastosPersonales.Api/   # API REST en C#
gastos-personales/              # App web React
mobile/                         # App móvil Expo
docker-compose.yml              # SQL Server + API
```

## Credenciales SQL Server (Docker)

- **Usuario:** `sa`
- **Contraseña:** `Gastos@Sql2024!`
- **Puerto:** `1433`

Cambia estas credenciales en producción.
