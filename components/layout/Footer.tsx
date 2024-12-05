'use client';

import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-text-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-12 after:h-1 after:bg-primary">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li><Link href="/" className="hover:text-primary transition-colors duration-300 flex items-center space-x-2">
                <span className="hover:translate-x-2 transition-transform duration-300">Home</span>
              </Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors duration-300 flex items-center space-x-2">
                <span className="hover:translate-x-2 transition-transform duration-300">About</span>
              </Link></li>
              <li><Link href="/campaign" className="hover:text-primary transition-colors duration-300 flex items-center space-x-2">
                <span className="hover:translate-x-2 transition-transform duration-300">Campaign</span>
              </Link></li>
              <li><Link href="/events" className="hover:text-primary transition-colors duration-300 flex items-center space-x-2">
                <span className="hover:translate-x-2 transition-transform duration-300">Events</span>
              </Link></li>
              <li><Link href="/resources" className="hover:text-primary transition-colors duration-300 flex items-center space-x-2">
                <span className="hover:translate-x-2 transition-transform duration-300">Resources</span>
              </Link></li>
              <li><Link href="/get-involved" className="hover:text-primary transition-colors duration-300 flex items-center space-x-2">
                <span className="hover:translate-x-2 transition-transform duration-300">Get Involved</span>
              </Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors duration-300 flex items-center space-x-2">
                <span className="hover:translate-x-2 transition-transform duration-300">Contact</span>
              </Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-12 after:h-1 after:bg-primary">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-primary" />
                <span>Universitas Pembagungan Jaya</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary" />
                <span>clean4earth@upj.ac.id</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary" />
                <span>(+62) 86771882690</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-12 after:h-1 after:bg-primary">
              Follow Us
            </h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/clean4earthh/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors duration-300">
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-2 after:w-12 after:h-1 after:bg-primary">
              Newsletter
            </h4>
            <p className="text-white/80">Stay updated with our latest news and events.</p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/80">&copy; {new Date().getFullYear()} Clean4Earth. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
