using BookService.Data.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace BookService.Models
{
    public class BookView
    {
        public int? Id { get; set; }

        public string? Name { get; set; }

        public string? Author { get; set; }

        public string? Description { get; set; }

        public Category? Category { get; set; }
    }
}
