import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dumbbell, LineChart, History, ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="/" className="flex items-center justify-center">
          <Dumbbell className="h-6 w-6 mr-2" />
          <span className="font-bold">FitTrack</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
            Dashboard
          </Link>
          <Link href="/stats" className="text-sm font-medium hover:underline underline-offset-4">
            Stats
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Track Your Fitness Journey
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Simple, effective workout tracking to help you reach your fitness goals. Log your progress and watch
                yourself grow stronger.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/dashboard">
                <Button size="lg">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12 md:py-24 lg:py-32">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <Dumbbell className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Track Workouts</h3>
            <p className="text-muted-foreground">
              Log your exercises, sets, reps, and weights with our easy-to-use interface.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <LineChart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">View Progress</h3>
            <p className="text-muted-foreground">Track your progress over time with detailed statistics and charts.</p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="rounded-full bg-primary/10 p-4">
              <History className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Workout History</h3>
            <p className="text-muted-foreground">
              Access your complete workout history and analyze your training patterns.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

