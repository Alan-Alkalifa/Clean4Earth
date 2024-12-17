'use client';
import Link from 'next/link';
import Image from "next/image";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import CartIcon from '../cart/CartIcon';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Campaign', href: '/campaign' },
    { name: 'Events', href: '/events' },
    { name: 'Products', href: '/products' },
    { name: 'Resources', href: '/resources' },
    { name: 'Get Involved', href: '/get-involved' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname?.startsWith(path);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <Link href="/" className="font-bold text-xl text-primary flex items-center gap-2">
            <Image src="/logo.svg" alt="Clean4Earth Logo" width={86} height={86} />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-auto"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center ml-auto">
            <nav className="flex items-center space-x-6">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-text-primary hover:text-primary transition-colors relative py-2
                    ${isActive(item.href) ? 'text-primary' : ''}
                    after:content-[''] after:absolute after:left-0 after:bottom-0 
                    after:w-full after:h-0.5 after:bg-primary after:transition-transform 
                    after:duration-300 after:origin-left
                    ${isActive(item.href) ? 'after:scale-x-100' : 'after:scale-x-0'}`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="ml-6">
              <CartIcon />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto py-4">
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-text-primary hover:text-primary transition-colors relative py-2 px-4
                      ${isActive(item.href) ? 'text-primary bg-primary/5' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t border-gray-100 pt-4 px-4">
                  <Link
                    href="/cart"
                    className="flex items-center text-text-primary hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      className="h-6 w-6 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Cart
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
