console.log("Hello World!\n==========\n");

class Book {
  constructor(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

class Library {
  constructor() {
    this.books = [
      new Book("Name of the Wind", "Patrick Rothfuss", true),
    ];
    this.renderLibrary();
  }

  addBook(title, author, read) {
    const newBook = new Book(title, author, read);
    this.books.push(newBook);
    this.renderLibrary();
  }

  searchBooks(query) {
    const lowerCaseQuery = query.toLowerCase();
    return this.books.filter((book) =>
      book.title.toLowerCase().includes(lowerCaseQuery) ||
      book.author.toLowerCase().includes(lowerCaseQuery)
    );
  }

  renderSearchResults(query) {
    const searchResults = this.searchBooks(query);
    this.renderLibrary(searchResults);
  }

  renderLibrary(books = this.books) {
    const tableBody = document.querySelector("#table tbody");
    tableBody.innerHTML = "";

    books.forEach((book) => {
      const row = document.createElement("tr");
      const titleCell = document.createElement("td");
      const authorCell = document.createElement("td");
      const readCell = document.createElement("td");

      titleCell.textContent = book.title;
      authorCell.textContent = book.author;
      readCell.innerHTML = `<input type="checkbox" name="read" ${
        book.read ? "checked" : ""
      } disabled/>`;

      row.appendChild(titleCell);
      row.appendChild(authorCell);
      row.appendChild(readCell);

      tableBody.appendChild(row);
    });
  }
}

const library = new Library();

// Event listener for the 'Add Book' button
document.getElementById("addBook").addEventListener("click", () => {
  // Show the input fields
  document.getElementById("titleInput").style.display = "block";
  document.getElementById("authorInput").style.display = "block";
  document.getElementById("readInput").style.display = "block";
  document.getElementById("submitButton").style.display = "block";
});

// Event listener for the 'Submit' button
document.getElementById("submitButton").addEventListener("click", () => {
  const titleInput = document.getElementById("titleInput").value;
  const authorInput = document.getElementById("authorInput").value;
  const readCheckbox = document.getElementById("readInput").checked;

  // Hide the input fields after submitting
  document.getElementById("titleInput").style.display = "none";
  document.getElementById("authorInput").style.display = "none";
  document.getElementById("readInput").style.display = "none";
  document.getElementById("submitButton").style.display = "none";

  library.addBook(titleInput, authorInput, readCheckbox);
});

// Event listener for the 'Search' button
document.getElementById("searchButton").addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput").value;
  library.renderSearchResults(searchInput);
});
