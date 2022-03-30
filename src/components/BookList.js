import React from "react";

export default function BookList({ books }) {
	return (
		<>
			{books.map(book => {
				return (
					<h3 key={book.id}>
						{book.title} | {book.author} | {book.totalBooks} | {book.rentedBooks}
					</h3>
				);
			})}
		</>
	);
}
