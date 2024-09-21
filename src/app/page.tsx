'use client';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";
import paw from '@/app/(route)/assets/7586571.webp';

import Link from 'next/link';
import Image from 'next/image';

const PetListingCur = () => {
    const [data, setData] = useState<pet_our[] | null>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`/api/user?email=${session.user?.email}`);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const userData = await response.json();
                    localStorage.setItem('userId', JSON.stringify(userData.id));
                    localStorage.setItem('user_z', JSON.stringify(userData));
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            };
            fetchUserData();
        }
    }, [session]);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get('/api/pet', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('cur-token')}`
                    }
                });

                const pets = response.data.map((pet: Animal) => ({
                    ...pet,
                    from: 'cur'
                }));

                setData(pets);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching pets:', err);
                setError(true);
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    return (
        <div className='flex flex-col p-4 bg-gray-50 min-h-screen'>
            <div className='container mx-auto'>
                {session && (
                    <div className='mb-6 text-center'>
                        <h1 className='text-3xl font-bold text-gray-800'>Welcome, {session.user?.email}</h1>
                    </div>
                )}

                {/* Loading and Error States */}
                {loading && (
                    <div className='text-center text-gray-600'>
                        <p>Loading...</p>
                    </div>
                )}
                {error && (
                    <div className='text-center text-red-600'>
                        <p>There was an error loading the pet listings. Please try again later.</p>
                    </div>
                )}

                {/* Pet Listings */}
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {data?.map((animal) => (
                        <div key={animal.id} className='bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105'>
                            {animal.photo ? (
                                <Link href={`/pet/ours/${animal.id}?from=cur`} target='_blank' rel="noreferrer">
                                    <Image
                                        src={animal.photo.toString()}
                                        width={300}
                                        height={300}
                                        className='w-full h-64 object-cover'
                                        alt={animal.name}
                                    />
                                </Link>
                            ) : (
                                <Link href={`/pet/${animal.id}?from=cur`} target='_blank' rel="noreferrer">
                                    <Image
                                        src={paw}
                                        width={300}
                                        height={300}
                                        className='w-full h-64 object-cover'
                                        alt="Placeholder"
                                    />
                                </Link>
                            )}
                            <div className='p-4'>
                                <h2 className='text-xl font-semibold text-gray-800 text-center'>
                                    <Link href={`/pet/ours/${animal.id}`} target='_blank' rel="noreferrer">
                                        {animal.name}
                                    </Link>
                                </h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PetListingCur;
