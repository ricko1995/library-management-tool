import { v4 as uuidv4 } from "uuid";

export function getAllMembers() {
	return members;
}

export function getMemberById(id) {
	return members.find(member => member.id === id);
}

export function addMember(memberForAdd) {
	const addStatus = { type: "ADD", success: true, message: "" };
	if (memberForAdd.name !== undefined && memberForAdd.surname !== undefined && memberForAdd.birthdate !== undefined) {
		members.push({
			id: uuidv4(),
			...memberForAdd,
			label: `${memberForAdd.name} ${memberForAdd.surname} - ${memberForAdd.birthdate}`,
			rentedBooks: [],
		});
		addStatus.message = "Successfully added new member";
		return addStatus;
	}
	addStatus.success = false;
	addStatus.message = "Wrong input data";
	return addStatus;
}

export function modifyMember(memberForModify) {
	const modifyStatus = { type: "MODIFY", success: true, message: "" };
	const modifying = members.find(member => member.id === memberForModify.id);
	if (modifying) {
		modifying.name = memberForModify.name;
		modifying.surname = memberForModify.surname;
		modifying.birthdate = memberForModify.birthdate;
		modifying.rentedBooks = memberForModify.rentedBooks;
		modifying.label = `${memberForModify.name} ${memberForModify.surname} - ${memberForModify.birthdate}`;
		modifyStatus.message = "Member successfully modified";
		return modifyStatus;
	}
	modifyStatus.success = false;
	modifyStatus.message = "Member Not Found";
	return modifyStatus;
}

// export function removeMember(memberForRemove) {
// 	const removeStatus = { type: "REMOVE", success: true, message: "" };
// 	const index = members.findIndex(member => member.id === memberForRemove.id);
// 	if (index !== -1) {
// 		members.splice(index, 1);
// 		removeStatus.message = "Member successfully removed from library";
// 		return removeStatus;
// 	}
// 	removeStatus.success = false;
// 	removeStatus.message = "Member Not Found";
// 	return removeStatus;
// }

export function rentBooks(memberId, booksForRent) {
	const rentStatus = { type: "RENT", success: true, message: "", booksSuccessed: [], booksFailed: [] };
	const member = members.find(member => member.id === memberId);
	if (!member) {
		rentStatus.success = false;
		rentStatus.message = "Member not found";
		return rentStatus;
	}
	booksForRent.forEach(book => {
		if (member.rentedBooks.includes(book.id)) {
			rentStatus.success = false;
			rentStatus.booksFailed.push({ book, message: "Book already rented by this member" });
		} else {
			if (isBookAvailable(book)) {
				member.rentedBooks.push(book.id);
				rentStatus.booksSuccessed.push({ book, message: "Book successfully rented" });
			} else {
				rentStatus.success = false;
				rentStatus.booksFailed.push({ book, message: "No more books available" });
			}
		}
	});
	if (rentStatus.booksSuccessed.length > 0 && rentStatus.booksFailed.length < 1) rentStatus.message = "All books rented successfully";
	if (rentStatus.booksSuccessed.length > 0 && rentStatus.booksFailed.length > 0) rentStatus.message = "Some books not rented";
	if (rentStatus.booksSuccessed.length < 1 && rentStatus.booksFailed.length > 0) rentStatus.message = "Book renting failed";
	return rentStatus;
}

export function returnBooks(memberId, booksForReturn) {
	const returnStatus = { type: "RETURN", success: true, message: "", booksSuccessed: [], booksFailed: [] };
	const member = members.find(member => member.id === memberId);
	if (!member) {
		returnStatus.success = false;
		returnStatus.message = "Member not found";
		return returnStatus;
	}
	booksForReturn.forEach(book => {
		const index = member.rentedBooks.indexOf(book.id);
		if (index === -1) {
			returnStatus.success = false;
			returnStatus.booksFailed.push({ book, message: "Book not found at current member" });
		}
		member.rentedBooks.splice(index, 1);
		returnStatus.booksSuccessed.push({ book, message: "Book successfully returned" });
	});
	if (returnStatus.booksSuccessed.length > 0 && returnStatus.booksFailed.length < 1) returnStatus.message = "All books returned successfully";
	if (returnStatus.booksSuccessed.length > 0 && returnStatus.booksFailed.length > 0) returnStatus.message = "Some books not returned";
	if (returnStatus.booksSuccessed.length < 1 && returnStatus.booksFailed.length > 0) returnStatus.message = "Book returning failed";
	return returnStatus;
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
		birthdate: "11-09-1996",
		label: "Miro Mirić - 11-09-1996",
		rentedBooks: ["a9810bcf-badd-4f31-bd12-31d174c7541f"],
	},
	{
		id: "a6d80d52-9028-4975-89a6-6f76ce07e86b",
		name: "Ivo",
		surname: "Ivić",
		birthdate: "01-05-1993",
		label: "Ivo Ivi - 01-05-1993",
		rentedBooks: [],
	},
	{
		id: "a6d12d52-9028-4975-89a6-6f4fce07e86b",
		name: "Zdenko",
		surname: "Zdenkić",
		birthdate: "02-07-1976",
		label: "Zdenko Zdenkić - 02-07-1976",
		rentedBooks: ["f1d83852-9028-4975-89a6-6f4fce07ecde", "d5d8c6af-c58f-4b37-b252-ccac83ba8441"],
	},
	{
		id: "a6d80d52-9238-4975-89a6-6f4fce07e86b",
		name: "Šime",
		surname: "Šimić",
		birthdate: "10-02-2000",
		label: "Šime Šimić - 10-02-2000",
		rentedBooks: [
			"94c3c83a-ade4-4016-830c-bab78999a2ef",
			"f1d83852-9028-4975-89a6-6f4fce07ecde",
			"84a4e09d-434e-4bce-a8ab-f620a5cda814",
			"d5d8c6af-c58f-4b37-b252-ccac83ba8441",
		],
	},
	{
		id: "a6d80d52-9028-4975-89a6-6f434e07e86b",
		name: "Ana",
		surname: "Anić",
		birthdate: "09-04-2005",
		label: "Ana Anić - 09-04-2005",
		rentedBooks: ["cfddefae-a925-43e1-b3ac-db244966939f", "a9810bcf-badd-4f31-bd12-31d174c7541f"],
	},
	{
		id: "a6d80d52-9028-4975-8926-6f4fce01e84b",
		name: "Klara",
		surname: "Klarić",
		birthdate: "12-08-1992",
		label: "Klara Klarić - 12-08-1992",
		rentedBooks: [
			"cfddefae-a925-43e1-b3ac-db244966939f",
			"94c3c83a-ade4-4016-830c-bab78999a2ef",
			"a9810bcf-badd-4f31-bd12-31d174c7541f",
			"d5d8c6af-c58f-4b37-b252-ccac83ba8441",
			"a9810bcf-badd-4f31-bd12-31d174c7541f",
		],
	},
	{
		id: "a6d80d52-9028-4975-84a6-6f4f2355e86b",
		name: "Ljuba",
		surname: "Ljubić",
		birthdate: "12-08-1992",
		label: "Ljuba Ljubić - 12-08-1992",
		rentedBooks: ["d5d8c6af-c58f-4b37-b252-ccac83ba8441", "a9810bcf-badd-4f31-bd12-31d174c7541f"],
	},
];
