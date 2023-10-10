
function AddBook() {
    let name: string = (document.getElementById("name") as HTMLInputElement).value;
    let author: string = (document.getElementById("author") as HTMLInputElement).value;
    let description: string = (document.getElementById("description") as HTMLInputElement).value;
    let category: string = (document.getElementById("category") as HTMLSelectElement).value;
    const book = {
        name: name,
        author: author,
        description: description,
        category: parseInt(category)
    }
    fetch("/api/book/create",
        {
             method: "POST",
            headers: {
                 "Content-Type": "application/json",
            },
             body: JSON.stringify(book)
        }).then((result) => { GetBooks(); })
}

function Update(bookId) {
    let name: string = (document.getElementById("name"+bookId) as HTMLInputElement).value;
    let author: string = (document.getElementById("author" + bookId) as HTMLInputElement).value;
    let description: string = (document.getElementById("description" + bookId) as HTMLInputElement).value;
    let category: string = (document.getElementById("category" + bookId) as HTMLSelectElement).value;
    const book = {
        name: name,
        author: author,
        description: description,
        category: parseInt(category)
    }
    fetch(`/api/book/${bookId}/update`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(book)
        }).then((result) => { GetBooks(); })
    console.log(book);
}

function GetBooks() {
    fetch("/api/book/all",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((result) => {
            console.log("fetched all");
            result.json().then(data => {
                GenerateBookList(data);
            });
        })
}

function GenerateBookList(books: any[]) {
    let bookNodes = "<table><th>Books :</th>";
    books.forEach(book => {
        bookNodes = bookNodes + GenerateBookNode(book);
    });
    bookNodes = bookNodes + "</table>";
    document.getElementById("book-list").innerHTML = bookNodes;
    UpdateSelected(books);
}

function GenerateBookNode(book: any) {
    return `
        <tr>
            <td>
                <input id="name${book.id}" type="text" name="name" value="${book.name}"/>
            </td>
            <td>
               <input id="author${book.id}" type="text" name="author" value="${book.author}"/>
            </td>
            <td>
                <input id="description${book.id}" type="text" name="description" value="${book.description}"/>
            </td>
            <td>
                <select id="category${book.id}">
                    <option value=0>Thriller</option>
                    <option value=1>History</option>
                    <option value=2>Drama</option>
                    <option value=3>Biography</option>
                </select>
            </td>
            <td>
                 <button type="button" class="btn btn-primary btn-md" onclick="Update(${book.id})">
                   Update book
                </button>
            </td>
        </tr>
    `
}

function UpdateSelected(books: any[]) {
    books.forEach(book => {
        let category = (document.getElementById("category" + book.id) as HTMLSelectElement);
        category.selectedIndex = book.category;
    });
}

GetBooks();