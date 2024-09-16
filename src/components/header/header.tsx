import Link from 'next/link';
import useAuth from '@/hooks/use-auth';
import { Routes } from '../../utils/routes';
import { useState } from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

export default function Header() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-black text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Examination system</h1>
        <nav className="flex items-center space-x-4">
        {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
              >
                <FaUserCircle size={30}/>
                <span className="text-white ml-2">{user.email}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
                  <button
                    onClick={logout}
                    className="flex w-full items-center text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    <FaSignOutAlt size={20}/>
                    <span className="text-black ml-2">Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href={Routes.auth.login} className="text-white">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
