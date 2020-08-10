const createBook = document.querySelector('.create-book');
const booksContainer = document.querySelector('.books-container');

const baseURL = 'http://localhost:7000';
const booksURL = `${baseURL}/books`;

fetch(booksURL)
  .then(response => response.json())
  .then(showBooks);

createBook.addEventListener('submit', addBook);

function addBook(event) {
  event.preventDefault();

  const createBookFormData = new FormData(event.target);
  const title = createBookFormData.get('title');
  const rating = createBookFormData.get('rating');

  const book = { title, rating };

  // displayBook(book);
  persistBook(book);

}

function showBooks(books) {
  books.forEach(displayBook);
}

function displayBook(book) {
  booksContainer.innerHTML += `
    <div class="book-card">
      <h2>title: ${book.title}</h2>
      <p>rating: ${book.rating}</p>
    </div>
  `
}

function persistBook(book) {
  fetch(booksURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book)
  })
    .then(response => response.json())
    // .then(book => displayBook(book));
    .then(displayBook);
}