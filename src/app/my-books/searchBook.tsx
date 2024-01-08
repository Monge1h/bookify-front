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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function BookSearchDialog({secAction, action}: {secAction: any, action:number} ) {
	const [searchTerm, setSearchTerm] = useState('');
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const [selectedBook, setSelectedBook] = useState(null);
	const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);



	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (searchTerm) {
				if (searchTerm.trim() === '') {
					return;
				}
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

	const handleSearch = (e:any) => {
		e.preventDefault();
	};

	const handleBookSelect = (book: any) => {
		setSelectedBook(book);
		setIsAlertDialogOpen(true);
	};

	const router = useRouter();
	const handleAddToLibrary = (book:any) => {
		console.log(book)
		axios.post('http://localhost:3000/api/books', {
			title: book._title,
			description: book._description,
			genre: book._genre,
			image: book._image,
			year: book._year,
			author: book._author,
			externalId: book._externalId,
		}).then(response => {

			secAction(action+1);
		} ).catch(err => {
			console.error('Error al añadir el libro:', err);
		}
		);

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
							placeholder="Introduce search term here"
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
						<AlertDialog key={book._externalId}>
							<AlertDialogTrigger asChild>

								<div key={book._externalId} className="flex-shrink-0 p-4" onClick={() => handleBookSelect(book)}>
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
							</AlertDialogTrigger>
							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Do you want to add &quot;{book._title}&quot; to your personal library?</AlertDialogTitle>
									<AlertDialogDescription>
										This action will add the book to your personal collection.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel onClick={() => setIsAlertDialogOpen(false)}>Cancel</AlertDialogCancel>
									<AlertDialogAction onClick={() => handleAddToLibrary(book)}>Continue</AlertDialogAction>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialog>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
}
