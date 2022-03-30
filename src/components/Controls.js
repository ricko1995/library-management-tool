import React, { useState } from "react";
import { Button, ButtonGroup, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import AddEditBook from "./AddEditBook";
import AddEditMember from "./AddEditMember";

export default function Controls({ newBook, modifyBook, rentBook, returnBook }) {
	const [showBookModal, setShowBookModal] = useState(false);
	const [showMemberModal, setShowMemberModal] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [alertStatus, setAlertStatus] = useState({ success: true, message: "Great" });

	const handleCloseBookModal = status => {
		setShowBookModal(false);
		if (status.success !== undefined) {
			setAlertStatus(status);
			handleAlertShow(3000);
		}
	};

	const handleCloseMemberModal = status => {
		setShowMemberModal(false);
		if (status.success !== undefined) {
			setAlertStatus(status);
			handleAlertShow(3000);
		}
	};

	const handleAlertShow = timeout => {
		setShowAlert(true);
		if (timeout) setTimeout(() => setShowAlert(false), timeout);
	};

	return (
		<>
			<ButtonGroup className="ms-auto">
				<Button className="btn-light" onClick={() => setShowBookModal(true)}>
					<FontAwesomeIcon icon={faBookBookmark} />
				</Button>
				<Button className="btn-light">
					<FontAwesomeIcon icon={faUserPlus} onClick={() => setShowMemberModal(true)} />
				</Button>
				<Button className="btn-light">
					<FontAwesomeIcon icon={faUserPlus} onClick={() => handleAlertShow(3000)} />
				</Button>
				<Button className="btn-light">
					<FontAwesomeIcon icon={faUserPlus} onClick={returnBook} />
				</Button>
			</ButtonGroup>
			<AddEditBook show={showBookModal} handleClose={msg => handleCloseBookModal(msg)} />
			<AddEditMember show={showMemberModal} handleClose={msg => handleCloseMemberModal(msg)} />
			<Alert
				className="position-fixed bottom-0 end-0 m-4"
				show={showAlert}
				onClose={() => setShowAlert(false)}
				variant={alertStatus.success ? "success" : "danger"}
				dismissible
			>
				<Alert.Heading className="me-3">{alertStatus.success ? "Your action was successful!" : "Something went wrong"}</Alert.Heading>
				<p>{alertStatus.message}</p>
			</Alert>
		</>
	);
}
