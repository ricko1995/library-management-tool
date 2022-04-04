import React, { useEffect, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addBook, modifyBook } from "../mockup/books-api";

export default function AddEditBookModal({ show, handleClose, book }) {
	const bookTitleRef = useRef();
	const bookAuthorRef = useRef();
	const bookNumberRef = useRef();

	useEffect(() => {
		if (book && bookTitleRef.current) bookTitleRef.current.value = book.title;
		if (book && bookAuthorRef.current) bookAuthorRef.current.value = book.author;
		if (book && bookNumberRef.current) bookNumberRef.current.value = book.totalBooks;
	}, [show]);

	function handleAddEditBook(e) {
		e.preventDefault();
		if (!bookTitleRef.current.checkValidity()) return bookTitleRef.current.reportValidity();
		if (!bookAuthorRef.current.checkValidity()) return bookAuthorRef.current.reportValidity();
		if (!bookNumberRef.current.checkValidity()) return bookNumberRef.current.reportValidity();

		const newBook = {
			title: bookTitleRef.current.value,
			author: bookAuthorRef.current.value,
			totalBooks: parseInt(bookNumberRef.current.value),
		};
		let status;
		if (book) status = modifyBook({ id: book.id, ...newBook });
		else status = addBook(newBook);
		handleClose(status);
	}

	return (
		<Modal show={show} onHide={handleClose} backdrop="static">
			<Modal.Header closeButton>
				<Modal.Title>{book ? "Edit book" : "Add new book to the library"}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>Book Title</Form.Label>
						<Form.Control ref={bookTitleRef} type="text" placeholder="Enter Title" required />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Book Author</Form.Label>
						<Form.Control ref={bookAuthorRef} type="text" placeholder="Enter Author" required />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Number of books</Form.Label>
						<Form.Control ref={bookNumberRef} type="number" min="1" defaultValue="1" required />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Text className="text-muted">
							{book ? "" : "You can enter an existing book title and author to increase total amount of books in library."}
						</Form.Text>
					</Form.Group>

					<Form.Group className="d-flex justify-content-end gap-3">
						<Button variant="secondary" onClick={handleClose}>
							Cancel
						</Button>
						<Button variant="primary" type="submit" onClick={handleAddEditBook}>
							{book ? "Update" : "Add"}
						</Button>
					</Form.Group>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
