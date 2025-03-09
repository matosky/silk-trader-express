"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useTelegram } from "@/components/telegram-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { mockUsers } from "@/lib/utils"

export default function Home() {
  const { user, isReady } = useTelegram()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [existingUser, setExistingUser] = useState<any>(null)

  useEffect(() => {
    if (isReady && user) {
      // Check if user exists in our mock database
      const found = mockUsers.find((u) => u.telegramId === user.id)
      setExistingUser(found)
      setLoading(false)
    }
  }, [isReady, user])

  const handleStart = () => {
    if (existingUser) {
      router.push("/dashboard")
    } else {
      router.push("/onboarding")
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="animate-float">
          <svg
            className="w-16 h-16 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" />
            <line x1="15" y1="9" x2="15.01" y2="9" />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-bold">Loading Silk Road Challenge...</h2>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[url('/placeholder.svg?height=800&width=600')] bg-cover bg-center">
      <div className="w-full max-w-md">
        <Card className="border-2 border-primary/50 backdrop-blur-sm bg-background/90">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">Silk Road Challenge</CardTitle>
            <CardDescription>Trade, Navigate, Conquer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold">
                Welcome, {existingUser ? existingUser.nickname : user?.first_name}!
              </h2>
              <p className="mt-2 text-muted-foreground">
                {existingUser
                  ? `Continue your journey with ${existingUser.balance} $wSRC tokens`
                  : "Begin your journey on the ancient Silk Road"}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleStart} className="w-full">
              {existingUser ? "Continue Journey" : "Start Adventure"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

