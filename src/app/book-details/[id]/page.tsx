"use client"
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

type owner = {
	name: string;
	image: string;
	status: string;
	id: string;
    user: {
        name: string;
    }
};

type Book = {
	_title: string;
	_image: string;
	_description: string;
	_owners: owner[];
	_author: string;
	_genre: string;
	_year: string;
    _status: string;
};

export default function BookDetail() {
	const params = useParams();
    const { id } = params;

    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:3000/api/books/external/${id}`)
                .then((response) => {
                    console.log(response.data);
                    setBook(response.data)}
                    )
                .catch((error) => console.error('Error fetching book:', error));
        }
    }, [id]);




	if (!book) {
        return <p>Loading...</p>;
    }


    return (
        <div className="">
				<h2 className='text-4xl pb-7'>Book detail:</h2>
            <div className="md:flex">
                <div className="mb-4 md:mb-0 md:w-1/3">
                    <Image src={book._image} alt={book._title} width={300} height={450} />
                </div>
                <div className="md:w-2/3 md:ml-6">
                    <h2 className="text-3xl font-bold mb-2">{book._title}</h2>
                    <p className="text-xl mb-4">by {book._author}</p>
                    <p className="text-gray-700">{book._description}</p>
					<p className="text-xl mt-4">Genre: {book._genre}</p>
					<p className="text-xl">Year: {book._year}</p>
                </div>
            </div>
			<div className='w-full'>
                <h3 className="text-3xl font-bold mb-2">Owners:</h3>
                <div className="grid md:grid-cols-4 gap-4">
                    {book._owners.map((owner, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg p-4 flex-col relative justify-center items-center">
                            <div className='text-center'>
                                <p className="font-bold">{owner.user.name}</p>
                                <p className="text-sm text-gray-600">{owner.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
