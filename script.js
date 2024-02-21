// Create array to store books

const myLibrary = [];

// Create Book Constructor

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Create a couple of books to place into myLibrary

const dummyBook = new Book("Battle Cry of Freedom", "James McPherson", 862, true);
const dummyBook2 = new Book("The 48 Laws of Power", "Robert Greene", 430, false);

// We could declare methods in the constructor, but making them on the prototype increases efficiency. All objects that prototypically inherit from Book share this function
// which results in less memory usage.

Book.prototype.sayTitle = function() {
    console.log(`The name of this book is '${this.title}'`);
};

// Make the two objects in myLibrary inherit from Book by using Object.create()

myLibrary.push(dummyBook);
myLibrary.push(dummyBook2);

// Lists books within a table by appending each entry as a new 'tr' element with 'td' elements that contain the book's information.

function displayLibrary(library){
    // Iterate over the books of the array.
    for (let book of library) {
        // Begin row for new entry.
        const newRow = document.createElement("tr");
        // Traverse over each of the properties of a book and retreive their values.
        for (let property in book) {
            if (property == "sayTitle") {
                continue;
            }
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

// Add a way to display modal window.
const dialog = document.getElementById("dialogBox");

// Add event listner to Add Book button.
const addBookButton = document.getElementById("addBook");
addBookButton.addEventListener("click", () => {
    dialog.showModal();
})

// The submit button needs to retreive all of the values of the input fields of the form and use them to create a new Book object.
// The values of the input elements can be retreived by selecting the individual input elements by id through the HTMLInputElementAPI (document.getElementById('title') for example)

const diagForm = document.querySelector("form");

diagForm.addEventListener("submit", (e) => {
    addBookToLibrary(diagForm.querySelectorAll("input"));
    // Erase the input fields upon submission of form.
    diagForm.reset();
})

// Create function that allows user to add books to library

function addBookToLibrary(formData){
    // Takes information from form to build a new Book, then adds that to myLibrary array.
    // Delaring a variable to store an array of values for each input. Converting from a NodeList to an Array to gain access to map method.
    let inputValues = Array.from(formData).map((input) => input.value);
    const newBook = new Book(...inputValues);
    myLibrary.push(newBook);
    // Add new book to table. Start by creating a new row with a 'tr' element.
    const newRow = document.createElement("tr");
    // Traverse over each of the properties of a book and retreive their values.
    for (let property in newBook) {
        if (property == "sayTitle") {
            continue;
        }
        // Create cell that will contain a properties' value.
        const propValue = document.createElement("td");
        propValue.innerText = newBook[property];
        // Add cell to the row as a child of the 'tr' element.
        newRow.appendChild(propValue);
    }
    // Finally, add the entire row that contains all of the book's information to the table.
    books.appendChild(newRow);
    console.log(newBook);
}

// Add a way to close dialog box
const closeButton = document.getElementById("closeButton");
closeButton.addEventListener("click", (e) => {
    dialog.close();
})

// Invoke displayLibrary to draw out table of books.
displayLibrary(myLibrary);
