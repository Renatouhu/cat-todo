import { Inter } from 'next/font/google'
import styles from '../../styles/body.module.sass'
import '../../styles/global.sass'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cat Todo',
  description: 'A todo with cat theme',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.body}`}>{children}</body>
    </html>
  )
}
