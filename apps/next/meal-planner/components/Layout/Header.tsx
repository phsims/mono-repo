import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Link as LinkScroll } from 'react-scroll';
import ButtonOutline from 'meal-planner/components/ButtonOutline';

export default function Header() {
  const [activeLink, setActiveLink] = useState(null);
  const [scrollActive, setScrollActive] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);
  return (
    <>
      <header
        className={
          'fixed top-0 w-full  z-30 bg-white-500 transition-all ' +
          (scrollActive ? ' shadow-md pt-0' : ' pt-4')
        }
      >
        <nav className="max-w-screen-xl  mx-auto grid grid-flow-col">
          <Link href="/">
            {' '}
            <div className="flex items-center  sm:mx-0">
              <Image src="/logo.png" width={75} height={75} alt="logo" />
              <p className="text-lg text-black-600 font-medium capitalize">
                Meal Planner
              </p>
            </div>
          </Link>
        </nav>
      </header>
    </>
  );
}
