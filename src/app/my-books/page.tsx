"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function MyBooksPage() {
	const books = [
		{
			title: "The Hobbit",
			image: "https://wallpaperaccess.com/full/4723250.jpg",
			author: "J.R.R. Tolkien",
			genre: "Fantasy",
			year: "1937",
			id: 1,
			status: "Read",
		},
		{
			title: "The Hobbit",
			image: "https://wallpaperaccess.com/full/4723250.jpg",
			author: "J.R.R. Tolkien",
			genre: "Fantasy",
			year: "1937",
			id: 2,
			status: "Reading",
		},
		{
			title: "The Hobbit",
			image: "https://wallpaperaccess.com/full/4723250.jpg",
			author: "J.R.R. Tolkien",
			genre: "Fantasy",
			year: "1937",
			id: 3,
			status: "Reading"
		},
		{
			title: "The Hobbit",
			image: "https://wallpaperaccess.com/full/4723250.jpg",
			author: "J.R.R. Tolkien",
			genre: "Fantasy",
			year: "1937",
			id: 4,
			status: "Read"
		},
		{
			title: "The Hobbit",
			image: "https://wallpaperaccess.com/full/4723250.jpg",
			author: "J.R.R. Tolkien",
			genre: "Fantasy",
			year: "1937",
			id: 5,
			status: "Read"
		},
	]

    const handleDelete = (bookId: number) => {
    };

    const handleEdit = (bookId:number) => {
    };

	return (
		<section>
			<div className="flex flex-col gap-8">
				<div className="flex justify-between pb-7">
					<h1 className="text-4xl font-bold">My Books</h1>
					<Button>Add</Button>
				</div>
			</div>
			{books.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-2xl">Add your first books 😃</p>
                </div>
            ) : (
				<div className="grid md:grid-cols-3 md:gap-4 grid-cols-1 gap-1 w-full">
				{books.map((book, index) => (
					<div key={index} className={`${book.status == "Reading" ? "bg-gray-200" : "bg-green-200" } rounded-xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transform duration-500 cursor-pointer`}>
						<Link href={"/book-details/" + book.id}>
							<div className="p-4">
								<h2 className="text-3xl font-bold hover:underline cursor-pointer">{book.title}</h2>
								<p className="mt-2 font-sans text-gray-700">by {book.author}</p>
								<p className="text-gray-500">{book.genre}</p>
								<p className="text-gray-500">{book.year}</p>
								<p className="text-gray-500">Status: {book.status}</p>
							</div>
						</Link>
						<div className="relative">
							<Image src={book.image} className="w-80" alt="image of book" width={320} height={480} />
						</div>
						<div className="p-4 flex justify-between">
							<button onClick={() => handleEdit(book.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
								Edit
							</button>
							<button onClick={() => handleDelete(book.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
								Delete
							</button>
						</div>
					</div>
				))}
			</div>
            )}
			
		</section>
	)
}