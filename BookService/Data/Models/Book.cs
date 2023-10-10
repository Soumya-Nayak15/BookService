using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BookService.Data.Models
{
    public interface IAuditableModel
    {
        DateTime Created { get; }
    }
    [Table("Books", Schema = "configuracion")]
    public class Book : IAuditableModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }

        public string Author { get; set; }

        public string Description { get; set; }

        [Column(TypeName = "nvarchar(24)")]
        public Category? Category { get; set; }

        public DateTime Created { get; private set; }

    }

    public enum Category
    {
        Thriller,
        History,
        Drama,
        Biography
    }
}
