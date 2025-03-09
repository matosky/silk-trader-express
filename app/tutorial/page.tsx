"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Award, Map, ShieldCheck, Coins } from "lucide-react"

export default function Tutorial() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[url('/placeholder.svg?height=800&width=600')] bg-cover bg-center">
      <div className="w-full max-w-md">
        <Card className="border-2 border-primary/50 backdrop-blur-sm bg-background/90">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">Tutorial: {step}/4</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Map className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Trade Routes</h3>
                <p>
                  Choose from different trade routes connecting ancient cities. Each route has its own difficulty,
                  rewards, and risks. The harder the route, the greater the potential rewards!
                </p>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm font-medium">Routes range from Easy to Hard:</p>
                  <ul className="mt-2 text-sm">
                    <li>Easy: Lower risk, smaller rewards</li>
                    <li>Medium: Balanced risk and reward</li>
                    <li>Hard: High risk, maximum rewards</li>
                  </ul>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <ShieldCheck className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Challenges</h3>
                <p>
                  Along your journey, you'll face various challenges that traders encountered on the Silk Road. You'll
                  need to choose how to overcome these obstacles.
                </p>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm font-medium">For each challenge, you can choose:</p>
                  <ul className="mt-2 text-sm">
                    <li>Traditional methods: Time-tested approaches</li>
                    <li>Modern solutions: Technology-powered innovations</li>
                    <li>Each solution has a different success probability</li>
                  </ul>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Coins className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Rewards</h3>
                <p>
                  Successfully completing challenges and trade routes earns you $wSRC tokens. These tokens represent
                  your wealth and trading prowess.
                </p>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm font-medium">Earn tokens by:</p>
                  <ul className="mt-2 text-sm">
                    <li>Solving challenges successfully</li>
                    <li>Completing entire trade routes</li>
                    <li>Achieving special bonuses and events</li>
                  </ul>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Leaderboard</h3>
                <p>
                  Compete with other traders to climb the global leaderboard. The more successful your trading empire,
                  the higher your ranking!
                </p>
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <p className="text-sm font-medium">Leaderboard benefits:</p>
                  <ul className="mt-2 text-sm">
                    <li>Top traders receive special bonuses</li>
                    <li>Unlock exclusive trade routes</li>
                    <li>Earn bragging rights among fellow traders</li>
                  </ul>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => (step > 1 ? setStep(step - 1) : router.push("/onboarding"))}>
              {step > 1 ? "Back" : "Skip"}
            </Button>
            <Button onClick={handleNext} className="gap-2">
              {step < 4 ? "Next" : "Start Trading"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

