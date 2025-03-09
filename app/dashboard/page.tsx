"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTelegram } from "@/components/telegram-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Coins, Map, User } from "lucide-react"
import { mockUsers, tradeRoutes } from "@/lib/utils"

export default function Dashboard() {
  const { user } = useTelegram()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("routes")

  // Find user in mock data or create a new one
  const currentUser = mockUsers.find((u) => u.telegramId === user?.id) || {
    id: 0,
    telegramId: user?.id || 0,
    username: user?.username || "newtrader",
    nickname: "New Trader",
    balance: 500,
    rank: mockUsers.length + 1,
  }

  const handleStartRoute = (routeId: number) => {
    router.push(`/route/${routeId}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4">
        <div className="container max-w-md mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Silk Road Challenge</h1>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <Coins className="w-4 h-4 text-primary" />
              <span className="font-medium">{currentUser.balance}</span>
            </span>
            <Button variant="ghost" size="icon" onClick={() => setActiveTab("profile")}>
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container max-w-md mx-auto p-4 pb-20">
        {activeTab === "routes" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Trade Routes</h2>
            <p className="text-muted-foreground">Select a route to begin your trading journey</p>

            <div className="space-y-4">
              {tradeRoutes.map((route) => (
                <Card key={route.id} className="overflow-hidden border-2 hover:border-primary/50 transition-all">
                  <div className="relative h-32 bg-muted">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${route.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          route.difficulty === "Easy"
                            ? "bg-green-500/20 text-green-500"
                            : route.difficulty === "Medium"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-red-500/20 text-red-500"
                        }`}
                      >
                        {route.difficulty}
                      </span>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle>{route.name}</CardTitle>
                    <CardDescription>{route.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4 text-primary" />
                        <span className="font-medium">{route.rewards} $wSRC</span>
                      </div>
                      <Button onClick={() => handleStartRoute(route.id)}>Start Route</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "leaderboard" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Leaderboard</h2>
            <p className="text-muted-foreground">Top traders on the Silk Road</p>

            <div className="space-y-2">
              {mockUsers.slice(0, 10).map((user, index) => (
                <div
                  key={user.id}
                  className={`flex items-center p-3 rounded-lg ${
                    user.id === currentUser.id ? "bg-primary/10 border border-primary/30" : "bg-card"
                  }`}
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-muted">{index + 1}</div>
                  <div className="ml-3 flex-1">
                    <div className="font-medium">{user.nickname}</div>
                    <div className="text-sm text-muted-foreground">@{user.username}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Coins className="w-4 h-4 text-primary" />
                    <span className="font-medium">{user.balance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">My Profile</h2>

            <Card>
              <CardHeader>
                <CardTitle>{currentUser.nickname}</CardTitle>
                <CardDescription>@{currentUser.username}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Balance</span>
                  <span className="font-medium flex items-center gap-1">
                    <Coins className="w-4 h-4 text-primary" />
                    {currentUser.balance} $wSRC
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Rank</span>
                  <span className="font-medium flex items-center gap-1">
                    <Award className="w-4 h-4 text-primary" />#{currentUser.rank}
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Routes Completed</span>
                  <span className="font-medium">3</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                  <span className="text-muted-foreground">Challenges Solved</span>
                  <span className="font-medium">12</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border">
        <div className="container max-w-md mx-auto flex justify-around">
          <Button
            variant={activeTab === "routes" ? "default" : "ghost"}
            className="flex-1 flex-col py-3 h-auto rounded-none"
            onClick={() => setActiveTab("routes")}
          >
            <Map className="w-5 h-5" />
            <span className="text-xs mt-1">Routes</span>
          </Button>
          <Button
            variant={activeTab === "leaderboard" ? "default" : "ghost"}
            className="flex-1 flex-col py-3 h-auto rounded-none"
            onClick={() => setActiveTab("leaderboard")}
          >
            <Award className="w-5 h-5" />
            <span className="text-xs mt-1">Leaderboard</span>
          </Button>
          <Button
            variant={activeTab === "profile" ? "default" : "ghost"}
            className="flex-1 flex-col py-3 h-auto rounded-none"
            onClick={() => setActiveTab("profile")}
          >
            <User className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}

