# Introduction

[Library Management Tool](https://ricko.us.to/andrija/LMT) is a simple React app created with the purpose of a job interview at Microblink. The app consists of a simple UI for managing books and members of the library, renting, and returning books in the library.

# Functionality

## Adding new and editing existing books in the library:

### Adding:

Clicking on the button New Book button opens the Modal with fields required for creating a new book. Entering the required data and clicking the button Add, a new book will be created.

![Add Book gif](https://github.com/ricko1995/library-management-tool/blob/master/public/screenshots/AddBook.gif?raw=true)

### Editing:

Clicking on the Edit button on the book card opens the same Modal filed with book info. After editing and clicking the Update button, modifications will be saved.

![Modify Book gif](https://github.com/ricko1995/library-management-tool/blob/master/public/screenshots/ModifyBook.gif?raw=true)

## Adding new and editing existing members in the library:

### Adding:

Clicking on the button New Member button opens the Modal with fields required for creating a new library member. Entering the required data and clicking the button Add, a new member will be added to the library.

![Add Member gif](https://github.com/ricko1995/library-management-tool/blob/master/public/screenshots/AddMember.gif?raw=true)

### Editing:

Clicking on the Edit button on the member item opens the same Modal filed with member info. After editing and clicking the Update button, modifications will be saved.

![Modify Member gif](https://github.com/ricko1995/library-management-tool/blob/master/public/screenshots/ModifyMember.gif?raw=true)

## Searching books and members:

### Searching books:

Typing in the search field in the All books tab will filter all books that include search value in their title or author name.

![Find Book gif](https://github.com/ricko1995/library-management-tool/blob/master/public/screenshots/FindBook.gif?raw=true)

### Searching members:

Typing in the search field in the Members tab will filter all members that include search value in their name, surname or book title, and author name.

![Find Member gif](https://github.com/ricko1995/library-management-tool/blob/master/public/screenshots/FindMember.gif?raw=true)

## Renting and returning books in the library:

### Renting books:

After selecting one or more books the popup will appear that has a button for renting selected books. Clicking the Rent button opens the Modal with input that has a list of all the library members. After selecting the member and clicking Rent, selected books will be rented to that member.

![Rent Books gif](https://github.com/ricko1995/library-management-tool/blob/master/public/screenshots/RentBooks.gif?raw=true)

### Returning books:

In the Members tabs clicking on the Show Rented Books button will expand that item and show all the books rented by that member. After selecting one or more books the popup will appear that has a button for returning selected books. Clicking the Return button opens the Modal to confirm the book's return.

![Return Books gif](https://github.com/ricko1995/library-management-tool/blob/master/public/screenshots/ReturnBooks.gif?raw=true)
