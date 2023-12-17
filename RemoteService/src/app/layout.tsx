'use client';

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBarComponent from './components/nav/nav.module'
import { usePathname, useRouter } from 'next/navigation'
import FooterComponent from './components/footer/footer.module';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Welcome to my blog website.',
}

const hiddenPath: Array<string> = [
  '/',
  '/whoami'
]

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const path = usePathname();

  return (
    <html lang="en">
      <body className={inter.className + " background"}>
        {!hiddenPath.includes(path) && (
          <header className="root-container">
            <NavBarComponent></NavBarComponent>
          </header>
        )}

        <main className={`${!hiddenPath.includes(path) && 'root-container'}`}>
          {children}
        </main>

        {!hiddenPath.includes(path) && (
          <FooterComponent></FooterComponent>
        )}
      </body>
    </html>
  )
}
