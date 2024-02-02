const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    const libraryContainer = document.getElementById('library-container');
    libraryContainer.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', index);

        const titleElem = document.createElement('p');
        titleElem.textContent = `Title: ${book.title}`;
        bookCard.appendChild(titleElem);

        const authorElem = document.createElement('p');
        authorElem.textContent = `Author: ${book.author}`;
        bookCard.appendChild(authorElem);

        const pagesElem = document.createElement('p');
        pagesElem.textContent = `Pages: ${book.pages}`;
        bookCard.appendChild(pagesElem);

        const readStatusElem = document.createElement('p');
        readStatusElem.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;
        bookCard.appendChild(readStatusElem);

        const toggleReadButton = document.createElement('button');
        toggleReadButton.textContent = 'Toggle Read Status';
        toggleReadButton.classList.add('toggle-read-button');
        toggleReadButton.addEventListener('click', () => toggleReadStatus(index));
        bookCard.appendChild(toggleReadButton);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => removeBook(index));
        bookCard.appendChild(removeButton);

        libraryContainer.appendChild(bookCard);
    });
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
}

function toggleForm() {
    const form = document.getElementById('book-form');
    form.classList.toggle('hidden');
}

function handleSubmitForm(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    displayBooks();

    // Reset form fields
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;

    toggleForm(); // Hide the form after submission
}

const newBookButton = document.getElementById('new-book-button');
newBookButton.addEventListener('click', toggleForm);

const form = document.getElementById('book-form');
form.addEventListener('submit', handleSubmitForm);

// Manually adding a few books to the array for testing
const book1 = new Book('Redemption', 'David Mulwa', 75, false);
const book2 = new Book('The Cruel Burden', 'Okoth Gonza', 95, true);

addBookToLibrary(book1);
addBookToLibrary(book2);

// Display books on the page
displayBooks();