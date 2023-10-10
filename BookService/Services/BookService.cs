using BookService.Data;
using BookService.Data.Models;
using BookService.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace BookService.Services
{
    public interface IBookService
    {
        List<Book> GetBooks();
        int Save(Book book);

        Book? Update(Book book);

        Book? Get(int id);
    }
    public class BookService : IBookService
    {
        private readonly ApiContext _apiContext;

        public BookService(ApiContext apiContext)
        {
            this._apiContext = apiContext;
            this._apiContext.Database.EnsureCreated();
        }

        public List<Book> GetBooks()
        {
            var books = this._apiContext.Books.ToList();
            return books;
        }

        public int Save(Book book)
        {
            var addedBook = this._apiContext.Books.Add(book);
            this._apiContext.SaveChanges();
            return addedBook.Entity.Id;
        }

        public Book? Update(Book book)
        {
           
            if (book != null)
            {
                this._apiContext.Books.Attach(book);
                var entry = this._apiContext.Entry(book);
                if (book.Name != null)
                {
                    entry.Entity.Name = book.Name;
                    entry.Property(e => e.Name).IsModified = true;

                }

                if (book.Description != null)
                {
                    entry.Entity.Description = book.Description;
                    entry.Property(e => e.Description).IsModified = true;

                }

                if (book.Category != null)
                {
                    entry.Entity.Category = book.Category;
                    entry.Property(e => e.Category).IsModified = true;

                }

                if (book.Author != null)
                {
                    entry.Entity.Author = book.Author;
                    entry.Property(e => e.Author).IsModified = true;

                }

                this._apiContext.SaveChanges();

                return this.Get(book.Id);

            }

            return null;
        }

        public Book? Get(int id)
        {
            return this._apiContext.Books.Find(id);
        }
    }
}
