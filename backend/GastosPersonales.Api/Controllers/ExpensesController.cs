using System.Security.Claims;
using GastosPersonales.Api.Data;
using GastosPersonales.Api.DTOs;
using GastosPersonales.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GastosPersonales.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ExpensesController(ApplicationDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ExpenseDto>>> GetAll(
        [FromQuery] string? category,
        [FromQuery] string? search)
    {
        var userId = GetUserId();
        var query = db.Expenses.Where(e => e.UserId == userId);

        if (!string.IsNullOrWhiteSpace(category) && category != "all")
        {
            query = query.Where(e => e.Category == category);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLower();
            query = query.Where(e => e.Description.ToLower().Contains(term));
        }

        var expenses = await query
            .OrderByDescending(e => e.Date)
            .ThenByDescending(e => e.CreatedAt)
            .Select(e => ToDto(e))
            .ToListAsync();

        return Ok(expenses);
    }

    [HttpGet("summary")]
    public async Task<ActionResult<ExpenseSummaryDto>> GetSummary()
    {
        var userId = GetUserId();
        var expenses = await db.Expenses
            .Where(e => e.UserId == userId)
            .AsNoTracking()
            .ToListAsync();

        var total = expenses.Sum(e => e.Amount);
        var now = DateOnly.FromDateTime(DateTime.UtcNow);
        var monthTotal = expenses
            .Where(e => e.Date.Year == now.Year && e.Date.Month == now.Month)
            .Sum(e => e.Amount);

        var byCategory = expenses
            .GroupBy(e => e.Category)
            .Select(g => new CategoryTotalDto(g.Key, g.Sum(e => e.Amount)))
            .OrderByDescending(c => c.Total)
            .ToList();

        return Ok(new ExpenseSummaryDto(total, monthTotal, expenses.Count, byCategory));
    }

    [HttpPost]
    public async Task<ActionResult<ExpenseDto>> Create(CreateExpenseRequest request)
    {
        var expense = new Expense
        {
            Id = Guid.NewGuid(),
            UserId = GetUserId(),
            Description = request.Description.Trim(),
            Amount = request.Amount,
            Category = request.Category,
            Date = request.Date,
            CreatedAt = DateTime.UtcNow
        };

        db.Expenses.Add(expense);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = expense.Id }, ToDto(expense));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ExpenseDto>> GetById(Guid id)
    {
        var expense = await FindOwnedExpense(id);
        return expense is null ? NotFound() : Ok(ToDto(expense));
    }

    [HttpPut("{id:guid}")]
    public async Task<ActionResult<ExpenseDto>> Update(Guid id, UpdateExpenseRequest request)
    {
        var expense = await FindOwnedExpense(id);
        if (expense is null) return NotFound();

        expense.Description = request.Description.Trim();
        expense.Amount = request.Amount;
        expense.Category = request.Category;
        expense.Date = request.Date;

        await db.SaveChangesAsync();
        return Ok(ToDto(expense));
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var expense = await FindOwnedExpense(id);
        if (expense is null) return NotFound();

        db.Expenses.Remove(expense);
        await db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteAll()
    {
        var userId = GetUserId();
        await db.Expenses.Where(e => e.UserId == userId).ExecuteDeleteAsync();
        return NoContent();
    }

    private Guid GetUserId()
    {
        var claim = User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? User.FindFirstValue("sub")
            ?? throw new UnauthorizedAccessException();

        return Guid.Parse(claim);
    }

    private async Task<Expense?> FindOwnedExpense(Guid id)
    {
        var userId = GetUserId();
        return await db.Expenses.FirstOrDefaultAsync(e => e.Id == id && e.UserId == userId);
    }

    private static ExpenseDto ToDto(Expense expense) =>
        new(expense.Id, expense.Description, expense.Amount, expense.Category, expense.Date, expense.CreatedAt);
}
