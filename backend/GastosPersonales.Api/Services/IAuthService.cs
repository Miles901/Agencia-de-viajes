using GastosPersonales.Api.DTOs;

namespace GastosPersonales.Api.Services;

public interface IAuthService
{
    Task<AuthResponse> RegisterAsync(RegisterRequest request);
    Task<AuthResponse> LoginAsync(LoginRequest request);
    Task<UserDto?> GetUserAsync(Guid userId);
}
