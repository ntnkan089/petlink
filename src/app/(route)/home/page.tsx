'use client'
import { useEffect, useState } from 'react';
import { petAPI } from '../api/axios';

import { useSession } from "next-auth/react";
import paw from '../assets/7586571.webp';

import Link from 'next/link';
import Image from 'next/image';

const PetListing = () => {
    const [data, setData] = useState<AnimalData|null>(null);
    const [error, setError] = useState(false);

    const [access, setAccess] = useState('');
    const { data: session } = useSession();
  
    useEffect(() => {
      if (session) {
        const fetchData = async () => {
          try {
            const response = await fetch(`/api/user?email=${session.user?.email}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            localStorage.setItem('userId', JSON.stringify(data.id))
        } catch (error) {

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
                let a = response?.data.animals.map((animal:Animal)=>{
                    return {
                        ...animal, from: 'pet_z'
                    }
                })
                setData(a)
                console.log(a);
            } catch (err) {
                console.error(err);
                setError(true)
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

                        const response = await res.json()
                        console.log(response.access_token)
                        localStorage.setItem('pet-tokena', response.access_token);
                        console.log(response.access_token)
                        setAccess(response.access_token)
                    } catch (error) {
                        console.error(error);
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
                    let a = res?.animals.map((animal:Animal)=>{
                        return {
                            ...animal, from: 'pet_z'
                        }
                    })
                    setData(a)
                    console.log(a);
                } catch (err) {
                    console.log(err);
                }
            }
        }

        getUsers();

        return () => {
            isMounted = false;
        }

    }, [])

    return (
        <div className='flex'>
            
            <div className='w-3/4 p-4'>
                {session && <div>
                    <h1 className='text-2xl font-bold mb-4'>Welcome, {session.user?.email}</h1>
                </div>}
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {data?.map((animal) => (
                        <div key={animal?.id} className='flex flex-col justify-center items-center border p-4 rounded-lg'>
                            {animal.photos[0] ? (
                                <div>
                                    <Link href={`/pet/${animal.id}`} target='_blank' rel="noreferrer">
                                        <Image src={animal.photos[0]?.medium} 
                                            width={300}
                                            height={300}
                                            className='object-cover rounded-lg'
                                            alt={animal.name} />
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <Link href={`/pet/${animal.id}?from=pet_z`} target='_blank' rel="noreferrer">
                                        <Image src={paw} 
                                            width={300}
                                            height={300}
                                            className='object-cover rounded-lg'
                                            alt="" />
                                    </Link>
                                </div>
                            )}
                            <div className='mt-2'>
                                <p>
                                    <a href={animal.url} target='_blank' rel="noreferrer">{animal.name}</a>
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PetListing;
