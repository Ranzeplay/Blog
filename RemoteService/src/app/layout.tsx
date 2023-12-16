'use client';

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBarComponent from './components/nav/nav.module'
import { usePathname, useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Welcome to my blog website.',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const path = usePathname();

  return (
    <html lang="en">
      <body className={inter.className + " background"}>
        {path !== '/welcome' && (
          <header className="root-container">
            <NavBarComponent></NavBarComponent>
          </header>
        )}

        <main className={`${path !== '/welcome' && 'root-container'}`}>
          {children}
        </main>
      </body>
    </html>
  )
}
