import React, { useEffect, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { addMember, modifyMember } from "../mockup/members-api";

export default function AddEditMember({ show, handleClose, member }) {
	const memberNameRef = useRef();
	const memberSurnameRef = useRef();
	const memberBirthdateRef = useRef();

	useEffect(() => {
		if (member && memberNameRef.current) memberNameRef.current.value = member.name;
		if (member && memberSurnameRef.current) memberSurnameRef.current.value = member.surname;
		if (member && memberBirthdateRef.current) memberBirthdateRef.current.value = member.birthdate;
	}, [show]);

	function handleAddEditMember(e) {
		e.preventDefault();
		if (!memberNameRef.current.checkValidity()) return memberNameRef.current.reportValidity();
		if (!memberSurnameRef.current.checkValidity()) return memberSurnameRef.current.reportValidity();
		if (!memberBirthdateRef.current.checkValidity()) return memberBirthdateRef.current.reportValidity();

		const newMember = {
			name: memberNameRef.current.value,
			surname: memberSurnameRef.current.value,
			birthdate: memberBirthdateRef.current.value,
		};
		let status;
		if (member) status = modifyMember({ id: member.id, ...newMember });
		else status = addMember(newMember);
		handleClose(status);
	}

	return (
		<Modal show={show} onHide={handleClose} backdrop="static">
			<Modal.Header closeButton>
				<Modal.Title>{member ? "Edit book" : "Add new book to the library"}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>Member Name</Form.Label>
						<Form.Control ref={memberNameRef} type="text" placeholder="Enter Name" required />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Member Surname</Form.Label>
						<Form.Control ref={memberSurnameRef} type="text" placeholder="Enter Surname" required />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Birthdate</Form.Label>
						<Form.Control ref={memberBirthdateRef} type="date" required />
					</Form.Group>

					<Form.Group className="d-flex justify-content-end gap-3">
						<Button variant="secondary" onClick={handleClose}>
							Cancel
						</Button>
						<Button variant="primary" type="submit" onClick={handleAddEditMember}>
							{member ? "Update" : "Add"}
						</Button>
					</Form.Group>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
