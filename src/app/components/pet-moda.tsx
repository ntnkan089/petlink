import { useState, FC } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import { FaSpinner } from 'react-icons/fa';

interface UploadPetModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

const UploadPetModal: FC<UploadPetModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [status, setStatus] = useState('');
    const [address, setAddress] = useState('');
    const [about, setAbout] = useState('');
    const [from, setFrom] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setPhoto(file);
        setPhotoPreview(file ? URL.createObjectURL(file) : null);
    };

    const handleRemovePhoto = () => {
        setPhoto(null);
        setPhotoPreview(null);
    };

    const uploadPhoto = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        return data.imageUrl;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!name || !breed || !photo) {
            setError('Please fill out all required fields and upload a photo.');
            return;
        }

        setIsSubmitting(true);
        let imageUrl = '';

        if (photo) {
            imageUrl = await uploadPhoto(photo);
        }

        const petData = {
            name,
            breed,
            ownerId: localStorage.getItem('userId')!.replace(/^"|"$/g, '') || '',
            photo: imageUrl,
            gender,
            age,
            status: 'Adoptable',
            address,
            about,
            from: 'cur',
        };

        try {
            const response = await fetch('/api/pet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(petData),
            });

            const data = await response.json();
            setIsSubmitting(false);
            onSubmit(data);
            onClose();
            window.location.href = '/profile'
        } catch (error) {
            console.error('Failed to submit pet:', error);
            setError('Failed to upload pet. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
            <div className="modal-content overflow-auto">
                <h2 className="text-2xl font-bold mb-4">Upload New Pet</h2>

                {error && <div className="text-red-600 mb-4">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Breed:</label>
                        <input
                            type="text"
                            value={breed}
                            onChange={(e) => setBreed(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Gender:</label>
                        <input
                            type="text"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Age:</label>
                        <input
                            type="text"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Address:</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">About:</label>
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Photo:</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-indigo-500"
                            required
                        />
                        {photoPreview && (
                            <div className="relative mt-2">
                                <Image
                                    src={photoPreview}
                                    alt="Preview"
                                    className="max-w-full h-auto rounded-lg shadow-md"
                                    width={300}
                                    height={300}
                                />
                                <button
                                    type="button"
                                    onClick={handleRemovePhoto}
                                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md border border-gray-300 hover:bg-gray-200 focus:outline-none"
                                >
                                    <svg
                                        className="w-4 h-4 text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {isSubmitting ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

const customStyles = {
    overlay: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
    },
    content: {
        position: 'relative',
        inset: 'auto',
        margin: 'auto',
        padding: '2rem',
        boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        maxWidth: '600px',
        maxHeight: '80vh', 
        width: '100%',
        overflowY: 'auto',
    },
};

export default UploadPetModal;

