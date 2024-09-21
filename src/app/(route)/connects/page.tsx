'use client'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import ava from '@/app/(route)/assets/default avatar.png';
import Image from 'next/image';

type Contact = {
    user: {
        id: string;
        name: string;
        email: string;
        user_img: string;
    };
    pet: {
        id: string;
        name: string;
    };
};

const ConnectsPage = () => {
    const { data: session } = useSession();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch(`/api/connects?user_id=${localStorage.getItem('userId')!.replace(/^"|"$/g, '')}`);
                if (!response.ok) throw new Error('Failed to fetch contacts');
                const data = await response.json();
                setContacts(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load contacts.');
            }
        };

        fetchContacts();
    }, [session]);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">People Who Contacted You</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            

            {contacts.length === 0 && !error && (
                <p className="text-gray-500 text-center">No one has contacted you yet.</p>
            )}
            
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contacts.map((contact, index) => (
                    <div 
                        key={index} 
                        className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex items-center space-x-4"
                    >
                        
                        <Image
                            src={contact.user.user_img || ava}
                            alt={contact.user.name}
                            width={50}
                            height={50}
                            className="rounded-full border border-gray-300"
                        />
                        
                        
                        <div>
                            <p className="font-semibold text-lg text-gray-800">{contact.user.name}</p>
                            <p className="text-sm text-gray-600">{contact.user.email}</p>
                            <p className="text-sm text-gray-500 mt-1">Interested in: <span className="font-medium">{contact.pet.name}</span></p>
                            
                            
                            <Link 
                                href={`/profile/${contact.user.id}?ask=true&pet_id=${contact.pet.id}`}
                                className="inline-block text-blue-500 hover:underline mt-2 transition-colors duration-300"
                            >
                                View Profile
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConnectsPage;
