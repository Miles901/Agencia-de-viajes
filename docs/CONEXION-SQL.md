# Conectar la API a SQL Server (Windows)

## El error que ves

```
Error Locating Server/Instance Specified
```

Significa que **la API no puede encontrar tu instancia de SQL Server** (`ISAC\EXPRESS`).

Esto pasa casi siempre por una de estas razones:

1. **La API corre en Linux/nube** y SQL Server está en tu PC Windows (`ISAC`) → no se ven entre sí.
2. **Nombre de instancia incorrecto** (por ejemplo `EXPRESS` en vez de `SQLEXPRESS`).
3. **SQL Server Browser** apagado (necesario para instancias con nombre).
4. **TCP/IP deshabilitado** en SQL Server.

---

## Solución recomendada: correr la API en tu PC Windows

SQL Server está en tu máquina. La API también debe correr **ahí**, no en el entorno Linux remoto.

### En PowerShell o CMD (en Windows):

```powershell
cd ruta\al\proyecto\backend\GastosPersonales.Api
dotnet run
```

O abre el proyecto en **Visual Studio** y presiona F5.

### Cadena de conexión en `appsettings.Development.json`

Si la API y SQL Server están en **el mismo PC**, usa:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\EXPRESS;Database=GastosPersonales;User Id=isac07;Password=TU_PASSWORD;TrustServerCertificate=True;Encrypt=False;"
  }
}
```

Prueba también con el nombre típico de instancia:

```json
"Server=localhost\\SQLEXPRESS;..."
```

o:

```json
"Server=.\\EXPRESS;..."
```

> En JSON las barras van dobles: `\\` = `\`

---

## Verificar tu instancia en SQL Server Management Studio (SSMS)

1. Conéctate a tu servidor.
2. Click derecho en el servidor → **Propiedades** → nombre de instancia.
3. Usa exactamente ese nombre en la cadena de conexión.

---

## Usar puerto fijo (más confiable)

1. Abre **SQL Server Configuration Manager**.
2. **SQL Server Network Configuration** → **Protocols for EXPRESS** (o tu instancia).
3. Habilita **TCP/IP**.
4. En TCP/IP → **IP Addresses** → **IPAll** → anota **TCP Port** (ej. `49172`).
5. Reinicia el servicio **SQL Server (EXPRESS)**.

Luego en `appsettings.Development.json`:

```json
"DefaultConnection": "Server=localhost,49172;Database=GastosPersonales;User Id=isac07;Password=TU_PASSWORD;TrustServerCertificate=True;Encrypt=False;"
```

(Sustituye `49172` por tu puerto real.)

---

## Habilitar SQL Server Browser

En **Services** (servicios de Windows), busca **SQL Server Browser** y ponlo en **Automatic** + **Start**.

---

## Crear la base de datos

No hace falta crearla a mano. Al conectar bien, la API crea `GastosPersonales` sola.

También puedes ejecutar en SSMS el archivo:

```
scripts/init-database.sql
```

---

## Probar conexión rápida en SSMS

Intenta conectarte con los mismos datos:

- Servidor: `ISAC\EXPRESS` o `localhost\EXPRESS`
- Autenticación: SQL Server
- Usuario: `isac07`
- Contraseña: la de tu `appsettings.Development.json`

Si SSMS conecta pero la API no, el problema es el formato de la cadena o dónde corre la API.

---

## Resumen

| Dónde corre SQL Server | Dónde debe correr la API |
|----------------------|--------------------------|
| Tu PC Windows (ISAC) | Tu PC Windows            |
| Azure SQL            | Cualquier lugar con internet |
| Docker local         | Misma máquina que Docker |

**No puedes usar `ISAC\EXPRESS` desde un servidor Linux en la nube** salvo que expongas SQL Server a internet (no recomendado).
