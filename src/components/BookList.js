import React, { useState } from "react";
import { Row, Button, Alert } from "react-bootstrap";
import BookItem from "./BookItem";
import RentModal from "./RentModal";

export default function BookList({ books, onBookEditClick, onBookSelectClick, onRentConfirmed }) {
	const [showRentModal, setShowRentModal] = useState(false);

	function handleRentConfirm(member) {
		setShowRentModal(false);
		onRentConfirmed(member);
	}
	return (
		<>
			<Row xs="auto" className="g-4">
				{books.map(book => (
					<BookItem key={book.id} book={book} onBookEditClick={onBookEditClick} onBookSelectClick={onBookSelectClick} />
				))}
			</Row>
			<Alert
				className="fixed-bottom m-3 d-flex align-items-center gap-4"
				style={{ width: "max-content", right: "0", left: "unset" }}
				show={books.filter(book => book.selected).length > 0}
			>
				<Alert.Heading>Rent selected book(s)</Alert.Heading>
				<Button onClick={() => setShowRentModal(true)}>Rent</Button>
			</Alert>
			<RentModal
				show={showRentModal}
				handleClose={() => setShowRentModal(false)}
				handleRentConfirm={handleRentConfirm}
				books={books.filter(book => book.selected)}
			/>
		</>
	);
}
