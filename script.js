// Create array to store books

const myLibrary = [{
    title: "My Book",
    author: "Rick",
    pages: 200,
    read: true,
},
{
    title: "Game of Thrones",
    author: "Martin",
    pages: 400,
    read: false,
}];

// Create Book Constructor

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Create function that allows user to add books to library

function addBookToLibrary(){
    // Takes information from form to build a new Book, then adds that to myLibrary array.
}

// Lists books within a table by appending each entry as a new 'tr' element with 'td' elements that contain the book's information.

function displayLibrary(library){
    // Iterate over the books of the array.
    for (let book of library) {
        // Begin row for new entry.
        const newRow = document.createElement("tr");
        // Traverse over each of the properties of a book and retreive their values.
        for (let property in book) {
            // Create cell that will contain a properties' value.
            const propValue = document.createElement("td");
            propValue.innerText = book[property];
            // Add cell to the row as a child of the 'tr' element.
            newRow.appendChild(propValue);
        }
        // Finally, add the entire row that contains all of the book's information to the table.
        books.appendChild(newRow);
    }   
}

// Select the table element.
const books = document.getElementById("bookList");

// Add way to display modal window.
const dialog = document.getElementById("dialogBox");

// Add event listner to Add Book button.
const addBookButton = document.getElementById("addBook");
addBookButton.addEventListener("click", () => {
    dialog.showModal();
})

// Button to close dialog.
const closeDialogButton = document.getElementById("closeDialog");
closeDialogButton.addEventListener("click", () => {
    dialog.close();
})
displayLibrary(myLibrary);
