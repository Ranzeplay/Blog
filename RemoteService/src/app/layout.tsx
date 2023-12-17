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
  '/whoami',
  '/article/read'
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
        {shouldShowOutline(path) && (
          <header className="root-container">
            <NavBarComponent></NavBarComponent>
          </header>
        )}

        <main className={`${shouldShowOutline(path) && 'root-container min-h-screen'}`}>
          {children}
        </main>

        {shouldShowOutline(path) && (
          <FooterComponent></FooterComponent>
        )}
      </body>
    </html>
  )
}

function shouldShowOutline(path: string): boolean {
  return !hiddenPath.some(p => path.startsWith(p));
}
