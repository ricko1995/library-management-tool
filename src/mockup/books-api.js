import { v4 as uuidv4 } from "uuid";
import { getTotalBooksRented } from "./members-api";

export function getAllBooks() {
	return books;
}

export function getBookById(id) {
	return books.find(book => book.id === id);
}

export function addBook(bookForAdd) {
	const status = { type: "ADD", success: true, message: "", booksSuccessed: [], booksFailed: [] };
	const existing = books.find(
		b => b.title.toLowerCase() === bookForAdd.title.toLowerCase() && b.author.toLowerCase() === bookForAdd.author.toLowerCase()
	);
	if (existing) {
		existing.totalBooks += bookForAdd.totalBooks;
		status.message = "Successfully added existing book";
		status.booksSuccessed.push({ book: existing, message: "Successfully added existing book" });
		return status;
	}
	if (bookForAdd.author !== undefined && bookForAdd.title !== undefined && bookForAdd.totalBooks > 0) {
		books.push({ id: uuidv4(), ...bookForAdd, label: `${bookForAdd.title} - ${bookForAdd.author}` });
		status.message = "Successfully added new book";
		status.booksSuccessed.push({ book: bookForAdd, message: "Successfully added new book" });
		return status;
	}
	status.success = false;
	status.message = "Wrong input data";
	status.booksFailed.push({ book: bookForAdd, message: "Some of the input data was invalid" });
	return status;
}

export function modifyBook(bookForModify) {
	const status = { type: "MODIFY", success: true, message: "", booksSuccessed: [], booksFailed: [] };
	const modifying = books.find(b => b.id === bookForModify.id);
	if (modifying) {
		if (bookForModify.totalBooks < getTotalBooksRented(modifying)) {
			status.success = false;
			status.message = "Total number of books can't be less than current rented books";
			status.booksFailed.push({ book: modifying, message: "All of the books are already rented" });
			return status;
		}
		modifying.author = bookForModify.author;
		modifying.title = bookForModify.title;
		modifying.totalBooks = bookForModify.totalBooks;
		modifying.label = `${bookForModify.title} - ${bookForModify.author}`;
		status.message = "Book successfully modified";
		status.booksSuccessed.push({ book: modifying, message: "Book successfully modified" });
		return status;
	}
	status.success = false;
	status.message = "Book Not Found";
	status.booksFailed.push({ book: bookForModify, message: "Unknown error book was not found" });
	return status;
}

// export function removeBook(bookForRemove) {
// 	const status = { type: "REMOVE", success: true, message: "" };
// 	const index = books.findIndex(b => b.id === bookForRemove.id);
// 	if (index !== -1) {
// 		books.splice(index, 1);
// 		status.message = "Book successfully removed from library";
// 		return status;
// 	}
// 	status.success = false;
// 	status.message = "Book Not Found";
// 	return status;
// }

const books = [
	{
		id: "a6d80d52-9028-4975-89a6-6f4fce07e86b",
		title: "Termodinamika 1",
		author: "Antun Galović",
		totalBooks: 3,
		label: "Termodinamika 1 - Antun Galović",
	},
	{
		id: "f1d83852-9028-4975-89a6-6f4fce07ecde",
		title: "Termodinamika 2",
		author: "Antun Galović",
		totalBooks: 3,
		label: "Termodinamika 2 - Antun Galović",
	},
	{
		id: "84a4e09d-434e-4bce-a8ab-f620a5cda814",
		title: "Elementi strojeva",
		author: "Karl-Heinz Decker",
		totalBooks: 10,
		label: "Elementi strojeva - Karl-Heinz Decker",
	},
	{
		id: "a9810bcf-badd-4f31-bd12-31d174c7541f",
		title: "Tehnička mehanika",
		author: "Vladimir Špiranec",
		totalBooks: 10,
		label: "Tehnička mehanika - Vladimir Špiranec",
	},
	{
		id: "d5d8c6af-c58f-4b37-b252-ccac83ba8441",
		title: "Strojarski priručnik",
		author: "Bojan Kraut",
		totalBooks: 10,
		label: "Strojarski priručnik - Bojan Kraut",
	},
	{
		id: "2de8e6d4-0fa4-4334-94f5-bc369a71d970",
		title: "Tehničko crtanje",
		author: "Milan Žunar",
		totalBooks: 10,
		label: "Tehničko crtanje - Milan Žunar",
	},
	{
		id: "94c3c83a-ade4-4016-830c-bab78999a2ef",
		title: "Upravljanje i regulacija",
		author: "Gojko Nikolić",
		totalBooks: 10,
		label: "Upravljanje i regulacija - Gojko Nikolić",
	},
	{
		id: "cfddefae-a925-43e1-b3ac-db244966939f",
		title: "Finomehanika",
		author: "Anđelka Ređep",
		totalBooks: 10,
		label: "Finomehanika - Anđelka Ređep",
	},
];
