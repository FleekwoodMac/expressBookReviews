const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


//Task 6 Register a new user
public_users.post("/register", (req,res) => {
 
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});

});


// Task 1 Get the book list available in the shop
public_users.get('/',function (req, res) {
  
  res.send(JSON.stringify({books},null,4));
 
});

// Task 10 Get the bookd available in the shop using async/promises
public_users.get('/books',function (req, res) {

  console.log("Received request for books");

  const booklist = new Promise((resolve, reject) => {
      resolve(res.send(JSON.stringify({books}, null, 4)));
    });

    booklist.then(() => {
      console.log("Sent books to client");
      // console.log(books);

    }).catch((error) => {
      console.error("Error sending books to client:", error);
      res.status(500).send("Error sending books to client");
    });

 
});


// Task 2 Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

  const isbn = req.params.isbn;
  res.send(books[isbn])
  

 });


// Task 11 Get book details based on ISBN using async/promises
public_users.get('/books/isbn/:isbn',function (req, res) {

  const isbn = req.params.isbn;
  console.log("Received request for book details based on isbn");

  const bookdetails = new Promise((resolve, reject) => {
    resolve(books[isbn]);
  });

    bookdetails.then((book) => {
      console.log("Sent book details to client");
      res.send(book);

    }).catch((error) => {
      console.error("Error sending book details to client:", error);
      res.status(500).send("Error retrieving book details");
    });

 
});


  
// Task 3 Get book details based on author
public_users.get('/author/:author',function (req, res) {
 
  const author = req.params.author;
  const filtered_authors = Object.values(books).filter(book => book.author === author);
  if (filtered_authors.length > 0) {
    res.send(filtered_authors);
  } else {
    res.status(404).send(`No books found by author '${author}'`);
  }

});


// Task 12 Get book details based on author using async/promises

public_users.get('/books/author/:author',function (req, res) {

  const author = req.params.author;
  console.log("Received request for book details based on author");

  const bookdetails = new Promise((resolve, reject) => {
  
    const filtered_authors = Object.values(books).filter(book => book.author === author);
    if (filtered_authors.length > 0) {
      resolve(filtered_authors);
    
    }
    else {
      reject(`No books found by author '${author}'`);
    }
  });

  bookdetails.then((filtered_authors) => {
      console.log("Sent book details to client");
      res.send(filtered_authors);

    }).catch((error) => {

      console.error("Error sending book details to client:", error);
      res.status(500).send("Error retrieving book details");
    });


});


// Task 4 Get all book details based on title
public_users.get('/title/:title',function (req, res) {
 
  const title = req.params.title;
  const filtered_titles = Object.values(books).filter(book => book.title === title);
  if (filtered_titles.length > 0) {
    res.send(filtered_titles);
  } else {
    res.status(404).send(`No books found with that title  '${title}'`);
  } 
 });


// Task 13 Get all books based on title using async/promises
public_users.get('/books/title/:title',function (req, res) {

  const title = req.params.title;
  console.log("Received request for book details based on title");

  const bookdetails = new Promise((resolve, reject) => {
  
    const filtered_titles = Object.values(books).filter(book => book.title === title);
    if (filtered_titles.length > 0) {
      resolve(filtered_titles);
    
    }
    else {
      reject(`No books found with that '${title}'`);
    }
  });

  bookdetails.then((filtered_titles) => {
      console.log("Sent book details to client");
      res.send(filtered_titles);

    }).catch((error) => {

      console.error("Error sending book details to client:", error);
      res.status(500).send("Error retrieving book details");
    });


});


//  Task 5 Get book review
public_users.get('/review/:isbn',function (req, res) {
  
  const isbn = req.params.isbn;
  if (books.hasOwnProperty(isbn)) {
    res.send(books[isbn].reviews);
  } else {
    res.status(404).send(`No book found with ISBN '${isbn}'`);
  
  }
 
});


module.exports.general = public_users;
