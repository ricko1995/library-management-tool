import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function AddEditBook({ show, handleClose, book }) {
	function handleAddEditBook() {
		const status = { success: true, message: "Good" };
		handleClose(status);
	}
	return (
		<Modal show={show} onHide={handleClose} backdrop="static">
			<Modal.Header closeButton>
				<Modal.Title>{book ? "Edit book" : "Add new book"}</Modal.Title>
			</Modal.Header>
			<Modal.Body>I will not close if you click outside me. Don't even try to press escape key.</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cancel
				</Button>
				<Button onClick={handleAddEditBook}>{book ? "Update" : "Add"}</Button>
			</Modal.Footer>
		</Modal>
	);
}
