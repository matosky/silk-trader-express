"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTelegram } from "@/components/telegram-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function Onboarding() {
  const { user } = useTelegram()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [hasTradedBefore, setHasTradedBefore] = useState<boolean | null>(null)
  const [showTutorial, setShowTutorial] = useState(false)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // In a real app, we would save the user data to the database here
      console.log("User data:", { nickname, email, hasTradedBefore })

      // Show tutorial dialog or go to dashboard
      if (hasTradedBefore === false) {
        setShowTutorial(true)
      } else {
        router.push("/dashboard")
      }
    }
  }

  const handleSkipTutorial = () => {
    setShowTutorial(false)
    router.push("/dashboard")
  }

  const handleStartTutorial = () => {
    setShowTutorial(false)
    router.push("/tutorial")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[url('/placeholder.svg?height=800&width=600')] bg-cover bg-center">
      <div className="w-full max-w-md">
        <Card className="border-2 border-primary/50 backdrop-blur-sm bg-background/90">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">Create Your Account</CardTitle>
            <CardDescription>Step {step} of 3</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Choose a Nickname</h3>
                  <p className="text-sm text-muted-foreground">This will be your identity on the Silk Road</p>
                </div>
                <Input
                  placeholder="Enter your trader nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Link an Email (Optional)</h3>
                  <p className="text-sm text-muted-foreground">For notifications and account recovery</p>
                </div>
                <Input
                  type="email"
                  placeholder="your@email.com (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Trading Experience</h3>
                  <p className="text-sm text-muted-foreground">Have you traded before?</p>
                </div>
                <div className="flex space-x-4">
                  <Button
                    variant={hasTradedBefore === true ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setHasTradedBefore(true)}
                  >
                    Yes
                  </Button>
                  <Button
                    variant={hasTradedBefore === false ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setHasTradedBefore(false)}
                  >
                    No
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Back
              </Button>
            ) : (
              <div></div>
            )}
            <Button
              onClick={handleNext}
              disabled={(step === 1 && !nickname) || (step === 3 && hasTradedBefore === null)}
            >
              {step < 3 ? "Next" : "Complete"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Would you like a tutorial?</DialogTitle>
            <DialogDescription>
              Learn the basics of trading on the Silk Road with our interactive tutorial.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>The tutorial will guide you through:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Understanding trade routes</li>
              <li>Resolving challenges</li>
              <li>Earning $wSRC tokens</li>
              <li>Climbing the leaderboard</li>
            </ul>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleSkipTutorial}>
              Skip Tutorial
            </Button>
            <Button onClick={handleStartTutorial}>Start Tutorial</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

