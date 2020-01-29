let myLibrary = JSON.parse(window.localStorage.getItem("libraryStorage"));
if (!myLibrary) myLibrary = [];

function Book(title, author, numPages) {
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = false;
}

function addBookToLibrary() {
  let title = document.getElementById("booktitle").value;
  let author = document.getElementById("author").value;
  let numPages = document.getElementById("pages").value;
  let newBook = new Book(title, author, numPages);

  if (title === "" || author === "" || numPages <= 0 || numPages === "") {
    showError();
    return;
  }

  myLibrary.push(newBook);
  updateLocalStorage(myLibrary);
  render();
}

function renderBook(books, i, myLibrary) {
  let row = books.insertRow(0);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);
  cell1.innerHTML = myLibrary[i].title;
  cell2.innerHTML = myLibrary[i].author;
  cell3.innerHTML = myLibrary[i].numPages;
  cell4.innerHTML = `<button class='readButton' data-index= ${i}>Unread</button>`;
  cell5.innerHTML = `<button class='deleteButton' data-index= ${i}>Delete</button>`;
}

function render() {
  const books = document.getElementById("books");
  books.innerHTML = "";
  for (let i = myLibrary.length - 1; i >= 0; i--) {
    renderBook(books, i, myLibrary);
  }
  let buttons = document.querySelectorAll(".readButton");
  buttons.forEach(buttonElement =>
    buttonElement.addEventListener("click", updateReadStatus)
  );
  let deletebuttons = document.querySelectorAll(".deleteButton");
  deletebuttons.forEach(deleteElement =>
    deleteElement.addEventListener("click", deleteBook)
  );
}

render();

let addNewBook = document.getElementById("newBookButton");
addNewBook.addEventListener("click", addBookToLibrary);

function updateReadStatus(event) {
  let button = event.target;
  let index = button.getAttribute("data-index");

  myLibrary[index].read = !myLibrary[index].read;
  if (myLibrary[index].read) {
    button.innerHTML = "Already Read";
  } else {
    button.innerHTML = "Unread";
  }
  updateLocalStorage(myLibrary);
}

function deleteBook(deletebook) {
  let button = deletebook.target;
  let index = button.getAttribute("data-index");
  alert("Are you sure you want to delete this book?");
  myLibrary.splice(index, 1);
  updateLocalStorage(myLibrary);
  render();
}

function validateForm() {
  let x = document.forms["formSection"]["title"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
  let y = document.forms["formSection"]["author"].value;
  if (y == "") {
    alert("author must be filled out");
    return false;
  }
}

function updateLocalStorage(array) {
  window.localStorage.setItem("libraryStorage", JSON.stringify(array));
}
