'use client';
import { useState } from 'react';
import {
  HomeIcon,
  UserGroupIcon,
  PuzzlePieceIcon,
  TableCellsIcon,
  CogIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Sidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    general: false,
    users: false,
    prequests : false,
    withdraw: false,
    bankaccounts: false,
    packages: false,
    settings: false,
    admin: false,
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const toggleDropdown = (key) => {
    setIsDropdownOpen((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleLogout = () => {
    setShowConfirmation(true); // Show confirmation dialog
  };

  const confirmLogout = () => {
    // Perform logout logic here (e.g., delete JWT token, reset user state)
    localStorage.removeItem('jwtToken'); // Assuming the token is stored in localStorage
    // Close confirmation dialog
    setShowConfirmation(false);
    // Redirect to home page
    window.location.href = '/'; // Adjust the redirect URL as needed
  };

  const cancelLogout = () => {
    // Close confirmation dialog without logging out
    setShowConfirmation(false);
  };

  return (
    <div className="bg-blue-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4 text-center">
        <img
          width={50}
          height={50}
          src="/m3x_logo.png"
          alt="Profile"
          className="rounded-full mx-auto mb-2"
        />
        <h2 className="text-lg font-semibold">M3X Traders</h2>
        <p className="text-green-400">● Online</p>
      </div>
      <div className="p-4 border-t border-gray-700">
        <h3 className="text-gray-400 uppercase tracking-wide">General</h3>
        <ul className="mt-4 space-y-2">
          <li>
            <Link href="/home" legacyBehavior>
              <a className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none">
                <HomeIcon className="h-5 w-5" />
                <span className="ml-2">General</span>
              </a>
            </Link>
          </li>
          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('users')}
            >
              <UserGroupIcon className="h-5 w-5" />
              <span className="ml-2">Users</span>
              <ChevronDownIcon className="h-5 w-5 ml-auto" />
            </button>
            {isDropdownOpen.users && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <Link href="/admin/pages/users" legacyBehavior>
                    <a className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">User's List</span>
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </li>



          


          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('prequests')}
            >
              <PuzzlePieceIcon className="h-5 w-5" />
              <span className="ml-2">Package Requests</span>
              <ChevronDownIcon className="h-5 w-5 ml-auto" />
            </button>
            {isDropdownOpen.prequests && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <Link href="/admin/pages/pakageRequests" legacyBehavior>
                    <a className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Packages List</span>
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </li>



          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('bankaccounts')}>
              <UserGroupIcon className="h-5 w-5" />
              <span className="ml-2">Bank Accounts</span>
              <ChevronDownIcon className="h-5 w-5 ml-auto" />
            </button>
            {isDropdownOpen.bankaccounts && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <Link href="/admin/pages/bankaccounts" legacyBehavior>
                    <a className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Accounts's List</span>
                    </a>
                  </Link>
                </li>
              </ul> )}
          </li>



          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('withdraw')}
            >
              <PuzzlePieceIcon className="h-5 w-5" />
              <span className="ml-2">Withdraw Request</span>
              <ChevronDownIcon className="h-5 w-5 ml-auto" />
            </button>
            {isDropdownOpen.withdraw && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <Link href="/admin/pages/withdraws" legacyBehavior>
                    <a className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Withdraw List</span>
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('packages')}
            >
              <TableCellsIcon className="h-5 w-5" />
              <span className="ml-2">Packages</span>
              <ChevronDownIcon className="h-5 w-5 ml-auto" />
            </button>
            {isDropdownOpen.packages && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <Link href="/admin/pages/packages" legacyBehavior>
                    <a className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Packages</span>
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('settings')}
            >
              <CogIcon className="h-5 w-5" />
              <span className="ml-2">Settings</span>
              <ChevronDownIcon className="h-5 w-5 ml-auto" />
            </button>
            {isDropdownOpen.settings && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <Link href="/admin/pages/settings" legacyBehavior>
                    <a className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Update Settings</span>
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={() => toggleDropdown('admin')}
            >
              <ShieldCheckIcon className="h-5 w-5" />
              <span className="ml-2">Admin Account</span>
              <ChevronDownIcon className="h-5 w-5 ml-auto" />
            </button>
            {isDropdownOpen.admin && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <Link href="/admin/pages/newadmin" legacyBehavior>
                    <a className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Create New Admin</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/admin/pages/update" legacyBehavior>
                    <a className="flex items-center p-2 hover:bg-blue-700 rounded">
                      <span className="ml-2">Update Admin</span>
                    </a>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              className="flex items-center w-full p-2 hover:bg-blue-700 rounded focus:outline-none"
              onClick={handleLogout} // Ask for confirmation before logout
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              <span className="ml-2">Logout</span>
            </button>
            {showConfirmation && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                  <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
                  <p className="mb-4">Are you sure you want to logout?</p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={confirmLogout}
                      className="bg-red-600 px-4 py-2 text-white rounded"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={cancelLogout}
                      className="bg-gray-600 px-4 py-2 text-white rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
