import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { getAllMembers } from "../mockup/members-api";

export default function RentModal({ show, handleClose, handleRentConfirm, books }) {
	const [selectedMember, setSelectedMember] = useState([]);
	const [rentBtnDisabled, setRendBtnDisabled] = useState(true);
	const [members, setMembers] = useState(getAllMembers());

	function onFormSubmit(e) {
		e.preventDefault();
		handleRentConfirm(selectedMember[0]);
	}

	useEffect(() => {
		if (selectedMember.length > 0) setRendBtnDisabled(false);
		else setRendBtnDisabled(true);
	}, [selectedMember]);

	useEffect(() => {
		setSelectedMember([]);
		setMembers(getAllMembers());
	}, [show]);

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Rent Selected Book(s)</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label htmlFor="member-lis">Select member:</Form.Label>
						<Typeahead
							id="select-member"
							options={members}
							required
							placeholder="Select member"
							onChange={setSelectedMember}
							selected={selectedMember}
						/>
					</Form.Group>
					<Form.Group className="d-flex flex-column mx-5 mb-3">
						{books.map((book, i) => (
							<Form.Text key={book.id} className="d-flex align-items-center gap-2">
								{i + 1}. {book.title} - {book.author}
							</Form.Text>
						))}
					</Form.Group>
					<Form.Group className="d-flex justify-content-end gap-3">
						<Button className="btn btn-secondary" onClick={handleClose}>
							Cancel
						</Button>
						<Button type="submit" onClick={onFormSubmit} disabled={rentBtnDisabled}>
							Rent
						</Button>
					</Form.Group>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
