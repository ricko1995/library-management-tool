import React, { useState } from "react";
import { ListGroup, Alert, Button } from "react-bootstrap";
import MemberItem from "./MemberItem";
import ReturnBooksModal from "./ReturnBooksModal";

export default function MemberList({ members, onMemberEditClick, onRentedBookSelectClick, deselectAllRentedBooks, onReturnBooksConfirm }) {
	const [showReturnModal, setShowReturnModal] = useState(false);
	return (
		<>
			<ListGroup style={{ marginBottom: "2.5rem" }}>
				{members.map((member, i) => (
					<MemberItem
						key={member.id}
						member={member}
						onMemberEditClick={onMemberEditClick}
						onRentedBookSelectClick={onRentedBookSelectClick}
						variant={i % 2 === 0 ? "" : "secondary"}
					/>
				))}
			</ListGroup>
			<Alert
				className="fixed-bottom d-flex gap-4 align-items-center m-2"
				style={{ width: "max-content", right: "0", left: "unset" }}
				show={members.reduce((total, member) => total + member.rentedBooks.filter(b => b.selected).length, 0) > 0}
				dismissible
				onClose={deselectAllRentedBooks}
			>
				<Alert.Heading>Return selected book(s)</Alert.Heading>
				<Button className="me-3" onClick={() => setShowReturnModal(true)}>
					Return
				</Button>
			</Alert>
			<ReturnBooksModal
				allMembers={members}
				show={showReturnModal}
				handleClose={() => setShowReturnModal(false)}
				onReturnBooksConfirm={onReturnBooksConfirm}
			/>
		</>
	);
}
