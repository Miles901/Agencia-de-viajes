# Mis Gastos — API REST

Backend en **ASP.NET Core 8** con Entity Framework Core y **SQL Server**.

## Ejecutar

```bash
dotnet run
```

Swagger: http://localhost:5000/swagger

## Migraciones

```bash
dotnet ef migrations add NombreMigracion -o Migrations
dotnet ef database update
```

Al iniciar la API, las migraciones se aplican automáticamente.

## Configuración

Edita `appsettings.json`:

- `ConnectionStrings:DefaultConnection` — SQL Server
- `Jwt` — clave y expiración del token
- `Cors:Origins` — orígenes permitidos (web y Expo)
