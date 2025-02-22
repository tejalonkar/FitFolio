"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Plus, Dumbbell, TrendingUp } from "lucide-react"
import { WorkoutForm } from "../components/workout-form"
import { WorkoutHistory } from "../components/workout-history"
import { getStats } from "@/lib/storage"
import type { WorkoutStats } from "@/lib/types"

export default function Dashboard() {
  const [stats, setStats] = useState<WorkoutStats>({
    totalWorkouts: 0,
    thisWeekWorkouts: 0,
    personalRecords: 0,
  })

  useEffect(() => {
    const loadedStats = getStats()
    setStats(loadedStats)
  }, [])

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Track and manage your workouts</p>
          </div>
          <Button className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            New Workout
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
              <Dumbbell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalWorkouts}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.thisWeekWorkouts}</div>
              <p className="text-xs text-muted-foreground">Workouts completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Personal Records</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.personalRecords}</div>
              <p className="text-xs text-muted-foreground">Total PRs achieved</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="new" className="space-y-4">
          <TabsList>
            <TabsTrigger value="new">Log Workout</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="new" className="space-y-4">
            <WorkoutForm
              onWorkoutSaved={() => {
                const loadedStats = getStats()
                setStats(loadedStats)
              }}
            />
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            <WorkoutHistory
              onWorkoutDeleted={() => {
                const loadedStats = getStats()
                setStats(loadedStats)
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

