"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, CheckCircle, Coins, MapPin, XCircle } from "lucide-react"
import { Award } from "lucide-react" // Import Award icon
import { determineOutcome, getRandomChallenge, tradeRoutes } from "@/lib/utils"

export default function TradingRoute({ params }: { params: { id: string } }) {
  const router = useRouter()
  const routeId = Number.parseInt(params.id)
  const route = tradeRoutes.find((r) => r.id === routeId)

  const [currentCity, setCurrentCity] = useState(0)
  const [progress, setProgress] = useState(0)
  const [challenge, setChallenge] = useState<any>(null)
  const [showChallenge, setShowChallenge] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState<"traditional" | "modern" | null>(null)
  const [selectedSolution, setSelectedSolution] = useState<any>(null)
  const [outcome, setOutcome] = useState<"success" | "failure" | null>(null)
  const [showOutcome, setShowOutcome] = useState(false)
  const [earnedTokens, setEarnedTokens] = useState(0)
  const [showCompletion, setShowCompletion] = useState(false)
  const [totalEarned, setTotalEarned] = useState(0)

  useEffect(() => {
    if (!route) {
      router.push("/dashboard")
      return
    }

    // Generate a random challenge when entering a new city
    if (currentCity < route.cities.length) {
      const newChallenge = getRandomChallenge()
      setChallenge(newChallenge)

      // Show challenge after a short delay
      const timer = setTimeout(() => {
        setShowChallenge(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [currentCity, route, router])

  const handleSelectMethod = (method: "traditional" | "modern") => {
    setSelectedMethod(method)
  }

  const handleSelectSolution = (solution: any) => {
    setSelectedSolution(solution)

    // Determine outcome
    const success = determineOutcome(solution.successRate)
    setOutcome(success ? "success" : "failure")

    // Calculate tokens earned
    const tokensEarned = success ? Math.floor(route!.rewards / route!.cities.length) : 0
    setEarnedTokens(tokensEarned)
    setTotalEarned((prev) => prev + tokensEarned)

    // Show outcome
    setShowOutcome(true)
  }

  const handleContinue = () => {
    setShowOutcome(false)
    setSelectedMethod(null)
    setSelectedSolution(null)

    if (outcome === "success") {
      // Move to next city
      const nextCity = currentCity + 1
      setCurrentCity(nextCity)

      // Update progress
      const newProgress = Math.floor((nextCity / route!.cities.length) * 100)
      setProgress(newProgress)

      // Check if route is complete
      if (nextCity >= route!.cities.length) {
        setShowCompletion(true)
      }
    } else {
      // For failure, we'll give another chance with a new challenge
      const newChallenge = getRandomChallenge()
      setChallenge(newChallenge)
      setShowChallenge(true)
    }
  }

  const handleFinishRoute = () => {
    router.push("/dashboard")
  }

  if (!route) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4">
        <div className="container max-w-md mx-auto flex justify-between items-center">
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold text-primary">{route.name}</h1>
          <div className="flex items-center gap-1">
            <Coins className="w-4 h-4 text-primary" />
            <span className="font-medium">{totalEarned}</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container max-w-md mx-auto p-4 pb-20">
        {/* Progress bar */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span>{route.cities[0]}</span>
            <span>{route.cities[route.cities.length - 1]}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Progress: {progress}%</span>
            <span className="text-sm font-medium">
              {currentCity} / {route.cities.length} cities
            </span>
          </div>
        </div>

        {/* Map visualization */}
        <Card className="mb-6 overflow-hidden">
          <div className="relative h-48 bg-muted">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(/placeholder.svg?height=300&width=500)` }}
            >
              {/* SVG path connecting cities */}
              <svg className="w-full h-full" viewBox="0 0 500 300">
                <path
                  d="M50,150 C150,50 350,250 450,150"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  className="map-path"
                />

                {/* City markers */}
                {route.cities.map((city, index) => {
                  // Calculate position along the path
                  const x = 50 + index * (400 / (route.cities.length - 1))
                  const y = 150 + (index % 2 === 0 ? -30 : 30)

                  return (
                    <g key={city} className={index <= currentCity ? "text-primary" : "text-muted-foreground"}>
                      <circle
                        cx={x}
                        cy={y}
                        r="8"
                        fill={
                          index < currentCity
                            ? "hsl(var(--primary))"
                            : index === currentCity
                              ? "white"
                              : "hsl(var(--muted))"
                        }
                        stroke={index <= currentCity ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                        strokeWidth="2"
                        className={index === currentCity ? "city-marker" : ""}
                      />
                      <text x={x} y={y + 20} textAnchor="middle" fill="currentColor" fontSize="12">
                        {city}
                      </text>
                    </g>
                  )
                })}
              </svg>
            </div>
          </div>
          <CardContent className="py-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="font-medium">
                {currentCity < route.cities.length
                  ? `Current location: ${route.cities[currentCity]}`
                  : "Route completed!"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Current city info */}
        {currentCity < route.cities.length && (
          <Card>
            <CardHeader>
              <CardTitle>{route.cities[currentCity]}</CardTitle>
              <CardDescription>
                {currentCity === 0
                  ? "Your journey begins here"
                  : `${currentCity}/${route.cities.length - 1} stops completed`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                {!showChallenge
                  ? "Exploring the city..."
                  : "A challenge has appeared! Resolve it to continue your journey."}
              </p>
            </CardContent>
            <CardFooter>
              {!showChallenge && (
                <Button className="w-full" disabled>
                  Discovering challenges...
                </Button>
              )}
            </CardFooter>
          </Card>
        )}
      </main>

      {/* Challenge dialog */}
      <Dialog open={showChallenge && !showOutcome} onOpenChange={setShowChallenge}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{challenge?.title}</DialogTitle>
            <DialogDescription>{challenge?.context}</DialogDescription>
          </DialogHeader>

          {!selectedMethod ? (
            <div className="space-y-4 py-4">
              <p className="font-medium">Choose your approach:</p>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-auto py-6 flex flex-col gap-2"
                  onClick={() => handleSelectMethod("traditional")}
                >
                  <span className="text-lg font-semibold">Traditional</span>
                  <span className="text-sm text-muted-foreground">Time-tested methods</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-6 flex flex-col gap-2"
                  onClick={() => handleSelectMethod("modern")}
                >
                  <span className="text-lg font-semibold">Modern</span>
                  <span className="text-sm text-muted-foreground">Tech-powered solutions</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <p className="font-medium">Select a solution:</p>
              <div className="space-y-3">
                {challenge?.solutions[selectedMethod].map((solution: any) => (
                  <Button
                    key={solution.id}
                    variant="outline"
                    className="w-full justify-between h-auto py-3"
                    onClick={() => handleSelectSolution(solution)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{solution.name}</div>
                      <div className="text-sm text-muted-foreground">{solution.description}</div>
                    </div>
                    <div className="text-sm font-medium">{solution.successRate}%</div>
                  </Button>
                ))}
              </div>
              <Button variant="ghost" className="w-full" onClick={() => setSelectedMethod(null)}>
                Back to methods
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Outcome dialog */}
      <Dialog open={showOutcome} onOpenChange={setShowOutcome}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {outcome === "success" ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Success!
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-500" />
                  Challenge Failed
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {outcome === "success"
                ? `Your ${selectedSolution?.name} approach worked perfectly!`
                : "Your approach didn't work this time. Try a different solution."}
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {outcome === "success" ? (
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm">
                  {selectedMethod === "traditional"
                    ? "Your traditional approach proved reliable and effective."
                    : "Your innovative solution solved the problem efficiently."}
                </p>
                <div className="mt-3 flex items-center gap-2 font-medium">
                  <Coins className="w-5 h-5 text-primary" />
                  <span>Earned {earnedTokens} $wSRC tokens</span>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm">
                  {selectedMethod === "traditional"
                    ? "This traditional method wasn't suitable for this particular challenge."
                    : "This modern solution had technical issues that prevented success."}
                </p>
                <p className="mt-2 text-sm">Don't worry, you can try again with a different approach.</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button onClick={handleContinue}>{outcome === "success" ? "Continue Journey" : "Try Again"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Route completion dialog */}
      <Dialog open={showCompletion} onOpenChange={setShowCompletion}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Route Completed!
            </DialogTitle>
            <DialogDescription>
              Congratulations! You've successfully completed the {route.name} trade route.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <h3 className="font-medium">Trade Report</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Distance:</span>
                  <span>4,500 miles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cities Visited:</span>
                  <span>{route.cities.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Challenges Overcome:</span>
                  <span>{route.cities.length}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total Earnings:</span>
                  <span className="flex items-center gap-1">
                    <Coins className="w-4 h-4 text-primary" />
                    {totalEarned} $wSRC
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h3 className="font-medium flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Trade Efficiency Rating
              </h3>
              <div className="mt-3 text-center">
                <div className="text-2xl font-bold text-primary">Gold</div>
                <p className="text-sm text-muted-foreground mt-1">
                  You've earned the highest rating! Your trading skills are exceptional.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={handleFinishRoute}>Return to Dashboard</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

