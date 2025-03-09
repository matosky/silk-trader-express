import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import TelegramProvider from "@/components/telegram-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Silk Road Challenge",
  description: "A trading game on the ancient Silk Road",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TelegramProvider>{children}</TelegramProvider>
      </body>
    </html>
  )
}



import './globals.css'