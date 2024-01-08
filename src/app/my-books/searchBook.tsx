import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from 'next/image';

export function BookSearchDialog() {
	const [searchTerm, setSearchTerm] = useState('');
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (searchTerm) {
				setLoading(true);
				axios.get(`http://localhost:3000/api/books/search?q=${encodeURIComponent(searchTerm)}`)
					.then(response => {
						setBooks(response.data);
						setError('');
					})
					.catch(err => {
						console.error('Error al buscar libros:', err);
						setError(err);
					})
					.finally(() => {
						setLoading(false);
					});
			}
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [searchTerm]);

	const handleSearch = (e) => {
		e.preventDefault();
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Add books</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px] md:max-w-3xl">
				<DialogHeader>
					<DialogTitle>Search books</DialogTitle>
					<DialogDescription>
						Introduce search term.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSearch}>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="book-search" className="">
								Search term
							</Label>
							<Input
								id="book-search"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="col-span-3"
								placeholder="Introduce el título, autor, ISBN..."
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Search</Button>
					</DialogFooter>
				</form>
				{loading && <p>Loading results...</p>}
				{error && <p>Error: {error}</p>}
				<div className="flex overflow-x-auto">
					{!loading && !error && books.map((book: any) => (
						<div key={book._externalId} className="flex-shrink-0 p-4">
							<h3 className="text-lg">{book._title}</h3>
							<p className="text-sm">{book._author}</p>
							<Image
								src={book._image}
								alt={`Portada de ${book._title}`}
								className='w-24 h-32 md:w-48 md:h-64'
								width={100}
								height={100}
							/>
						</div>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
