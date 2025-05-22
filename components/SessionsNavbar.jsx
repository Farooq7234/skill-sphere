'use client';

import Link from 'next/link';
import { SignedIn, SignOutButton, UserButton } from '@clerk/nextjs';


const SessionNavbar = () => {
return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-md shadow-md py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-10 w-10 mr-2" />
              <span className="font-sans text-xl bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">SkillSphere</span>
            </Link>
          </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
                <SignedIn>
                    <UserButton  />
                </SignedIn>
                <SignOutButton className="px-2 py-1 text-sm sm:text-base rounded-md bg-gradient-to-r bg-red-500 text-white mx-3 transition-colors duration-200 shadow" >Logout</SignOutButton>
            </div>
        </div>
    </nav>
);
};

export default SessionNavbar;
