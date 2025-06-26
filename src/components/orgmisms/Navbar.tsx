'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation' // For navigation
// import Button from '../atoms/Button'

import Avatar from '../atoms/Avatar'
import { useAuth } from '@/context/AuthContext'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { LogOut, Settings, Ticket, UserCircle } from 'lucide-react'
import { Button } from '../ui/button'

const Navbar: React.FC = () => {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const avatarButtonRef = useRef<HTMLButtonElement>(null)

  const handleLogout = () => {
    // In a real app, this would be an API call to Medusa's logout endpoint
    // e.g., medusaClient.auth.deleteSession();
    logout()
    router.push('/') // Redirect to home page after logout
    setIsMobileMenuOpen(false) // Close mobile menu on logout
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-white text-black shadow-md z-5 w-full sticky top-0">
      <div className="max-w-[1368px] mx-auto px-6 md:px-6 sm:px-6 lg:px-8 xl:px0 w-full">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            href="/dashboard"
            className="text-lg sm:text-xl font-bold tracking-tight flex-shrink-0"
            style={{ color: 'hsl(206 76% 70%)' }}
            onClick={closeMobileMenu}
          >
            Support Panel
          </Link>

          {/* Desktop Navigation */}
          <div className=" md:flex items-center space-x-4">
            {/* <>
              <div className="flex items-center space-x-3">
                <Avatar name={user?.name} size="medium" />
                <span className="font-medium text-sm lg:text-base">
                  {user?.name}
                </span>
              </div>
        
              <Button
                variant="outline"
                size="small"
                onClick={handleLogout}
                className="whitespace-nowrap"
              >
                Logout
              </Button>
            </> */}
            <>
              <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link href="/tickets/new">
                  <Ticket className="mr-2 h-4 w-4" />
                  New Ticket
                </Link>
              </Button>
              <DropdownMenu
                onOpenChange={(open) => {
                  if (!open) {
                    avatarButtonRef.current?.blur() // remove focus when closed
                  }
                }}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    ref={avatarButtonRef}
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                  >
                    {/* <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={`https://placehold.co/100x100.png?text=${getInitials(user.name)}`}
                        alt={user.name || user.email}
                        data-ai-hint="user avatar"
                      />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar> */}
                    <Avatar name={user?.name} size="medium" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-white rounded-xl py-2 border border-gray-200"
                  align="end"
                >
                  <DropdownMenuLabel className="font-normal border-b border-b-gray-200 px-3 pb-1">
                    <div className="flex flex-col ">
                      <p className="text-sm font-medium leading-none !mb-1">
                        {user?.name || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground !mb-1">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex px-3 py-2">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex px-3 py-2">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex px-3 pb-1 pt-2 border-t border-t-gray-200"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          </div>

          {/* Mobile menu button */}
          <div className="hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              aria-expanded="false"
              aria-label="Toggle navigation menu"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg
                className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Close Icon */}
              <svg
                className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-700 bg-gray-200">
            <>
              {/* Mobile Profile Section */}
              <div className="flex items-center space-x-3 px-3 py-3">
                <Avatar name={user?.name} size="large" />
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{user?.name}</span>
                </div>
              </div>

              {/* Mobile Navigation Links */}
              {/* <div className="space-y-1">
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/tickets"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    My Tickets
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                    onClick={closeMobileMenu}
                  >
                    Profile
                  </Link>
                </div> */}

              {/* Mobile Logout Button */}
              {/* <div className="pt-4 pb-3 border-t border-gray-700">
                <Button
                  variant="outline"
                  size="medium"
                  onClick={handleLogout}
                  className="w-full justify-center"
                >
                  Logout
                </Button>
              </div> */}
              <div className="pt-4 pb-3 border-t border-gray-700 px-4">
                <Button
                  ref={avatarButtonRef}
                  variant="ghost"
                  onClick={handleLogout}
                  className="relative h-10 w-10 rounded-full "
                >
                  {/* <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={`https://placehold.co/100x100.png?text=${getInitials(user.name)}`}
                        alt={user.name || user.email}
                        data-ai-hint="user avatar"
                      />
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar> */}
                  Logout
                </Button>
              </div>
            </>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
