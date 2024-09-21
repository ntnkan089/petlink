'use client';

import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

import { useEffect, useState } from 'react';
import { petAPI } from '@/app/(route)/api/axios';
import { useSession } from "next-auth/react";
import paw from '@/app/(route)/assets/7586571.webp';
import Link from 'next/link';
import Image from 'next/image';

const PetListing = () => {
    const [data, setData] = useState<AnimalData | null>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const [access, setAccess] = useState('');
    const { data: session } = useSession();

    useEffect(() => {
        if (session) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`/api/user?email=${session.user?.email}`);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();
                    localStorage.setItem('userId', JSON.stringify(data.id));
                    localStorage.setItem('user_z', JSON.stringify(data));
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                }
            };
            fetchData();
        }
    }, [session]);

    useEffect(() => {
        let isMounted = true;

        const getUsers = async () => {
            try {
                const response = await petAPI.get(`/animals`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('pet-tokena')}`
                    }
                });

                const animals = response?.data.animals.map((animal: Animal) => ({
                    ...animal, from: 'pet_z'
                }));
                setData(animals);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching pets:', err);
                setError(true);
                setLoading(false);

                const resendTokenRequest = async () => {
                    try {
                        const res = await fetch('https://api.petfinder.com/v2/oauth2/token', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: new URLSearchParams({
                                grant_type: 'client_credentials',
                                client_id: process.env.NEXT_PUBLIC_CID!,
                                client_secret: process.env.NEXT_PUBLIC_SEC!
                            })
                        });

                        const response = await res.json();
                        localStorage.setItem('pet-tokena', response.access_token);
                        setAccess(response.access_token);
                    } catch (error) {
                        console.error('Failed to refresh token:', error);
                    }
                };

                await resendTokenRequest();

                try {
                    const response = await fetch('https://api.petfinder.com/v2/animals', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('pet-tokena')}`
                        }
                    });
                    const res = await response.json();
                    const animals = res?.animals.map((animal: Animal) => ({
                        ...animal, from: 'pet_z'
                    }));
                    setData(animals);
                } catch (err) {
                    console.error('Error fetching animals after token refresh:', err);
                }
            }
        };

        getUsers();

        return () => {
            isMounted = false;
        };

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
                        <div key={animal?.id} className='bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105'>
                            {animal.photos[0] ? (
                                <Link href={`/pet/${animal.id}`} target='_blank' rel="noreferrer">
                                    <Image
                                        src={animal.photos[0]?.medium}
                                        width={300}
                                        height={300}
                                        className='w-full h-64 object-cover'
                                        alt={animal.name}
                                    />
                                </Link>
                            ) : (
                                <Link href={`/pet/${animal.id}?from=pet_z`} target='_blank' rel="noreferrer">
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
                                    <a href={animal.url} target='_blank' rel="noreferrer">
                                        {animal.name}
                                    </a>
                                </h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PetListing;
