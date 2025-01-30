import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'My Personal Profile Page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}