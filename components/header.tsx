

'use client'
import Link from 'next/link'
import { useState } from 'react'
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className='sticky  top-0 z-50  backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm'>
      <nav className='container mx-auto flex items-center justify-between py-3 px-4'>
        {/* Logo */}
        <Link
          href='/'
          className='flex items-center gap-2 font-bold text-xl text-primary hover:text-primary/80 transition-colors'
        >
          <svg width='28' height='28' fill='none' viewBox='0 0 24 24'>
            <circle cx='12' cy='12' r='10' fill='#6366f1' />
            <text
              x='12'
              y='17'
              textAnchor='middle'
              fontSize='12'
              fill='#fff'
              fontFamily='Poppins, sans-serif'
            >
              M
            </text>
          </svg>
          MediumClone
        </Link>

        {/* Desktop Nav */}
        <ul className='hidden md:flex gap-8 text-base font-medium'>
          <li>
            <Link
              href='/'
              className='hover:text-primary transition-colors'
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href='/protected/server'
              className='hover:text-primary transition-colors'
            >
              Protected (server)
            </Link>
          </li>
          <li>
            <Link
              href='/protected/client'
              className='hover:text-primary transition-colors'
            >
              Protected (client)
            </Link>
          </li>
          <li>
            <Link
              href='/api/me'
              className='hover:text-primary transition-colors'
            >
              Who am I?
            </Link>
          </li>
        </ul>

        {/* Actions */}
        <div className='flex items-center gap-3'>
          <ThemeToggle />
          <SignedOut>
            <SignInButton mode='modal'>
              <Button
                size='sm'
                className='bg-primary text-white hover:bg-primary/90 transition-colors'
              >
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {/* Hamburger */}
          <button
            className='md:hidden ml-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition'
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label='Toggle menu'
          >
            <svg width='24' height='24' fill='none' stroke='currentColor' strokeWidth='2'>
              <path d='M4 6h16M4 12h16M4 18h16' />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className='md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 shadow'>
          <ul className='flex flex-col gap-2 px-6 py-4 text-base font-medium'>
            <li>
              <Link
                href='/'
                className='block py-2 hover:text-primary transition-colors'
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href='/protected/server'
                className='block py-2 hover:text-primary transition-colors'
                onClick={() => setMenuOpen(false)}
              >
                Protected (server)
              </Link>
            </li>
            <li>
              <Link
                href='/protected/client'
                className='block py-2 hover:text-primary transition-colors'
                onClick={() => setMenuOpen(false)}
              >
                Protected (client)
              </Link>
            </li>
            <li>
              <Link
                href='/api/me'
                className='block py-2 hover:text-primary transition-colors'
                onClick={() => setMenuOpen(false)}
              >
                Who am I?
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
