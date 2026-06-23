using GastosPersonales.Api.Models;

namespace GastosPersonales.Api.Services;

public interface ITokenService
{
    (string Token, DateTime ExpiresAt) CreateToken(User user);
}
