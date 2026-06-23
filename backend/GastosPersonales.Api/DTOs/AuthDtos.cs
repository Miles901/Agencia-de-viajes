using System.ComponentModel.DataAnnotations;

namespace GastosPersonales.Api.DTOs;

public record RegisterRequest(
    [Required, MaxLength(120)] string FullName,
    [Required, EmailAddress, MaxLength(256)] string Email,
    [Required, MinLength(6), MaxLength(100)] string Password
);

public record LoginRequest(
    [Required, EmailAddress] string Email,
    [Required] string Password
);

public record AuthResponse(
    string Token,
    DateTime ExpiresAt,
    UserDto User
);

public record UserDto(
    Guid Id,
    string FullName,
    string Email
);
