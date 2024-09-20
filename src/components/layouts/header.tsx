import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { Routes } from '../../utils/routes';
import useAuth from '../../hooks/use-auth';

export default function Header() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    setDropdownOpen(false);
  }, [user]);

  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white py-4 h-30 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1
          onClick={() => {
            router.push(Routes.private.lessons);
          }}
          className="text-2xl font-bold cursor-pointer"
        >
          Examination System
        </h1>
        <nav className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center focus:outline-none"
              >
                <FaUserCircle className="w-6 h-6 mr-2" />
                <span>{user.email}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                  <button
                    onClick={() => {
                      logout();
                      router.push(Routes.auth.login);
                    }}
                    className="flex items-center w-full px-4 py-2 hover:bg-gray-200"
                  >
                    <FaSignOutAlt className="w-5 h-5 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}