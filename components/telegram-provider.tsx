"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

// Define the Telegram WebApp interface
interface TelegramWebApp {
  initData: string
  initDataUnsafe: {
    query_id: string
    user: {
      id: number
      first_name: string
      last_name?: string
      username?: string
      language_code?: string
    }
    auth_date: string
    hash: string
  }
  ready: () => void
  expand: () => void
  close: () => void
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    isProgressVisible: boolean
    show: () => void
    hide: () => void
    enable: () => void
    disable: () => void
    showProgress: (leaveActive: boolean) => void
    hideProgress: () => void
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
    setText: (text: string) => void
  }
  BackButton: {
    isVisible: boolean
    show: () => void
    hide: () => void
    onClick: (callback: () => void) => void
    offClick: (callback: () => void) => void
  }
  HapticFeedback: {
    impactOccurred: (style: "light" | "medium" | "heavy" | "rigid" | "soft") => void
    notificationOccurred: (type: "error" | "success" | "warning") => void
    selectionChanged: () => void
  }
  isVersionAtLeast: (version: string) => boolean
  setHeaderColor: (color: string) => void
  setBackgroundColor: (color: string) => void
}

// Create a context for the Telegram WebApp
const TelegramContext = createContext<{
  webApp: TelegramWebApp | null
  user: any | null
  isReady: boolean
}>({
  webApp: null,
  user: null,
  isReady: false,
})

// Custom hook to use the Telegram context
export const useTelegram = () => useContext(TelegramContext)

// Provider component
export default function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null)
  const [user, setUser] = useState<any | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Access the Telegram WebApp from the window object
      const tgWebApp = (window as any).Telegram?.WebApp

      if (tgWebApp) {
        setWebApp(tgWebApp)

        // Tell Telegram WebApp we're ready
        tgWebApp.ready()

        // Expand the WebApp to take the full screen
        tgWebApp.expand()

        // Set user if available
        if (tgWebApp.initDataUnsafe?.user) {
          setUser(tgWebApp.initDataUnsafe.user)
        } else {
          // For development, use a mock user
          setUser({
            id: 12345678,
            first_name: "Test",
            username: "testuser",
          })
        }

        setIsReady(true)
      } else {
        // For development without Telegram
        console.log("Telegram WebApp not found, using mock data")
        setIsReady(true)
        setUser({
          id: 12345678,
          first_name: "Test",
          username: "testuser",
        })
      }
    }
  }, [])

  return <TelegramContext.Provider value={{ webApp, user, isReady }}>{children}</TelegramContext.Provider>
}

