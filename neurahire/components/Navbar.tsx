'use client'

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useContext, useState } from "react";
import Link from 'next/link';
import { UserDetailContext } from "@/context/UserContext";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserDetailContext);

  const handleLogout = () => {
    // clear user context or perform actual logout logic here
    setUser(null);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Image src="/logo.png" alt="Logo" width={250} height={120}  />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors">How it Works</a>
            <a href="#testimonials" className="text-gray-600 hover:text-purple-600 transition-colors">Testimonials</a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {!user && (
              <Link href="/auth">
                <Button variant="ghost" className="text-gray-600 hover:text-purple-600">Sign In</Button>
              </Link>
            )}

            {user ? (
              <>
                <Link href="/dashboard">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white">
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" onClick={handleLogout} className="text-gray-600 hover:text-red-500">
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white">
                  Get Started
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-purple-600 transition-colors">How it Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-purple-600 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-600 hover:text-purple-600 transition-colors">Pricing</a>

              <div className="flex flex-col space-y-2 pt-4">
                {!user && (
                  <Link href="/auth">
                    <Button variant="ghost" className="text-gray-600 hover:text-purple-600 justify-start">Sign In</Button>
                  </Link>
                )}
                {user && (
                 
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="text-gray-600 hover:text-red-500 justify-start"
                    >
                      Logout
                    </Button>
                  
                ) }
                  <Link href="/dashboard">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-500 text-white w-full justify-center">
                      Get Started
                    </Button>
                  </Link>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
