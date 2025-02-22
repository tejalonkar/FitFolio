"use client"

import { useState, useEffect } from "react"
import { CalendarDays, ChevronRight, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getWorkouts, deleteWorkout } from "@/lib/storage"
import type { Workout } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

interface WorkoutHistoryProps {
  onWorkoutDeleted: () => void
}

export function WorkoutHistory({ onWorkoutDeleted }: WorkoutHistoryProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const loadedWorkouts = getWorkouts()
    setWorkouts(loadedWorkouts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
  }, [])

  const handleDelete = (id: string) => {
    deleteWorkout(id)
    setWorkouts(workouts.filter((workout) => workout.id !== id))
    onWorkoutDeleted()

    toast({
      title: "Success",
      description: "Workout deleted successfully",
    })
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <Card key={workout.id} className="hover:bg-muted/50">
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <CardDescription>{new Date(workout.date).toLocaleDateString()}</CardDescription>
              </div>
              <CardTitle className="text-lg">{workout.type}</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDelete(workout.id)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <ChevronRight className="h-4 w-4 text-muted-foreground ml-2" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {workout.exercises.map((exercise, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{exercise.name}</span>
                  <span className="text-muted-foreground">
                    {exercise.sets.length} sets | Max: {Math.max(...exercise.sets.map((set) => set.weight))}lbs
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {workouts.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No workouts logged yet. Start by adding a new workout!
        </div>
      )}
    </div>
  )
}

