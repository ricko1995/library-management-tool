import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function parseMembers(members) {
	return members.reduce((arr, member) => {
		const selectedBooks = member.rentedBooks.filter(book => book.selected);
		if (selectedBooks.length > 0) arr.push({ label: member.label, selectedBooks });
		return arr;
	}, []);
}

export default function ReturnBooksModal({ show, handleClose, onReturnBooksConfirm, allMembers }) {
	const [parsedMembers, setParsedMembers] = useState(parseMembers(allMembers));

	useEffect(() => {
		setParsedMembers(parseMembers(allMembers));
	}, [show]);

	function onConfirm() {
		handleClose();
		onReturnBooksConfirm();
	}

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Are you sure you want to return following book(s)?</Modal.Title>
			</Modal.Header>
			<Modal.Body className="d-flex flex-column gap-3">
				{parsedMembers.map(member => (
					<Form.Group key={member.label} className="d-flex flex-column gap-3">
						<strong>{member.label}</strong>
						{member.selectedBooks.map(book => (
							<Form.Group key={book.id} className="d-flex gap-3 mx-4 align-items-center">
								<Form.Text>{book.label}</Form.Text>
							</Form.Group>
						))}
					</Form.Group>
				))}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cancel
				</Button>
				<Button onClick={onConfirm}>Confirm</Button>
			</Modal.Footer>
		</Modal>
	);
}
