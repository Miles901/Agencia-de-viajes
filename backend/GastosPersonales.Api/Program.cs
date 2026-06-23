using System.Security.Claims;
using System.Text;
using GastosPersonales.Api.Data;
using GastosPersonales.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Falta ConnectionStrings:DefaultConnection en appsettings.");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IAuthService, AuthService>();

var jwt = builder.Configuration.GetSection("Jwt");
var key = Encoding.UTF8.GetBytes(jwt["Key"]!);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwt["Issuer"],
            ValidAudience = jwt["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ClockSkew = TimeSpan.FromMinutes(1),
            NameClaimType = ClaimTypes.NameIdentifier
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AppClients", policy =>
    {
        policy
            .WithOrigins(
                builder.Configuration.GetSection("Cors:Origins").Get<string[]>()
                ?? ["http://localhost:5173", "http://localhost:8081", "http://localhost:19006"])
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILoggerFactory>().CreateLogger("Database");
    var csb = new SqlConnectionStringBuilder(connectionString);

    try
    {
        logger.LogInformation(
            "Conectando a SQL Server → Servidor: {Server}, Base: {Database}, Usuario: {User}",
            csb.DataSource,
            csb.InitialCatalog,
            csb.UserID);

        logger.LogInformation("Aplicando migraciones...");
        db.Database.Migrate();
        logger.LogInformation("Base de datos '{Database}' lista.", csb.InitialCatalog);
    }
    catch (SqlException ex) when (ex.Number is 26 or -1 or 53)
    {
        Console.ForegroundColor = ConsoleColor.Red;
        Console.WriteLine();
        Console.WriteLine("╔══════════════════════════════════════════════════════════════╗");
        Console.WriteLine("║  ERROR: No se pudo conectar a SQL Server                     ║");
        Console.WriteLine("╚══════════════════════════════════════════════════════════════╝");
        Console.ResetColor();
        Console.WriteLine();
        Console.WriteLine($"  Servidor configurado : {csb.DataSource}");
        Console.WriteLine($"  Base de datos        : {csb.InitialCatalog}");
        Console.WriteLine($"  Error                : {ex.Message}");
        Console.WriteLine();
        Console.WriteLine("  Posibles causas:");
        Console.WriteLine("  • La API corre en Linux/nube y SQL Server está en tu PC Windows.");
        Console.WriteLine("    → Ejecuta 'dotnet run' en tu PC donde está SQL Server.");
        Console.WriteLine("  • Nombre de instancia incorrecto (EXPRESS vs SQLEXPRESS).");
        Console.WriteLine("  • SQL Server Browser o TCP/IP deshabilitados.");
        Console.WriteLine();
        Console.WriteLine("  Guía completa: docs/CONEXION-SQL.md");
        Console.WriteLine();
        throw;
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "No se pudo conectar o migrar la base de datos.");
        throw;
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AppClients");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok", currency = "DOP" }));

app.Run();
