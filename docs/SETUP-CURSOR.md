# Trabajar con este proyecto desde Cursor (y tu SQL Server en Windows)

## Por qué falla la conexión

Cuando usas **Cursor en la nube** (agente remoto), el código corre en un **servidor Linux**, no en tu PC.

```
┌─────────────────────┐         ✗ no se ven         ┌─────────────────────┐
│  Cursor (nube/Linux)│  ─────────────────────────► │  Tu PC (ISAC)       │
│  ./run.sh           │                             │  SQL Server EXPRESS │
└─────────────────────┘                             └─────────────────────┘
```

Por eso `ISAC\EXPRESS` no funciona desde la terminal de Cursor en la nube.

**La carpeta del proyecto SÍ existe**, pero está en el workspace de Cursor:
```
/workspace/backend/GastosPersonales.Api
```

No hace falta que la hayas creado tú a mano; se generó aquí mismo.

---

## Opción recomendada: Cursor en tu PC Windows

Así la API y SQL Server están en la misma máquina.

### Paso 1 — Instalar en Windows

1. [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
2. [Cursor](https://cursor.com) (si no lo tienes)
3. [Git](https://git-scm.com/download/win) (opcional, Cursor también clona solo)

### Paso 2 — Clonar el proyecto en tu PC

En Cursor: **File → Clone Repository** y pega:

```
https://github.com/Miles901/Agencia-de-viajes.git
```

O en PowerShell:

```powershell
cd C:\Users\TU_USUARIO\Documents
git clone https://github.com/Miles901/Agencia-de-viajes.git
cd agencia-de-viajes
```

Luego en Cursor: **File → Open Folder** → selecciona la carpeta clonada.

### Paso 3 — Configurar SQL Server

```powershell
cd backend\GastosPersonales.Api
copy appsettings.Development.json.example appsettings.Development.json
```

Edita `appsettings.Development.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\EXPRESS;Database=GastosPersonales;User Id=isac07;Password=TU_PASSWORD;TrustServerCertificate=True;Encrypt=False;"
  }
}
```

> Prueba también `localhost\\SQLEXPRESS` si `EXPRESS` no conecta.

### Paso 4 — Crear la base y correr la API

```powershell
dotnet run
```

La base `GastosPersonales` se crea sola. Swagger: http://localhost:5000/swagger

### Paso 5 — Web y móvil (en otra terminal)

```powershell
# Web
cd gastos-personales
npm install
npm run dev

# Móvil (opcional)
cd mobile
npm install
npx expo start
```

---

## Opción híbrida (solo si quieres seguir en Cursor nube)

| Parte | Dónde corre |
|-------|-------------|
| Web / código | Cursor nube |
| API + SQL Server | Tu PC Windows |

1. En tu PC: clona el repo y corre solo `dotnet run` en `backend\GastosPersonales.Api`
2. En Cursor nube: en `gastos-personales/.env` pon la IP de tu PC:

```
VITE_API_URL=http://192.168.X.X:5000
```

Tu PC y el servidor de Cursor deben poder verse por red (a veces no es posible).

---

## ¿Debo crear la base de datos manualmente?

**No.** Al conectar bien, la API crea:

- Base de datos `GastosPersonales`
- Tablas `Users` y `Expenses`

O ejecuta en SSMS: `scripts/init-database.sql`

---

## Resumen

| Pregunta | Respuesta |
|----------|-----------|
| ¿Tengo que crear la carpeta? | No, ya está en el repo |
| ¿Dónde está el backend? | `backend/GastosPersonales.Api` |
| ¿Por qué falla en Cursor nube? | SQL Server está en tu PC, no en la nube |
| ¿Qué hago? | Clona el repo en Windows y corre `dotnet run` ahí |

Más detalles de SQL Server: [CONEXION-SQL.md](CONEXION-SQL.md)
