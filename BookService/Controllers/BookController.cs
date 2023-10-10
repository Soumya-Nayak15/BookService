using BookService.Data.Models;
using BookService.Models;
using BookService.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookController : Controller
    {

        private readonly IBookService bookService;

        public BookController(IBookService bookService)
        {
            this.bookService = bookService;
        }

        [HttpPost("create")]
        [Consumes("application/json")]
        public int Create([FromBody] BookView bookView)
        {
            var book = new Book
            {
                Author = bookView.Author,
                Category = bookView.Category,
                Description = bookView.Description,
                Name = bookView.Name
            };
            return this.bookService.Save(book);
        }

        [HttpGet("all")]
        public List<BookView> GetAll()
        {
            var books = this.bookService.GetBooks();
            return books.ConvertAll(b => new BookView
            {
                Id = b.Id,
                Name = b.Name,
                Author = b.Author,
                Description = b.Description,
                Category = b.Category
            });
        }

        [HttpPut("{bookId}/update")]
        [Consumes("application/json")]
        public BookView? Update(int bookId, [FromBody] BookView bookView)
        {
            var book = new Book
            {
                Id = bookId,
                Author = bookView.Author,
                Category = bookView.Category,
                Description = bookView.Description,
                Name = bookView.Name
            };
            var updatedBook = this.bookService.Update(book);
            if (updatedBook != null)
            {
                return new BookView
                {
                    Id = updatedBook.Id,
                    Name = updatedBook.Name,
                    Author = updatedBook.Author,
                    Description = updatedBook.Description,
                    Category = updatedBook.Category
                };
            }

            return null;
        }
    }
}
