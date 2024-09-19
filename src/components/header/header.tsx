import useAuth from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { Routes } from '../../utils/routes';

export default function Header() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(()=>{
    setDropdownOpen(false);
  },[user])

  return (
    <header className="bg-black text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between">
        <h1 onClick={()=>{router.push(Routes.private.lessons)}} className="text-2xl font-bold cursor-pointer">Examination system</h1>
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
          ) : null}
        </nav>
      </div>
    </header>
  );
};
