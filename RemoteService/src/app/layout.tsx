import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBarComponent from './components/nav/nav.module'

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
  return (
    <html lang="en">
      <body className={inter.className + " background"}>
        <header className="root-container">
          <NavBarComponent></NavBarComponent>
        </header>
        <main className="root-container">
          {children}
        </main>
      </body>
    </html>
  )
}
