'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import paw from '../../../assets/7586571.webp';
import Image from 'next/image';
import { useSearchParams, useParams } from 'next/navigation';
import ava from '../../../assets/default avatar.png';
import { FaHeart } from 'react-icons/fa'; // FontAwesome heart icon

const PetProfile = () => {
    const { id } = useParams();
    const [data, setData] = useState<cur_pet | null>(null);
    const [comments, setComments] = useState<comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(false);
    const [liked, setLiked] = useState(false);
    const searchParams = useSearchParams();
    const from = searchParams.get('from');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/pet/${id}?user_id=${localStorage.getItem('userId')!.replace(/^"|"$/g, '')}`);
                const petData = response.data;
                setData(petData);
                if (petData.liked) {
                    setLiked(true);
                }
                const commentsResponse = await axios.get(`/api/comment?petId=${id}`);
                setComments(commentsResponse.data);
            } catch (err) {
                console.error(err);
                setError(true);
            }
        };

        fetchData();
    }, [id, from]);

    const handleLike = async () => {
        try {
            const userId = localStorage.getItem('userId')?.replace(/^"|"$/g, '');
            await axios.post('/api/pet-like', {
                userId,
                petId: id,
                petData: {
                    name: data?.name || '',
                    breed: data?.breed || '',
                    ownerId: '',
                    photo: data?.photo || '',
                    from: from,
                },
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
                petId: id,
                content: newComment,
            });
            setNewComment('');
            const response = await axios.get(`/api/comment?petId=${id}`);
            setComments(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col bg-gray-100 min-h-screen">
            <div className="bg-amber-500 text-center py-8 shadow-md">
                <h1 className="text-4xl font-bold text-white">{data?.name || 'Pet Profile'}</h1>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                    {/* Pet Image */}
                    <div className="max-w-[350px] flex flex-col items-center">
                        <Image
                            src={data?.photo ? data.photo : paw}
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
                            <p className="text-gray-700">{data?.breed || 'Unknown'}</p>
                        </div>
                        <div>
                            <p className="font-bold text-lg">Gender & Age</p>
                            <p className="text-gray-700">{`${data?.gender || 'N/A'}, ${data?.age || 'N/A'}`}</p>
                        </div>
                        <div>
                            <p className="font-bold text-lg">Status</p>
                            <p className="text-gray-700 capitalize">{data?.status || 'Unknown'}</p>
                        </div>
                        <div>
                            <p className="font-bold text-lg">Address</p>
                            <p className="text-gray-700 capitalize">{data?.address || ''}</p>
                        </div>
                        <div>
                            <p className="font-bold text-lg">About</p>
                            <p className="text-gray-700">{data?.about || 'No description available.'}</p>
                            <a
                                href={data?.from === 'pet_z' ? data.url : `/profile/${data?.ownerId.replace(/"/g, '')}?ask=true&pet_id=${id}`}
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
                                        src={comment.user.user_img ? comment.user.user_img : ava}
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
