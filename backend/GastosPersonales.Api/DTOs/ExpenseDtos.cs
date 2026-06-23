using System.ComponentModel.DataAnnotations;

namespace GastosPersonales.Api.DTOs;

public record ExpenseDto(
    Guid Id,
    string Description,
    decimal Amount,
    string Category,
    DateOnly Date,
    DateTime CreatedAt
);

public record CreateExpenseRequest(
    [Required, MaxLength(200)] string Description,
    [Range(0.01, double.MaxValue)] decimal Amount,
    [Required, MaxLength(50)] string Category,
    [Required] DateOnly Date
);

public record UpdateExpenseRequest(
    [Required, MaxLength(200)] string Description,
    [Range(0.01, double.MaxValue)] decimal Amount,
    [Required, MaxLength(50)] string Category,
    [Required] DateOnly Date
);

public record ExpenseSummaryDto(
    decimal Total,
    decimal MonthTotal,
    int Count,
    IReadOnlyList<CategoryTotalDto> ByCategory
);

public record CategoryTotalDto(
    string Category,
    decimal Total
);
