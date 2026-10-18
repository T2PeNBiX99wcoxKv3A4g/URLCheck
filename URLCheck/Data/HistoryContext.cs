using Microsoft.EntityFrameworkCore;
using URLCheck.Models;

namespace URLCheck.Data;

/// <summary>EF Core context for the local history database.</summary>
internal sealed class HistoryContext(DbContextOptions<HistoryContext> options) : DbContext(options)
{
    public DbSet<HistoryEntry> Entries => Set<HistoryEntry>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<HistoryEntry>(entity =>
        {
            entity.ToTable("History");
            entity.HasKey(entry => entry.Id);
            entity.Property(entry => entry.Url).IsRequired();
            entity.HasIndex(entry => entry.Timestamp);
        });
    }
}