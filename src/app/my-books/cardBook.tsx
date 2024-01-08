
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

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


import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface Book {
	_title: string;
	_author: string;
	_genre: string;
	_year: number;
	_status: string;
	_image: string;
	_id: string;
	_externalId: string;
}

interface BookCardProps {
	book: Book;
	handleEdit: ( id: string, status: string) => void;
	handleDelete: (id:string) => void;
}

export function BookCard({ book, handleEdit, handleDelete }: {book: Book, handleEdit: BookCardProps["handleEdit"], handleDelete: BookCardProps["handleDelete"]}) {
	return (
		<Card className={`w-[300px] ${book._status === "Reading" ? "" : "bg-green-200"} rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transform duration-500 cursor-pointer`}>

			<Link href={"/book-details/" + book._externalId}>
			<CardHeader>
				<CardTitle>{book._title}</CardTitle>
			</CardHeader>
			<CardContent>
				<p className="font-sans text-gray-700">by {book._author}</p>
				<p className="text-gray-500">{book._genre}</p>
				<p className="text-gray-500">{book._year}</p>
				<p className="text-gray-500">Status: {book._status}</p>
				<div className="relative">
					<Image src={book._image} alt="image of book" width={220} height={380} />
				</div>
			</CardContent></Link>
			<CardFooter className="flex justify-between">
			<div className="flex items-center space-x-2">
      <Switch id="airplane-mode" checked={book._status === "Read" } onCheckedChange={() => handleEdit(book._id, book._status)} />
      <Label htmlFor="airplane-mode">Read</Label>
    </div>

				<AlertDialog key={book._externalId}>
					<AlertDialogTrigger asChild>
						<Button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
							delete
						</Button>

					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Do you want to delete &quot;{book._title}&quot; from your personal library?</AlertDialogTitle>
							<AlertDialogDescription>
								This action will remove the book from your personal collection.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancel</AlertDialogCancel>
							<AlertDialogAction onClick={() => handleDelete(book._id)}>Delete</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>

			</CardFooter>
		</Card>
	);
}