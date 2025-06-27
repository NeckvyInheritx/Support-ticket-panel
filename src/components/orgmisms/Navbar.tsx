// 'use client';

// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation'; // For navigation
// import Button from '../atoms/Button';

// import Avatar from '../atoms/Avatar';
// import { useAuth } from '@/context/AuthContext';

// const Navbar: React.FC = () => {
//   const router = useRouter();
//   const { user, logout } = useAuth();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const handleLogout = () => {
//     // In a real app, this would be an API call to Medusa's logout endpoint
//     // e.g., medusaClient.auth.deleteSession();
//     logout();
//     router.push('/'); // Redirect to home page after logout
//     setIsMobileMenuOpen(false); // Close mobile menu on logout
//   };

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <nav className="bg-white text-black shadow-md z-5 w-full sticky top-0">
//       <div className="container mx-auto px-6 sm:px-6 lg:px-8 w-full">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo/Brand */}
//           <Link
//             href="/dashboard"
//             className="text-lg sm:text-xl font-bold tracking-tight flex-shrink-0"
//             onClick={closeMobileMenu}
//           >
//             Support Panel
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-4">
//               <>
//                 {/* Profile Avatar and Name */}
//                 <div className="flex items-center space-x-3">
//                   <Avatar name={user?.name} size="medium" />
//                   <span className="font-medium text-sm lg:text-base">{user?.name}</span>
//                 </div>
//                 {/* Logout Button */}
//                 <Button
//                   variant="outline"
//                   size="small"
//                   onClick={handleLogout}
//                   className="whitespace-nowrap"
//                 >
//                   Logout
//                 </Button>
//               </>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <button
//               onClick={toggleMobileMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
//               aria-expanded="false"
//               aria-label="Toggle navigation menu"
//             >
//               <span className="sr-only">Open main menu</span>
//               {/* Hamburger Icon */}
//               <svg
//                 className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//               {/* Close Icon */}
//               <svg
//                 className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 aria-hidden="true"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700 bg-gray-800">
//               <>
//                 {/* Mobile Profile Section */}
//                 <div className="flex items-center space-x-3 px-3 py-3">
//                   <Avatar name={user?.name} size="large" />
//                   <div className="flex flex-col">
//                     <span className="font-medium text-sm">{user?.name}</span>
//                   </div>
//                 </div>

//                 {/* Mobile Navigation Links */}
//                 {/* <div className="space-y-1">
//                   <Link
//                     href="/dashboard"
//                     className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
//                     onClick={closeMobileMenu}
//                   >
//                     Dashboard
//                   </Link>
//                   <Link
//                     href="/tickets"
//                     className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
//                     onClick={closeMobileMenu}
//                   >
//                     My Tickets
//                   </Link>
//                   <Link
//                     href="/profile"
//                     className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
//                     onClick={closeMobileMenu}
//                   >
//                     Profile
//                   </Link>
//                 </div> */}

//                 {/* Mobile Logout Button */}
//                 <div className="pt-4 pb-3 border-t border-gray-700">
//                   <Button
//                     variant="outline"
//                     size="medium"
//                     onClick={handleLogout}
//                     className="w-full justify-center"
//                   >
//                     Logout
//                   </Button>
//                 </div>
//               </>

//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '../atoms/Button'
import Avatar from '../atoms/Avatar'
import { useAuth } from '@/context/AuthContext'
import ProfileModal from '../atoms/ProfileModal'

const Navbar: React.FC = () => {
  const router = useRouter()
  const {  logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)

  const fullName = "Test User"
  // const fullName =
  //   user?.firstName && user?.lastName
  //     ? `${user.firstName} ${user.lastName}`
  //     : 'N/A'

  const handleLogout = () => {
    logout()
    router.push('/')
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white text-black shadow-md z-5 w-full sticky top-0">
      <div className="container mx-auto px-6 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            href="/dashboard"
            className="text-lg sm:text-xl font-bold tracking-tight flex-shrink-0"
          >
            Support Panel
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Avatar + Modal */}
            <div
              className="relative"
              onMouseEnter={() => setIsProfileModalOpen(true)}
              onMouseLeave={() => setIsProfileModalOpen(false)}
            >
              <div className="flex items-center space-x-3 cursor-pointer">
                <Avatar name={fullName} size="medium" />
                <span className="font-medium text-sm lg:text-base">
                  {fullName}
                </span>
              </div>
              {isProfileModalOpen && <ProfileModal onLogout={handleLogout} />}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700 bg-gray-800">
            <div className="flex items-center space-x-3 px-3 py-3">
              <Avatar name={fullName} size="large" />
              <span className="font-medium text-sm">{fullName}</span>
            </div>

            <div className="pt-4 pb-3 border-t border-gray-700">
              <Button
                variant="outline"
                size="medium"
                onClick={handleLogout}
                className="w-full justify-center"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
