import { Inter } from 'next/font/google'
import '../../styles/global.sass'
import { currentTheme } from '../../public/themes/themes'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cat Todo',
  description: 'A todo with cat theme',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`} style={{backgroundColor: currentTheme.colors.surface }} >{children}</body>
    </html>
  )
}
