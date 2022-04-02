import { v4 as uuidv4 } from "uuid";

export function getAllMembers() {
	return members;
}

export function getMemberById(id) {
	return members.find(member => member.id === id);
}

export function addMember(memberForAdd) {
	const status = { type: "ADD", success: true, message: "" };
	if (memberForAdd.name !== undefined && memberForAdd.surname !== undefined && memberForAdd.birthdate !== undefined) {
		members.push({
			id: uuidv4(),
			...memberForAdd,
			label: `${memberForAdd.name} ${memberForAdd.surname} - ${memberForAdd.birthdate}`,
			rentedBooks: [],
		});
		status.message = "Successfully added new member";
		return status;
	}
	status.success = false;
	status.message = "Wrong input data";
	return status;
}

export function modifyMember(memberForModify) {
	const status = { type: "MODIFY", success: true, message: "" };
	const modifying = members.find(member => member.id === memberForModify.id);
	if (modifying) {
		modifying.name = memberForModify.name;
		modifying.surname = memberForModify.surname;
		modifying.birthdate = memberForModify.birthdate;
		modifying.label = `${memberForModify.name} ${memberForModify.surname} - ${memberForModify.birthdate}`;
		status.message = "Member successfully modified";
		return status;
	}
	status.success = false;
	status.message = "Member Not Found";
	return status;
}

// export function removeMember(memberForRemove) {
// 	const status = { type: "REMOVE", success: true, message: "" };
// 	const index = members.findIndex(member => member.id === memberForRemove.id);
// 	if (index !== -1) {
// 		members.splice(index, 1);
// 		status.message = "Member successfully removed from library";
// 		return status;
// 	}
// 	status.success = false;
// 	status.message = "Member Not Found";
// 	return status;
// }

export function rentBooks(memberId, booksForRent) {
	const status = { type: "RENT", success: true, message: "", booksSuccessed: [], booksFailed: [] };
	const member = members.find(member => member.id === memberId);
	if (!member) {
		status.success = false;
		status.message = "Member not found";
		return status;
	}
	booksForRent.forEach(book => {
		if (member.rentedBooks.includes(book.id)) {
			status.success = false;
			status.booksFailed.push({ book, message: "Book already rented by this member" });
		} else {
			if (isBookAvailable(book)) {
				member.rentedBooks.push(book.id);
				status.booksSuccessed.push({ book, message: "Book successfully rented" });
			} else {
				status.success = false;
				status.booksFailed.push({ book, message: "No more books available" });
			}
		}
	});
	if (status.booksSuccessed.length > 0 && status.booksFailed.length < 1) status.message = "All books rented successfully";
	if (status.booksSuccessed.length > 0 && status.booksFailed.length > 0) status.message = "Some books not rented";
	if (status.booksSuccessed.length < 1 && status.booksFailed.length > 0) status.message = "Book renting failed";
	return status;
}

export function returnBooks(memberId, booksForReturn) {
	const status = { type: "RETURN", success: true, message: "", booksSuccessed: [], booksFailed: [] };
	const member = members.find(member => member.id === memberId);
	if (!member) {
		status.success = false;
		status.message = "Member not found";
		return status;
	}
	booksForReturn.forEach(book => {
		const index = member.rentedBooks.indexOf(book.id);
		if (index === -1) {
			status.success = false;
			status.booksFailed.push({ book, message: "Book not found at current member" });
		}
		member.rentedBooks.splice(index, 1);
		status.booksSuccessed.push({ book, message: "Book successfully returned" });
	});
	if (status.booksSuccessed.length > 0 && status.booksFailed.length < 1) status.message = `${member.label} All books returned successfully`;
	if (status.booksSuccessed.length > 0 && status.booksFailed.length > 0) status.message = `${member.label} Some books not returned`;
	if (status.booksSuccessed.length < 1 && status.booksFailed.length > 0) status.message = `${member.label} Book returning failed`;
	return status;
}

export function getTotalBooksRented(book) {
	return members.reduce((prevValue, member) => prevValue + member.rentedBooks.filter(id => id === book.id).length, 0);
}

function isBookAvailable(book) {
	return getTotalBooksRented(book) < book.totalBooks;
}

const members = [
	{
		id: "a6d81d52-9028-4975-89a6-6f432e07e86b",
		name: "Miro",
		surname: "Mirić",
		birthdate: "1996-11-09",
		label: "Miro Mirić - 1996-11-09",
		rentedBooks: ["a9810bcf-badd-4f31-bd12-31d174c7541f"],
	},
	{
		id: "a6d80d52-9028-4975-89a6-6f76ce07e86b",
		name: "Ivo",
		surname: "Ivić",
		birthdate: "1993-01-05",
		label: "Ivo Ivić - 1993-01-05",
		rentedBooks: [],
	},
	{
		id: "a6d12d52-9028-4975-89a6-6f4fce07e86b",
		name: "Zdenko",
		surname: "Zdenkić",
		birthdate: "1976-02-07",
		label: "Zdenko Zdenkić - 1976-02-07",
		rentedBooks: ["f1d83852-9028-4975-89a6-6f4fce07ecde", "d5d8c6af-c58f-4b37-b252-ccac83ba8441"],
	},
	{
		id: "a6d80d93-9238-4975-89a6-6f4fce07e86b",
		name: "Šime",
		surname: "Šimić",
		birthdate: "2000-10-02",
		label: "Šime Šimić - 2000-10-02",
		rentedBooks: [
			"94c3c83a-ade4-4016-830c-bab78999a2ef",
			"f1d83852-9028-4975-89a6-6f4fce07ecde",
			"84a4e09d-434e-4bce-a8ab-f620a5cda814",
			"d5d8c6af-c58f-4b37-b252-ccac83ba8441",
		],
	},
	{
		id: "a6d80d88-9028-4975-89a6-6f434e07e86b",
		name: "Ana",
		surname: "Anić",
		birthdate: "2005-09-04",
		label: "Ana Anić - 2005-09-04",
		rentedBooks: ["cfddefae-a925-43e1-b3ac-db244966939f", "a9810bcf-badd-4f31-bd12-31d174c7541f"],
	},
	{
		id: "a6d80dff-9028-4975-8926-6f4fce01e84b",
		name: "Klara",
		surname: "Klarić",
		birthdate: "1992-12-08",
		label: "Klara Klarić - 1992-12-08",
		rentedBooks: [
			"cfddefae-a925-43e1-b3ac-db244966939f",
			"94c3c83a-ade4-4016-830c-bab78999a2ef",
			"a9810bcf-badd-4f31-bd12-31d174c7541f",
			"d5d8c6af-c58f-4b37-b252-ccac83ba8441",
		],
	},
	{
		id: "a6d80d52-9028-4975-84a6-6f4f2355e86b",
		name: "Ljuba",
		surname: "Ljubić",
		birthdate: "1992-12-08",
		label: "Ljuba Ljubić - 1992-12-08",
		rentedBooks: ["d5d8c6af-c58f-4b37-b252-ccac83ba8441", "a9810bcf-badd-4f31-bd12-31d174c7541f"],
	},
];
