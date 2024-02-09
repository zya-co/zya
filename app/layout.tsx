import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zya desfault title',
  description: 'Zya desfault description',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}