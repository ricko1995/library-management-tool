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
import { getAllMembers, getTotalBooksRented, rentBooks, returnBooks } from "../mockup/members-api";
import StatusModal from "./StatusModal";
import MemberList from "./MemberList";

const TOAST_OPTIONS = { position: "bottom-right", autoClose: 3000, pauseOnHover: true };

function getMappedBooksFromApi() {
	return getAllBooks().map(book => ({ ...book, rentedBooks: getTotalBooksRented(book), show: true, selected: false }));
}

function getMappedMembersFromApi() {
	return getAllMembers().map(member => {
		const rentedBooks = member.rentedBooks.map(id => ({ ...getBookById(id), selected: false }));
		return { ...member, rentedBooks, show: true };
	});
}

export default function App() {
	const [books, setBooks] = useState(getMappedBooksFromApi());
	const [members, setMembers] = useState(getMappedMembersFromApi());
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
				setMembers(getMappedMembersFromApi());
				setBooks(getMappedBooksFromApi());
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
				setMembers(getMappedMembersFromApi());
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

	const handleOnBookEditClick = book => {
		setBookForEdit(book);
		setShowBookModal(true);
	};

	const handleOnMemberEditClick = member => {
		setMemberForEdit(member);
		setShowMemberModal(true);
	};

	function handleBookSearch(searchValue) {
		setBooks(
			books.map(book => {
				if (book.label.toLowerCase().includes(searchValue)) book.show = true;
				else book.show = false;
				return book;
			})
		);
	}

	function handleMemberSearch(searchValue) {
		setMembers(
			members.map(member => {
				if (
					member.label.toLowerCase().includes(searchValue) ||
					member.rentedBooks.some(book => book.label.toLowerCase().includes(searchValue))
				) {
					member.show = true;
				} else member.show = false;
				return member;
			})
		);
	}

	function handleBookSelectClick(id) {
		setBooks(prev => {
			prev.find(book => book.id === id).selected = !prev.find(book => book.id === id).selected;
			return [...prev];
		});
	}
	function deselectAllBooks() {
		setBooks(prev => {
			prev.forEach(book => (book.selected = false));
			return [...prev];
		});
	}

	function handleOnRentedBookSelectClick(memberId, bookId) {
		setMembers(prev => {
			const book = prev.find(member => member.id === memberId).rentedBooks.find(book => book.id === bookId);
			book.selected = !book.selected;
			return [...prev];
		});
	}

	function deselectAllRentedBooks() {
		setMembers(prev => {
			prev.forEach(member => member.rentedBooks.forEach(book => (book.selected = false)));
			return [...prev];
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
		setBooks(getMappedBooksFromApi());
		setMembers(getMappedMembersFromApi());
	}

	function handleReturnBooksConfirm() {
		const memberIdsWithSelectedBooks = members.reduce((arr, member) => {
			const selectedBooks = member.rentedBooks.filter(book => book.selected);
			if (selectedBooks.length > 0) arr.push({ memberId: member.id, selectedBooks });
			return arr;
		}, []);
		memberIdsWithSelectedBooks.forEach(item => {
			const s = returnBooks(item.memberId, item.selectedBooks);
			if (s.success) {
				toast.success(s.message, TOAST_OPTIONS);
			} else toast.error(s.message, TOAST_OPTIONS);
		});
		setBooks(getMappedBooksFromApi());
		setMembers(getMappedMembersFromApi());
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
						deselectAllBooks={deselectAllBooks}
					/>
				</Tab>
				<Tab eventKey="members" title="Members">
					<SearchBar title="Search" handleSearch={handleMemberSearch} />
					<MemberList
						members={members.filter(m => m.show)}
						onMemberEditClick={handleOnMemberEditClick}
						onRentedBookSelectClick={handleOnRentedBookSelectClick}
						deselectAllRentedBooks={deselectAllRentedBooks}
						onReturnBooksConfirm={handleReturnBooksConfirm}
					/>
				</Tab>
			</Tabs>
			<AddEditBookModal show={showBookModal} handleClose={status => handleCloseBookModal(status)} book={bookForEdit} />
			<AddEditMemberModal show={showMemberModal} handleClose={status => handleCloseMemberModal(status)} member={memberForEdit} />
			<StatusModal show={showStatusModal} handleClose={handleCloseStatusModal} status={status} />
		</Container>
	);
}
