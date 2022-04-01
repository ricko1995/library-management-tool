import React from "react";
import { Card, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function BookItem({ book, onBookEditClick, onBookSelectClick }) {
	return (
		<Col className="d-flex justify-content-start">
			<Card style={{ width: "18rem" }} className={book.selected ? "bg-light shadow" : ""}>
				<Card.Header className="d-flex align-items-center">
					<Form.Check
						disabled={book.totalBooks - book.rentedBooks < 1}
						id={book.id}
						type="checkbox"
						checked={book.selected}
						onChange={() => onBookSelectClick(book.id)}
					/>
					<Form.Label htmlFor={book.id} className="ms-2 flex-grow-1">
						<strong className="d-inline-block text-truncate" style={{ maxWidth: "13rem" }}>
							{book.author}
							<br />
							<span className="d-inline-block text-truncate">{book.title}</span>
						</strong>
					</Form.Label>
					<Button className="sm btn-light bg-transparent border-0 p-0" onClick={() => onBookEditClick(book.id)}>
						<FontAwesomeIcon className="p-0 me-3" icon={faEdit} />
					</Button>
				</Card.Header>
				<Card.Body className="d-flex flex-column">
					<Card.Text className="d-flex justify-content-between">
						Total books in the library: <span>{book.totalBooks}</span>
					</Card.Text>
					<Card.Text className="d-flex justify-content-between">
						Available books: <span>{book.totalBooks - book.rentedBooks}</span>
					</Card.Text>
					<Card.Text className="d-flex justify-content-between">
						Rented books: <span>{book.rentedBooks}</span>
					</Card.Text>
				</Card.Body>
			</Card>
		</Col>
	);
}
