'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import paw from '@/app/(route)/assets/7586571.webp';
import ava from '@/app/(route)/assets/default avatar.png';
import UploadPetModal from '@/app/components/pet-moda';
import { FaPaw } from 'react-icons/fa';

const ProfilePage = () => {
    const { data: session } = useSession();

    const [userData, setUserData] = useState<User | null>(null);
    const [postedPets, setPostedPets] = useState<cur_pet[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle'); 

    useEffect(() => {
        if (session) {
            const fetchData = async () => {
                try {
                    const response = await fetch(`/api/user?email=${session.user?.email}`);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();
                    setUserData(data);
                } catch (error) {
                    setError('Failed to fetch user data');
                }
            };
            const fetchPostedPets = async () => {
              try {
                  const response = await fetch(`/api/pet/posted?ownerId=${localStorage.getItem('userId')!.replace(/^"|"$/g, '')}`); 
                  if (!response.ok) throw new Error('Failed to fetch posted pets');
                  const data = await response.json();
                  setPostedPets(data);
              } catch (error) {
                  setError('Failed to fetch posted pets');
              }
          };
            fetchData();
            fetchPostedPets();
        }
    }, [session]);

    const handlePetUpload = async (petData: pet) => {
        console.log('Pet uploaded:', petData);
        setUploadStatus('success'); // Update status based on result
    };

    if (!session) return <div className="text-center py-8">Please log in to view your profile.</div>;
    if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
            {userData && (
                <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                    <div className="flex items-center">
                        <Image
                            src={userData.user_img || ava}
                            alt="Profile Picture"
                            width={100}
                            height={100}
                            className="rounded-full border-2 border-black"
                        />
                        <div className="ml-4">
                            <h2 className="text-3xl font-bold text-gray-800">{userData.name}</h2>
                            <p className="text-gray-600">{userData.email}</p>
                            <p className="text-gray-600">{userData.bio}</p>
                            <p className="text-gray-600">{userData.phone}</p>
                        </div>
                    </div>
                </div>
            )}

            <section className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Favorite Pets</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userData?.fav_pets.length ? (
                        userData.fav_pets.map(({ pet }) => (
                            <div key={pet.id} className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <Link href={`/pet/ours/${pet.id}`}>
                                    <Image
                                        src={pet.photo || paw}
                                        alt={pet.name}
                                        width={300}
                                        height={300}
                                        className="w-full h-64 object-cover"
                                    />
                                </Link>
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-800">{pet.name}</h3>
                                    <p className="text-gray-600">{pet.breed}</p>
                                    <Link href={`/pet/ours/${pet.id}`} className="text-blue-500 hover:underline">View Details</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No favorite pets yet.</p>
                    )}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Contacted Pets</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userData?.contacted_pets.length ? (
                        userData.contacted_pets.map(({ pet }) => (
                            <div key={pet.id} className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <Link href={`/pet/ours/${pet.id}`}>
                                    <Image
                                        src={pet.photo || paw}
                                        alt={pet.name}
                                        width={300}
                                        height={300}
                                        className="w-full h-64 object-cover"
                                    />
                                </Link>
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-800">{pet.name}</h3>
                                    <p className="text-gray-600">{pet.breed}</p>
                                    <Link href={`/pet/ours/${pet.id}`} className="text-blue-500 hover:underline">View Details</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No contacted pets yet.</p>
                    )}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Pets You’ve Added </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {postedPets.length ? (
                        postedPets.map((pet) => (
                            <div key={pet.id} className="bg-white border rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <Link href={`/pet/ours/${pet.id}`}>
                                    <Image
                                        src={pet.photo || paw}
                                        alt={pet.name}
                                        width={300}
                                        height={300}
                                        className="w-full h-64 object-cover"
                                    />
                                </Link>
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-800">{pet.name}</h3>
                                    <p className="text-gray-600">{pet.breed}</p>
                                    <Link href={`/pet/ours/${pet.id}`} className="text-blue-500 hover:underline">View Details</Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No pets posted yet.</p>
                    )}
                </div>
            </section>


            <button
                onClick={() => setShowModal(true)}
                className={`mt-8 flex items-center justify-center gap-2 px-6 py-3 rounded-lg shadow-md transition-all duration-300 ${
                    uploadStatus === 'success' ? 'bg-green-500' : 
                    uploadStatus === 'error' ? 'bg-red-500' : 
                    'bg-amber-500'
                } text-white hover:scale-105`}
            >
                <FaPaw size={20} />
                <span>Upload Pet</span>
            </button>

            <UploadPetModal isOpen={showModal} onClose={() => setShowModal(false)} onSubmit={handlePetUpload} />
        </div>
    );
};

export default ProfilePage;
