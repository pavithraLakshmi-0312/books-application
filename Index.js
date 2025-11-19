const express = require("express");
const books = require("./books.js");
let app = express();

// ---------------- Task 10 ----------------
// Get all books using callback + Promise
app.get("/books", function (req, res) {
    let getBooks = new Promise((resolve, reject) => {
        resolve(books);
    });

    getBooks
        .then((data) => {
            res.send(JSON.stringify(data, null, 4));
        })
        .catch((err) => {
            res.send("Error fetching books");
        });
});

// ---------------- Task 11 ----------------
// Get book by ISBN using Promise
app.get("/books/isbn/:isbn", function (req, res) {
    let isbn = req.params.isbn;

    let getBookByIsbn = new Promise((resolve, reject) => {
        let book = books[isbn];
        if (book) resolve(book);
        else reject("Book not found");
    });

    getBookByIsbn
        .then((book) => res.send(JSON.stringify(book, null, 4)))
        .catch((err) => res.send(err));
});

// ---------------- Task 12 ----------------
// Get books by Author using Promise
app.get("/books/author/:author", function (req, res) {
    let author = req.params.author;
    let booksByAuthor = [];

    let findAuthor = new Promise((resolve, reject) => {
        for (let isbn in books) {
            if (books[isbn].author === author) {
                booksByAuthor.push(books[isbn]);
            }
        }

        if (booksByAuthor.length > 0) resolve(booksByAuthor);
        else reject("No books found for this author");
    });

    findAuthor
        .then((data) => res.send(JSON.stringify(data, null, 4)))
        .catch((err) => res.send(err));
});

// ---------------- Task 13 ----------------
// Get books by Title using Promise
app.get("/books/title/:title", function (req, res) {
    let title = req.params.title;
    let booksByTitle = [];

    let findTitle = new Promise((resolve, reject) => {
        for (let isbn in books) {
            if (books[isbn].title === title) {
                booksByTitle.push(books[isbn]);
            }
        }

        if (booksByTitle.length > 0) resolve(booksByTitle);
        else reject("No books found with this title");
    });

    findTitle
        .then((data) => res.send(JSON.stringify(data, null, 4)))
        .catch((err) => res.send(err));
});

// ---------------- Start Server ----------------
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
