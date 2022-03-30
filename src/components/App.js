import React, { useState } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import { addBook, getBooks, modifyBook, rentBooks, returnBooks } from "../mockup/books-api";
import BookList from "./BookList";
import Controls from "./Controls";
import SearchBar from "./SearchBar";

function App() {
	const [books, setBooks] = useState(getBooks());

	function handleBookSearch(value) {
		setBooks(getBooks(value));
	}

	function newBook() {
		addBook({ title: "New Book", author: "John", totalBooks: 3 });
		setBooks([...getBooks()]);
	}
	function modBook() {
		const s = modifyBook({ id: "a6d80d52-9028-4975-89a6-6f4fce07e86b", title: "Uvod U", author: "John" });
		console.log(s);
		setBooks([...getBooks()]);
	}
	function rentingBook() {
		const s = rentBooks([{ id: "a6d80d52-9028-4975-89a6-6f4fce07e86b" }]);
		console.log(s);
		setBooks([...getBooks()]);
	}
	function returningBook() {
		const s = returnBooks([{ id: "a6d80d52-9028-4975-89a6-6f4fce07e86b" }]);
		console.log(s);
		setBooks([...getBooks()]);
	}
	function handleMemberSearch(value) {
		console.log(value);
	}
	return (
		<Container className="d-flex flex-column">
			<div className="d-flex align-items-center">
				<img className="me-5" src="logo192.png" height="100" alt="logo" />
				<h1>Best Library Management in the World</h1>
				<Controls newBook={newBook} modifyBook={modBook} rentBook={rentingBook} returnBook={returningBook} />
			</div>
			<Tabs defaultActiveKey="books" className="mb-3">
				<Tab eventKey="books" title="All Books">
					<SearchBar title="Find Book" handleSearch={handleBookSearch} />
					<BookList books={books} />
				</Tab>
				<Tab eventKey="rented-books" title="Rented Books">
					<SearchBar title="Search" handleSearch={handleMemberSearch} />
				</Tab>
				<Tab eventKey="members" title="Members">
					<SearchBar title="Find Member" handleSearch={handleMemberSearch} />
				</Tab>
			</Tabs>
		</Container>
	);
}

export default App;
