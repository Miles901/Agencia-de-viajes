using GastosPersonales.Api.Data;
using GastosPersonales.Api.DTOs;
using GastosPersonales.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GastosPersonales.Api.Services;

public class AuthService(ApplicationDbContext db, ITokenService tokenService) : IAuthService
{
    public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();

        if (await db.Users.AnyAsync(u => u.Email == email))
        {
            throw new InvalidOperationException("Ya existe una cuenta con este correo.");
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            FullName = request.FullName.Trim(),
            Email = email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            CreatedAt = DateTime.UtcNow
        };

        db.Users.Add(user);
        await db.SaveChangesAsync();

        var (token, expiresAt) = tokenService.CreateToken(user);
        return new AuthResponse(token, expiresAt, ToUserDto(user));
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request)
    {
        var email = request.Email.Trim().ToLowerInvariant();
        var user = await db.Users.FirstOrDefaultAsync(u => u.Email == email)
            ?? throw new InvalidOperationException("Correo o contraseña incorrectos.");

        if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            throw new InvalidOperationException("Correo o contraseña incorrectos.");
        }

        var (token, expiresAt) = tokenService.CreateToken(user);
        return new AuthResponse(token, expiresAt, ToUserDto(user));
    }

    public async Task<UserDto?> GetUserAsync(Guid userId)
    {
        var user = await db.Users.FindAsync(userId);
        return user is null ? null : ToUserDto(user);
    }

    private static UserDto ToUserDto(User user) =>
        new(user.Id, user.FullName, user.Email);
}
