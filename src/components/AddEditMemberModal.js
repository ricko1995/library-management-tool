import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function AddEditMember({ show, handleClose, member }) {
	function handleAddEditMember() {
		const status = { success: false, message: "Gooddsgdfgdfgdfgd" };
		handleClose(status);
	}

	return (
		<Modal show={show} onHide={handleClose} backdrop="static">
			<Modal.Header closeButton>
				<Modal.Title>{member ? "Edit member" : "Add new member"}</Modal.Title>
			</Modal.Header>
			<Modal.Body>I will not close if you click outside me. Don't even try to press escape key.</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cancel
				</Button>
				<Button onClick={handleAddEditMember}>{member ? "Update" : "Add"}</Button>
			</Modal.Footer>
		</Modal>
	);
}
