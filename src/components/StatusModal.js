import React from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function StatusModal({ show, handleClose, status }) {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Action: {status.type}</Modal.Title>
			</Modal.Header>
			<Modal.Body className="d-flex flex-column gap-3">
				<Form.Group className="d-flex gap-3">
					<p>Message:</p>
					<strong>{status.message}</strong>
				</Form.Group>
				{status.booksSuccessed && status.booksSuccessed.length > 0 && (
					<Form.Group className="d-flex flex-column gap-3">
						<strong>Action successed for the following books:</strong>
						{status.booksSuccessed.map((info, i) => (
							<Form.Group key={i} className="d-flex gap-3 mx-4 align-items-center">
								<Form.Text>
									{info.book.title} - {info.book.author}
								</Form.Text>
								<Form.Text>
									<strong>{info.message}</strong>
								</Form.Text>
							</Form.Group>
						))}
					</Form.Group>
				)}
				{status.booksFailed && status.booksFailed.length > 0 && (
					<Form.Group className="d-flex flex-column gap-3">
						<strong>Action failed for the following books:</strong>
						{status.booksFailed.map((info, i) => (
							<Form.Group key={i} className="d-flex gap-3 mx-4 align-items-center">
								<Form.Text>
									{info.book.title} - {info.book.author}
								</Form.Text>
								<Form.Text>
									<strong>{info.message}</strong>
								</Form.Text>
							</Form.Group>
						))}
					</Form.Group>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={handleClose}>OK</Button>
			</Modal.Footer>
		</Modal>
	);
}
