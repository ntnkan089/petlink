'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import paw from '../../assets/7586571.webp';
import ava from '../../assets/default avatar.png';
import { useSearchParams, useParams } from 'next/navigation';
import { FaHeart } from 'react-icons/fa';

const PetProfile = () => {
    const from = 'pet_z';
    const { id } = useParams();
    const [data, setData] = useState<pet | null>(null);
    const [comments, setComments] = useState<comment[]>([]);
    const [petId, setPetId] = useState<number | null>(null);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(false);
    const [liked, setLiked] = useState(false);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.petfinder.com/v2/animals/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('pet-tokena')}`,
                    },
                });
                const petData = response.data.animal;
                setData(petData);

                // Create pet in the database if it doesn't exist
                const newData = await axios.post('/api/pet', {
                    aid: petData.id,
                    name: petData.name,
                    breed: petData.breeds.primary,
                    age: petData.age,
                    gender: petData.gender,
                    ownerId: '',
                    photo: petData.photos[0]?.large || '',
                    from: 'pet_z',
                    status: petData.status,
                    address: petData.contact?.address?.address1,
                    about: petData.description,
                    url: petData.url,
                });
                
                const dbPet = await axios.get(`/api/pet/${newData.data.id}`);
                setPetId(dbPet.data.id);

                // Fetch comments for the pet
                const commentsResponse = await axios.get(`/api/comment?petId=${dbPet.data.id}`);
                setComments(commentsResponse.data);
            } catch (err) {
                console.error(err);
                setError(true);
                
                const resendTokenRequest = async () => {
                    try {
                        const client_id = process.env.NEXT_PUBLIC_CID;
                        const client_secret = process.env.NEXT_PUBLIC_SEC;

                        if (!client_id || !client_secret) {
                            throw new Error('Client ID or Secret is not defined');
                        }

                        const res = await fetch('https://api.petfinder.com/v2/oauth2/token', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                            body: new URLSearchParams({
                                grant_type: 'client_credentials',
                                client_id: client_id,
                                client_secret: client_secret,
                            }),
                        });

                        const response = await res.json();
                        localStorage.setItem('pet-tokena', response.access_token);
                    } catch (error) {
                        console.error(error);
                    }
                };

                await resendTokenRequest();
                try {
                    const response = await fetch(`https://api.petfinder.com/v2/animals/${id}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('pet-tokena')}` },
                    });
                    const res = await response.json();
                    setData(res.animal);
                } catch (err) {
                    console.error(err);
                }
            }
        };

        fetchData();
    }, [id]);

    const handleLike = async () => {
        try {
            const userId = localStorage.getItem('userId')?.replace(/^"|"$/g, '');
            await axios.post('/api/pet-like', {
                userId,
                petId: Number(id),
                from: 'pet_z',
            });
            setLiked(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCommentSubmit = async () => {
        try {
            const userId = localStorage.getItem('userId')?.replace(/^"|"$/g, '');
            await axios.post('/api/comment', {
                userId,
                petId,
                content: newComment,
            });
            setNewComment('');
            const response = await axios.get(`/api/comment?petId=${petId}`);
            setComments(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col bg-gray-100 min-h-screen">
            <div className="bg-amber-500 text-center py-8 shadow-md">
                <h1 className="text-4xl font-bold text-white">{data?.name || "Pet Profile"}</h1>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                    {/* Pet Image */}
                    <div className="max-w-[350px] flex flex-col items-center">
                        <Image
                            src={data?.photos?.[0]?.large || paw}
                            alt={data?.name || "Pet Image"}
                            width={300}
                            height={300}
                            className="rounded-lg shadow-lg object-cover"
                        />
                    </div>
                    {/* Pet Information */}
                    <div className="max-w-screen-sm bg-white p-6 rounded-lg shadow-lg space-y-4">
                        <div>
                            <p className="font-bold text-lg">Breed</p>
                            <p className="text-gray-700">{data?.breeds?.primary || "Unknown"}</p>
                        </div>
                        <div>
                            <p className="font-bold text-lg">Gender & Age</p>
                            <p className="text-gray-700">{`${data?.gender || "N/A"}, ${data?.age || "N/A"}`}</p>
                        </div>
                        <div>
                            <p className="font-bold text-lg">Status</p>
                            <p className="text-gray-700 capitalize">{data?.status || "Unknown"}</p>
                        </div>
                        <div>
                            <p className="font-bold text-lg">Address</p>
                            <p className="text-gray-700 capitalize">
                                {[
                                    data?.contact?.address?.address1,
                                    data?.contact?.address?.city,
                                    data?.contact?.address?.state,
                                    data?.contact?.address?.postcode
                                ]
                                    .filter(Boolean) 
                                    .join(', ')}
                            </p>
                        </div>
                        <div>
                            <p className="font-bold text-lg">About</p>
                            <p className="text-gray-700">{data?.description || "No description available."}</p>
                            <a
                                href={data?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline hover:text-blue-700 transition-all"
                            >
                                More about {data?.name}
                            </a>
                        </div>
                        {/* Like Button */}
                        <div className="flex items-center justify-center mt-4">
                            <button
                                onClick={handleLike}
                                className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${liked ? 'bg-red-500' : 'bg-gray-300'} hover:bg-red-600`}
                            >
                                <FaHeart className={`text-white text-2xl transition-transform duration-300 ${liked ? 'scale-125' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Comments</h2>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div key={comment.id} className="mb-4 p-4 bg-gray-100 shadow-md rounded-lg flex items-start">
                                    <Image
                                        src={comment.user.user_img || ava}
                                        alt={comment.user.name}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <p className="font-bold">{comment.user.name}</p>
                                        <p>{comment.content}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No comments yet.</p>
                        )}
                        {/* Comment Form */}
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full p-2 border rounded-lg mt-4"
                            rows={4}
                            placeholder="Write a comment..."
                        />
                        <button
                            onClick={handleCommentSubmit}
                            className="mt-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full shadow-md hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                        >
                            Submit Comment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetProfile;
