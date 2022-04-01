import React, { useState } from "react";
import { Container, Tabs, Tab, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookBookmark, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import BookList from "./BookList";
import SearchBar from "./SearchBar";
import AddEditBookModal from "./AddEditBookModal";
import AddEditMemberModal from "./AddEditMemberModal";
import { getBookById, getAllBooks } from "../mockup/books-api";
import { getTotalBooksRented, rentBooks } from "../mockup/members-api";
import StatusModal from "./StatusModal";

const TOAST_OPTIONS = { position: "bottom-right", autoClose: 3000, pauseOnHover: true };

function App() {
	const [books, setBooks] = useState(getAllBooks().map(book => ({ ...book, rentedBooks: getTotalBooksRented(book), show: true, selected: false })));
	// const [members, setMembers] = useState(getMembers());
	const [showBookModal, setShowBookModal] = useState(false);
	const [showMemberModal, setShowMemberModal] = useState(false);
	const [bookForEdit, setBookForEdit] = useState(undefined);
	const [memberForEdit, setMemberForEdit] = useState(undefined);
	const [status, setStatus] = useState({});
	const [showStatusModal, setShowStatusModal] = useState(false);

	const handleCloseBookModal = s => {
		setShowBookModal(false);
		if (!s) return;
		setStatus(s);
		if (s && s.success !== undefined) {
			if (s.success) {
				toast.success(s.message + " (click for more details)", { ...TOAST_OPTIONS, onClick: () => setShowStatusModal(true) });
				setBooks(getAllBooks().map(book => ({ ...book, rentedBooks: getTotalBooksRented(book), show: true, selected: false })));
			} else toast.warn(s.message + " (click for more details)", { ...TOAST_OPTIONS, onClick: () => setShowStatusModal(true) });
		}
	};

	const handleCloseMemberModal = s => {
		setShowMemberModal(false);
		if (!s) return;
		setStatus(s);
		if (s && s.success !== undefined) {
			if (s.success) {
				toast.success(s.message + " (click for more details)", { ...TOAST_OPTIONS, onClick: () => setShowStatusModal(true) });
				// if(status.type === "ADD" || status.type === "REMOVE") setMembers(getMembers());
			} else toast.warn(s.message + " (click for more details)", { ...TOAST_OPTIONS, onClick: () => setShowStatusModal(true) });
		}
	};

	const handleNewBookClick = () => {
		setBookForEdit(undefined);
		setShowBookModal(true);
	};
	const handleNewMemberClick = () => {
		setMemberForEdit(undefined);
		setShowMemberModal(true);
	};

	const handleOnBookEditClick = id => {
		setBookForEdit(getBookById(id));
		setShowBookModal(true);
	};

	const handleOnMemberEditClick = id => {
		console.log(id);
		// setMemberForEdit(getMemberById(id));
		// setShowMemberModal(true);
	};

	function handleBookSearch(searchValue) {
		setBooks(
			books.map(book => {
				if (book.author.toLowerCase().includes(searchValue) || book.title.toLowerCase().includes(searchValue)) book.show = true;
				else book.show = false;
				return book;
			})
		);
	}

	function handleBookSelectClick(id) {
		setBooks(prev => {
			const copy = [...prev];
			copy.find(book => book.id === id).selected = !copy.find(book => book.id === id).selected;
			return [...copy];
		});
	}

	function handleRentConfirm(member) {
		const s = rentBooks(
			member.id,
			books.filter(book => book.selected)
		);
		setStatus(s);
		if (s.success) toast.success(s.message + " (click for more details)", { ...TOAST_OPTIONS, onClick: () => setShowStatusModal(true) });
		else toast.warn(s.message + " (click for more details)", { ...TOAST_OPTIONS, onClick: () => setShowStatusModal(true) });
		setBooks(getAllBooks().map(book => ({ ...book, rentedBooks: getTotalBooksRented(book), show: true, selected: false })));
	}

	function handleCloseStatusModal() {
		setShowStatusModal(false);
	}

	return (
		<Container className="d-flex flex-column mb-5">
			<div className="d-flex align-items-center">
				<img className="me-5" src="logo192.png" height="100" alt="logo" />
				<h1>Library Management Tool</h1>
				<div className="ms-auto">
					<Button className="btn-light me-3" onClick={handleNewBookClick}>
						<FontAwesomeIcon className="me-3" icon={faBookBookmark} />
						New book
					</Button>
					<Button className="btn-light" onClick={handleNewMemberClick}>
						<FontAwesomeIcon className="me-3" icon={faUserPlus} />
						New member
					</Button>
				</div>
			</div>
			<ToastContainer />
			<Tabs defaultActiveKey="books" className="">
				<Tab className="" eventKey="books" title="All Books">
					<SearchBar title="Find Book" handleSearch={handleBookSearch} />
					<BookList
						books={books.filter(b => b.show)}
						onBookEditClick={handleOnBookEditClick}
						onBookSelectClick={handleBookSelectClick}
						onRentConfirmed={handleRentConfirm}
					/>
				</Tab>
				<Tab eventKey="rented-books" title="Rented Books">
					<SearchBar title="Search" />
				</Tab>
				<Tab eventKey="members" title="Members">
					<SearchBar title="Find Member" />
				</Tab>
			</Tabs>
			<AddEditBookModal show={showBookModal} handleClose={status => handleCloseBookModal(status)} book={bookForEdit} />
			<AddEditMemberModal show={showMemberModal} handleClose={status => handleCloseMemberModal(status)} />
			<StatusModal show={showStatusModal} handleClose={handleCloseStatusModal} status={status} />
		</Container>
	);
}

export default App;
