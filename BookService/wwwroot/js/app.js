function AddBook() {
    var name = document.getElementById("name").value;
    var author = document.getElementById("author").value;
    var description = document.getElementById("description").value;
    var category = document.getElementById("category").value;
    var book = {
        name: name,
        author: author,
        description: description,
        category: parseInt(category)
    };
    fetch("/api/book/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book)
    }).then(function (result) { GetBooks(); });
}
function Update(bookId) {
    var name = document.getElementById("name" + bookId).value;
    var author = document.getElementById("author" + bookId).value;
    var description = document.getElementById("description" + bookId).value;
    var category = document.getElementById("category" + bookId).value;
    var book = {
        name: name,
        author: author,
        description: description,
        category: parseInt(category)
    };
    fetch("/api/book/".concat(bookId, "/update"), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(book)
    }).then(function (result) { GetBooks(); });
    console.log(book);
}
function GetBooks() {
    fetch("/api/book/all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(function (result) {
        console.log("fetched all");
        result.json().then(function (data) {
            GenerateBookList(data);
        });
    });
}
function GenerateBookList(books) {
    var bookNodes = "<table><th>Books :</th>";
    books.forEach(function (book) {
        bookNodes = bookNodes + GenerateBookNode(book);
    });
    bookNodes = bookNodes + "</table>";
    document.getElementById("book-list").innerHTML = bookNodes;
    UpdateSelected(books);
}
function GenerateBookNode(book) {
    return "\n        <tr>\n            <td>\n                <input id=\"name".concat(book.id, "\" type=\"text\" name=\"name\" value=\"").concat(book.name, "\"/>\n            </td>\n            <td>\n               <input id=\"author").concat(book.id, "\" type=\"text\" name=\"author\" value=\"").concat(book.author, "\"/>\n            </td>\n            <td>\n                <input id=\"description").concat(book.id, "\" type=\"text\" name=\"description\" value=\"").concat(book.description, "\"/>\n            </td>\n            <td>\n                <select id=\"category").concat(book.id, "\">\n                    <option value=0>Thriller</option>\n                    <option value=1>History</option>\n                    <option value=2>Drama</option>\n                    <option value=3>Biography</option>\n                </select>\n            </td>\n            <td>\n                 <button type=\"button\" class=\"btn btn-primary btn-md\" onclick=\"Update(").concat(book.id, ")\">\n                   Update book\n                </button>\n            </td>\n        </tr>\n    ");
}
function UpdateSelected(books) {
    books.forEach(function (book) {
        var category = document.getElementById("category" + book.id);
        category.selectedIndex = book.category;
    });
}
GetBooks();
//# sourceMappingURL=app.js.map