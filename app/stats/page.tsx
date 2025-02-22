"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getWorkouts } from "@/lib/storage"
import type { Workout } from "@/lib/types"

export default function StatsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [exerciseStats, setExerciseStats] = useState<Map<string, number>>(new Map())

  useEffect(() => {
    const loadedWorkouts = getWorkouts()
    setWorkouts(loadedWorkouts)

    // Calculate max weights for each exercise
    const stats = new Map<string, number>()
    loadedWorkouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        const maxWeight = Math.max(...exercise.sets.map((set) => set.weight))
        const currentMax = stats.get(exercise.name) || 0
        if (maxWeight > currentMax) {
          stats.set(exercise.name, maxWeight)
        }
      })
    })
    setExerciseStats(stats)
  }, [])

  const calculateWorkoutFrequency = () => {
    const monthlyWorkouts = new Map<string, number>()
    workouts.forEach((workout) => {
      const month = new Date(workout.date).toLocaleString("default", { month: "long" })
      monthlyWorkouts.set(month, (monthlyWorkouts.get(month) || 0) + 1)
    })
    return monthlyWorkouts
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Statistics</h1>
          <p className="text-muted-foreground">Your workout progress and achievements</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Personal Records</CardTitle>
              <CardDescription>Your best lifts for each exercise</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.from(exerciseStats.entries()).map(([exercise, weight]) => (
                  <div key={exercise} className="flex justify-between">
                    <span className="font-medium">{exercise}</span>
                    <span>{weight} lbs</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Activity</CardTitle>
              <CardDescription>Workout frequency by month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.from(calculateWorkoutFrequency().entries()).map(([month, count]) => (
                  <div key={month} className="flex justify-between">
                    <span className="font-medium">{month}</span>
                    <span>{count} workouts</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workout Types</CardTitle>
              <CardDescription>Distribution of workout types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.from(new Set(workouts.map((w) => w.type))).map((type) => (
                  <div key={type} className="flex justify-between">
                    <span className="font-medium">{type}</span>
                    <span>{workouts.filter((w) => w.type === type).length} sessions</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

