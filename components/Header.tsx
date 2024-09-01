"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SunMoon } from 'lucide-react';

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className='relative p-10 text-center'>
      <Link href="/"> 
        <h1 className='text-6xl font-black dark:text-white'>StoryTeller AI</h1>
        <div className='flex justify-center whitespace-nowrap space-x-5 text-3xl lg:text-5xl'>
          <h2 className='dark:text-white'>Bringing your stories</h2>
          <div className='relative'>
            <div className='absolute bg-blue-500 -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 rotate-1' />
            <p className='relative text-white'>To Life!</p>
          </div>
        </div>
      </Link>

      {/* Nav Icon */}
      <div className='absolute -top-5 right-5 flex space-x-2'>
        <SunMoon
          className='w-10 h-8 lg:h-10 mx-auto mt-10 border-2 dark:text-white dark:bg-black bg-white text-black border-black rounded-full hover:opacity-50 cursor-pointer'
          onClick={toggleDarkMode}
        />
      </div>
    </header>
  );
}

export default Header;
