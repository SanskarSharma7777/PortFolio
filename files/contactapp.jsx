import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const ContactApp = () => {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const addContact = () => {
        setContacts([...contacts, { name, email }]);
        setName('');
        setEmail('');
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                <div className="md:flex">
                    <div className="p-8">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Contact List</div>
                        <div className="mt-2">
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border p-2 rounded w-full mb-2"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border p-2 rounded w-full mb-2"
                            />
                            <button
                                onClick={addContact}
                                className="bg-indigo-500 text-white p-2 rounded w-full"
                            >
                                Add Contact
                            </button>
                        </div>
                        <ul className="mt-4">
                            {contacts.map((contact, index) => (
                                <li key={index} className="border-b p-2">
                                    <div className="text-lg font-medium">{contact.name}</div>
                                    <div className="text-gray-500">{contact.email}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactApp;