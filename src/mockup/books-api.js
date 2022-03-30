import { v4 as uuidv4 } from "uuid";

export function getBooks(searchValue = "") {
	return books.filter(book => book.author.toLocaleLowerCase().includes(searchValue) || book.title.toLocaleLowerCase().includes(searchValue));
}
export function getAllBooks() {
	return books;
}

export function getBookById(id) {
	return books.find(book => book.id === id);
}

export function addBook(book) {
	const addStatus = { success: true, reason: "" };
	const existing = books.find(b => b.title === book.title && b.author === book.author);
	if (existing) {
		existing.totalBooks += book.totalBooks;
		addStatus.reason = "Successfully added existing book";
		return addStatus;
	}
	if (book.author !== undefined && book.title !== undefined && book.totalBooks > 0) {
		books.push({ id: uuidv4(), ...book, rentedBooks: 0 });
		addStatus.reason = "Successfully added new book";
		return addStatus;
	}
	addStatus.success = false;
	addStatus.reason = "Wrong input data";
	return addStatus;
}

export function modifyBook(book) {
	const modifyStatus = { success: true, reason: "" };
	const modifying = books.find(b => b.id === book.id);
	if (modifying) {
		modifying.author = book.author;
		modifying.title = book.title;
		modifyStatus.reason = "Book successfully modified";
		return modifyStatus;
	}
	modifyStatus.success = false;
	modifyStatus.reason = "Book Not Found";
	return modifyStatus;
}

export function removeBook(book) {
	const removeStatus = { success: true, reason: "" };
	const index = books.findIndex(b => b.title === book.id);
	if (index !== -1) {
		books.splice(index, 1);
		removeStatus.reason = "Book successfully removed from library";
		return removeStatus;
	}
	removeStatus.success = false;
	removeStatus.reason = "Book Not Found";
	return removeStatus;
}

export function rentBooks(booksForRent) {
	const rentStatus = { success: true, rented: [], failedToRent: [] };
	booksForRent.forEach(book => {
		const renting = books.find(b => b.id === book.id);
		if (!renting) rentStatus.failedToRent.push({ ...book, reason: "Book Not Found" });
		else {
			renting.rentedBooks++;
			if (renting.rentedBooks > renting.totalBooks) {
				renting.rentedBooks--;
				rentStatus.success = false;
				rentStatus.failedToRent.push({ ...book, reason: "No Available Books" });
			} else rentStatus.rented.push({ ...book, reason: "Book successfully rented" });
		}
	});
	return rentStatus;
}

export function returnBooks(booksForReturn) {
	const returnStatus = { success: true, returned: [], failedToReturn: [] };
	booksForReturn.forEach(book => {
		const returning = books.find(b => b.id === book.id);
		if (!returning) returnStatus.failedToReturn.push({ ...book, reason: "Book Not Found" });
		else {
			returning.rentedBooks--;
			if (returning.rentedBooks < 0) {
				returning.rentedBooks++;
				returnStatus.success = false;
				returnStatus.failedToReturn.push({ ...book, reason: "All books already at returned" });
			} else returnStatus.returned.push({ ...book, reason: "Book successfully returned" });
		}
	});
	return returnStatus;
}

const books = [
	{
		id: "a6d80d52-9028-4975-89a6-6f4fce07e86b",
		title: "Termodinamika 1",
		author: "Antun Galović",
		totalBooks: 3,
		rentedBooks: 1,
	},
	{
		id: "84a4e09d-434e-4bce-a8ab-f620a5cda814",
		title: "Elementi strojeva",
		author: "Karl-Heinz Decker",
		totalBooks: 10,
		rentedBooks: 3,
	},
	{
		id: "a9810bcf-badd-4f31-bd12-31d174c7541f",
		title: "Tehnička mehanika",
		author: "Vladimir Špiranec",
		totalBooks: 10,
		rentedBooks: 3,
	},
	{
		id: "d5d8c6af-c58f-4b37-b252-ccac83ba8441",
		title: "Strojarski priručnik",
		author: "Bojan Kraut",
		totalBooks: 10,
		rentedBooks: 3,
	},
	{
		id: "2de8e6d4-0fa4-4334-94f5-bc369a71d970",
		title: "Tehničko crtanje",
		author: "Milan Žunar",
		totalBooks: 10,
		rentedBooks: 3,
	},
	{
		id: "94c3c83a-ade4-4016-830c-bab78999a2ef",
		title: "Upravljanje i regulacija",
		author: "Gojko Nikolić",
		totalBooks: 10,
		rentedBooks: 3,
	},
	{
		id: "cfddefae-a925-43e1-b3ac-db244966939f",
		title: "Finomehanika",
		author: "Anđelka Ređep",
		totalBooks: 10,
		rentedBooks: 3,
	},
];
