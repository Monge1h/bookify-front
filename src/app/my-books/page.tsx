"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useRouter } from 'next/navigation';
import { BookSearchDialog } from "./searchBook";
import { BookCard } from './cardBook';

export default function MyBooksPage() {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [action, setAction] = useState(1);

	useEffect(() => {
		axios.get('http://localhost:3000/api/books/user')
			.then(response => {
				setBooks(response.data);
				console.log(response.data);
				setLoading(false);
			})
			.catch(error => {
				console.error('Error fetching books:', error);
				setLoading(false);
			});
	}, [action]);


	const router = useRouter();

	const handleDelete = async (bookId: number) => {
		try {
			const response = await axios.delete(`http://localhost:3000/api/books/${bookId}`);
			setAction(action + 1);
		} catch (error) {
			console.error('Error deleting book', error);
		}
	};


	const handleEdit = (bookId: number, bookStatus: string) => {
		try {
			const response = axios.put(`http://localhost:3000/api/books/${bookId}`, {
				status:  bookStatus === "Read" ? "Reading" : "Read",
			});
			setAction(action + 1);
		} catch (error) {
			console.error('Error editing book', error);
		}
	};

	return (
		<section>
			<div className="flex flex-col gap-8">
				<div className="flex justify-between pb-7">
					<h1 className="text-4xl font-bold">My Books</h1>
					<BookSearchDialog secAction={setAction} action={action} />
				</div>
			</div>
			{loading ? (
				<div className="text-center py-10">
					<p className="text-2xl">Loading books...</p>
				</div>
			) : books.length === 0 ? (
				<div className="text-center py-10">
					<p className="text-2xl">Add your first books 😃</p>
				</div>
			) : (
				<div className="grid md:grid-cols-3 md:gap-4 grid-cols-1 gap-1 w-full">
					{books.map((book: any, index) => (
						<BookCard key={index} book={book} handleEdit={() => handleEdit(book._id, book._status)} handleDelete={() => handleDelete(book._id)} />
					))}
				</div>
			)}
		</section>
	);
}