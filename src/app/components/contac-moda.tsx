import { useState, FC } from 'react';
import Modal from 'react-modal';
import { FaSpinner } from 'react-icons/fa'; // For loading icon

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    toEmail: string;
    from_email: string;
    from_name: string;
    to_name: string;
    mobile: string;
    pet_id: string | null;
    user_id: string | null;
}

const ContactModal: FC<ContactModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    toEmail,
    from_email,
    from_name,
    to_name,
    mobile,
    pet_id,
    user_id,
}) => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (subject.trim() === '' || message.trim() === '') {
            setError('Please complete the form.');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            const response = await fetch('/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subject,
                    message,
                    toEmail,
                    from_email,
                    from_name,
                    to_name,
                    mobile,
                    pet_id,
                    user_id,
                }),
            });

            const data = await response.json();
            setIsSubmitting(false);
            setSuccessMessage('Message sent successfully!');
            onSubmit(data);
            setTimeout(() => {
                setSuccessMessage(null);
                onClose();
            }, 3000);
        } catch (error) {
            console.error("Failed to send email:", error);
            setIsSubmitting(false);
            setError('Failed to send message. Please try again.');
            onSubmit({ success: false });
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
            <div className="modal-content bg-white rounded-lg p-6 shadow-xl">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact {to_name}</h2>

                <form onSubmit={handleSubmit}>
                    {error && <div className="text-red-600 mb-4">{error}</div>}

                    {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Subject:</label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Message:</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            rows={5}
                            required
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className={`inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white ${
                                isSubmitting
                                    ? 'bg-gray-500 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2" /> Sending...
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
        width: '100%',
        backgroundColor: 'white',
        outline: 'none',
    },
};

export default ContactModal;
