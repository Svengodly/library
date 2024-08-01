// Create array to store books

const myLibrary = [];

// Create Book Constructor - Need to change this to a class for the lib-classes branch.

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// We could declare methods in the constructor, but making them on the prototype increases efficiency. All objects that prototypically inherit from Book share this function
// which results in less memory usage.

Book.prototype.changeRead = function() {
    // If the read property of the book is "Yes," set it to "No" and vice-versa.
    return this.read = this.read == "Yes" ? "No" : "Yes";
};

// Create a couple of books to place into myLibrary

const dummyBook = new Book("Battle Cry of Freedom", "James McPherson", 862, "No");
const dummyBook2 = new Book("The 48 Laws of Power", "Robert Greene", 430, "No");
const dummyBook3 = new Book("Data Science from Scratch", "Joel Grus", 376, "Yes");

// Select the table element.
const books = document.getElementById("bookList");

// Add a way to display modal window.
const dialog = document.getElementById("dialogBox");

// Add event listner to Add Book button.
const addBookButton = document.getElementById("addBook");
addBookButton.addEventListener("click", () => {
    dialog.showModal();
})

// Add a way to close dialog box
const closeButton = document.getElementById("closeButton");
closeButton.addEventListener("click", (e) => {
    dialog.close();
})


const diagForm = document.querySelector("form");

// Make the two objects in myLibrary inherit from Book by using Object.create()

myLibrary.push(dummyBook);
myLibrary.push(dummyBook2);
myLibrary.push(dummyBook3);

// The submit button needs to retreive all of the values of the input fields of the form and use them to create a new Book object.
// The values of the input elements can be retreived by selecting the individual input elements by id through the HTMLInputElementAPI (document.getElementById('title') for example)

diagForm.addEventListener("submit", (e) => {
    // Also, need to check the state of the checkbox. If it's checked, the value is 'Yes.'
    diagForm.elements['read'].value = diagForm.elements['read'].checked ? "Yes" : "No";
    addBookToLibrary(diagForm.querySelectorAll("input"));
    // Erase the input fields upon submission of form.
    diagForm.reset();
})

// Lists books within a table by appending each entry as a new 'tr' element with 'td' elements that contain the book's information.

function displayLibrary(library){
    // Iterate over the books of the array.
    for (let book of library) {
        // Begin row for new entry.
        const newRow = document.createElement("tr");
        // Traverse over each of the properties of a book and retrieve their values.
        for (let property in book) {
            if (property == "changeRead") {
                continue;
            }
            // Create cell that will contain a properties' value.
            const propValue = document.createElement("td");
            propValue.setAttribute("class", property);
            if (property != 'read'){
                propValue.innerText = book[property];
            }
            if (property == 'title') {
                propValue.appendChild(createDeleteButton(book));
            }
            if (property == 'read') {
                propValue.appendChild(createToggleButton(book));
            }
            // Add cell to the row as a child of the 'tr' element.
            newRow.appendChild(propValue);
        }
        // Finally, add the entire row that contains all of the book's information to the table.
        books.appendChild(newRow);
    }
}

// Function that creates delete button.

function createDeleteButton(book) {
    const bookButton = document.createElement("button");
    bookButton.setAttribute("type", "button");
    bookButton.setAttribute("class", "deleteButton");
    // Add click event listener to all deleteButtons. Write code that will remove object from myLibrary. Also need to delete row from the DOM tree and update indices.
    bookButton.addEventListener("click", () => {
        myLibrary.splice(`${myLibrary.indexOf(book)}`, 1);
        bookButton.parentElement.parentElement.remove();
    })
    bookButton.innerText = "Delete";
    return bookButton;
}

function createToggleButton(book) {
    const bookButton = document.createElement("button");
    bookButton.setAttribute("type", "button");
    bookButton.setAttribute("class", "toggleButton");
    // Add click event listener that toggles the read status.
    bookButton.addEventListener("click", () => {
        bookButton.innerText = book.changeRead();
    })
    bookButton.innerText = book.read;
    return bookButton;
}

// Create function that allows user to add books to library

function addBookToLibrary(formData){
    // Takes information from form to build a new Book, then adds that to myLibrary array.
    // Declaring a variable to store an array of values for each input. Converting from a NodeList to an Array to gain access to map method.

    let inputValues = Array.from(formData).map((input) => input.value);
    // Pass array elements in inputValues one by one using the spread operator (...).
    const newBook = new Book(...inputValues);
    myLibrary.push(newBook);
    // Add new book to table. Start by creating a new row with a 'tr' element.
    const newRow = document.createElement("tr");
    // Traverse over each of the properties of a book and retreive their values.
    for (let property in newBook) {
        if (property == "changeRead") {
            continue;
        }
        // Create cell that will contain a properties' value.
        const propValue = document.createElement("td");
        // Set class 'td' to that of the name of the property.
        propValue.setAttribute("class", property);
        if (property != 'read'){
            propValue.innerText = newBook[property];
        }
        if (property == 'title') {
            propValue.appendChild(createDeleteButton(newBook));
        }
        if (property == 'read') {
            propValue.appendChild(createToggleButton(newBook));
        }
        // Add cell to the row as a child of the 'tr' element.
        newRow.appendChild(propValue);
    }
    // newRow.appendChild(createToggleButton(newBook));
    // Finally, add the entire row that contains all of the book's information to the table.
    books.appendChild(newRow);
}

// Invoke displayLibrary to draw out table of books.
displayLibrary(myLibrary);
