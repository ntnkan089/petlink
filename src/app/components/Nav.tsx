'use client'
import React, { useState } from 'react';
import { FaBars, FaTimes, FaPaw, FaHome, FaUsers, FaHandshake, FaUser, FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa'; // Add icons
import { useSession } from "next-auth/react";
import { signOut } from 'next-auth/react';
import a00 from '@/app/(route)/assets/a00.png';
import Image from 'next/image';
import Link from 'next/link';

const NavBar = () => {
    const { data: session } = useSession();

    const links = [
        /* { id: 1, link: 'Adoption', site: '/adoption-form', icon: <FaPaw /> }, */
        { id: 33, link: 'Our Listings', site: '/', icon: <FaHome /> },
        { id: 18, link: 'Partner Listings', site: '/partner', icon: <FaUsers /> },
        
        { id: 38, link: 'Sponsor', site: '/sponsor', icon: <FaHandshake /> },
        session ? null : { id: 2, link: 'Login', site: '/login', icon: <FaSignInAlt /> },
        session ? null : { id: 3, link: 'Sign up', site: '/register', icon: <FaUserPlus /> },
        session ? { id: 8, link: 'Profile', site: '/profile', icon: <FaUser /> } : null,
        session ? { id: 31, link: 'Connects', site: '/connects', icon: <FaHandshake /> } : null
    ].filter(Boolean);

    const handleSignOut = () => {
        signOut({ callbackUrl: '/' });
    };

    return (
        <div className="flex flex-col h-screen fixed top-0 left-0 w-64 bg-amber-100 shadow-lg">
            <div className="flex items-center justify-between px-4 py-4">
                <h1 className="text-3xl font-signature flex">
                    <Link href='/'>
                        <Image 
                            src={a00} 
                            alt='logo' 
                            className="max-w-full h-auto object-contain" 
                            width={128} 
                            height={64}
                        />
                    </Link>
                </h1>
            </div>

            <ul className="flex flex-col mt-10 space-y-2">
                {links.map((link) => (
                    <li 
                        key={link!.id} 
                        className="flex items-center px-4 py-2 cursor-pointer capitalize font-medium text-gray-700 hover:bg-yellow-500 rounded-md transition-transform transform hover:scale-105"
                    >
                        {/* Icon */}
                        <span className="mr-3 text-lg">{link!.icon}</span>
                        {/* Link Text */}
                        <Link href={link!.site!}>
                            {link!.link}
                        </Link>
                    </li>
                ))}
                {session && (
                    <li 
                        className="flex items-center px-4 py-2 cursor-pointer capitalize font-medium text-gray-700 hover:bg-yellow-500 rounded-md transition-transform transform hover:scale-105"
                    >
                        <span className="mr-3 text-lg"><FaSignOutAlt /></span>
                        <button onClick={handleSignOut} className='w-full text-left'>Sign Out</button>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default NavBar;
