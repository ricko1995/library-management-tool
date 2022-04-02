import React, { useState } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ListGroup, Collapse, Form } from "react-bootstrap";

export default function MemberItem({ member, onMemberEditClick, onRentedBookSelectClick, variant }) {
	const [open, setOpen] = useState(false);
	return (
		<ListGroup.Item variant={variant} className="d-flex flex-column">
			<div className="d-flex gap-3 align-items-center">
				<Button className="sm btn-light bg-transparent border-0 p-0" onClick={() => onMemberEditClick(member)}>
					<FontAwesomeIcon icon={faEdit} />
				</Button>
				<strong>{member.label}</strong>
				<Button variant="secondary" className="ms-auto" onClick={() => setOpen(!open)}>
					{open ? "Hide rented books" : "Show rented books"}
				</Button>
			</div>
			<Collapse in={open}>
				<div className="px-5 pt-1">
					{member.rentedBooks.length > 0
						? member.rentedBooks.map(book => (
								<ListGroup.Item
									variant={variant}
									action
									key={member.id + book.id}
									className="d-flex align-items-center p-0 border-0 rounded-2"
								>
									<Form.Check
										id={member.id + book.id}
										type="checkbox"
										checked={book.selected}
										onChange={() => onRentedBookSelectClick(member.id, book.id)}
										className="p-2"
									/>
									<Form.Label className="flex-grow-1 p-2 m-0" htmlFor={member.id + book.id}>
										{book.label}
									</Form.Label>
								</ListGroup.Item>
						  ))
						: "This member doesn't have any rented books"}
				</div>
			</Collapse>
		</ListGroup.Item>
	);
}
