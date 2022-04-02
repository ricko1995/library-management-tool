import React from "react";
import { Card, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

export default function BookItem({ book, onBookEditClick, onBookSelectClick }) {
	return (
		<Col className="d-flex justify-content-start">
			<Card style={{ width: "19rem" }} className={book.selected ? "bg-light shadow" : ""}>
				<Card.Header className="d-flex align-items-center">
					<Form.Check
						disabled={book.totalBooks - book.rentedBooks < 1}
						id={book.id}
						type="checkbox"
						checked={book.selected}
						onChange={() => onBookSelectClick(book.id)}
					/>
					<Form.Label htmlFor={book.id} className="m-0 flex-grow-1">
						<strong style={{ maxWidth: "13rem" }}>
							<span className="ps-2 d-inline-block text-truncate" style={{ maxWidth: "25ch" }}>
								{book.author}
							</span>
							<br />
							<span className="ps-2 d-inline-block text-truncate" style={{ maxWidth: "25ch" }}>
								{book.title}
							</span>
						</strong>
					</Form.Label>
					<Button className="sm btn-light bg-transparent border-0 p-0" onClick={() => onBookEditClick(book)}>
						<FontAwesomeIcon icon={faEdit} />
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
