// Create array to store books

const myLibrary = [{
    title: "My Book",
    author: "Rick",
},
{
    title: "Game of Thrones",
    author: "Martin",
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

function displayLibrary(library){
    for (let book of library) {
        console.log(Object.keys(book));
    }
}

displayLibrary(myLibrary);
