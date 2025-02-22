"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveWorkout } from "@/lib/storage"
import type { Exercise, Set } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

interface WorkoutFormProps {
  onWorkoutSaved: () => void
}

export function WorkoutForm({ onWorkoutSaved }: WorkoutFormProps) {
  const { toast } = useToast()
  const [exercises, setExercises] = useState<Exercise[]>([{ name: "", sets: [{ reps: 0, weight: 0 }] }])
  const [workoutType, setWorkoutType] = useState("")

  const addExercise = () => {
    setExercises([...exercises, { name: "", sets: [{ reps: 0, weight: 0 }] }])
  }

  const addSet = (exerciseIndex: number) => {
    const newExercises = [...exercises]
    newExercises[exerciseIndex].sets.push({ reps: 0, weight: 0 })
    setExercises(newExercises)
  }

  const removeExercise = (exerciseIndex: number) => {
    const newExercises = exercises.filter((_, index) => index !== exerciseIndex)
    setExercises(newExercises)
  }

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const newExercises = [...exercises]
    newExercises[exerciseIndex].sets = newExercises[exerciseIndex].sets.filter((_, index) => index !== setIndex)
    setExercises(newExercises)
  }

  const updateSet = (exerciseIndex: number, setIndex: number, field: keyof Set, value: number) => {
    const newExercises = [...exercises]
    newExercises[exerciseIndex].sets[setIndex][field] = value
    setExercises(newExercises)
  }

  const updateExerciseName = (exerciseIndex: number, name: string) => {
    const newExercises = [...exercises]
    newExercises[exerciseIndex].name = name
    setExercises(newExercises)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!workoutType) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a workout type",
      })
      return
    }

    const workout = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      type: workoutType,
      exercises: exercises.map((exercise) => ({
        ...exercise,
        sets: exercise.sets.map((set) => ({
          reps: Number(set.reps),
          weight: Number(set.weight),
        })),
      })),
    }

    saveWorkout(workout)
    onWorkoutSaved()

    // Reset form
    setExercises([{ name: "", sets: [{ reps: 0, weight: 0 }] }])
    setWorkoutType("")

    toast({
      title: "Success",
      description: "Workout saved successfully",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="workout-type">Workout Type</Label>
        <Select value={workoutType} onValueChange={setWorkoutType}>
          <SelectTrigger id="workout-type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="strength">Strength Training</SelectItem>
            <SelectItem value="cardio">Cardio</SelectItem>
            <SelectItem value="hiit">HIIT</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {exercises.map((exercise, exerciseIndex) => (
          <Card key={exerciseIndex}>
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <Label htmlFor={`exercise-${exerciseIndex}`}>Exercise Name</Label>
                  <Select value={exercise.name} onValueChange={(value) => updateExerciseName(exerciseIndex, value)}>
                    <SelectTrigger id={`exercise-${exerciseIndex}`}>
                      <SelectValue placeholder="Select exercise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bench">Bench Press</SelectItem>
                      <SelectItem value="squat">Squat</SelectItem>
                      <SelectItem value="deadlift">Deadlift</SelectItem>
                      <SelectItem value="press">Overhead Press</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="button" variant="destructive" size="icon" onClick={() => removeExercise(exerciseIndex)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                {exercise.sets.map((set, setIndex) => (
                  <div key={setIndex} className="flex items-end gap-4">
                    <div className="flex-1">
                      <Label htmlFor={`reps-${exerciseIndex}-${setIndex}`}>Reps</Label>
                      <Input
                        id={`reps-${exerciseIndex}-${setIndex}`}
                        type="number"
                        value={set.reps}
                        onChange={(e) => updateSet(exerciseIndex, setIndex, "reps", Number(e.target.value))}
                        min="0"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={`weight-${exerciseIndex}-${setIndex}`}>Weight (lbs)</Label>
                      <Input
                        id={`weight-${exerciseIndex}-${setIndex}`}
                        type="number"
                        value={set.weight}
                        onChange={(e) => updateSet(exerciseIndex, setIndex, "weight", Number(e.target.value))}
                        min="0"
                      />
                    </div>
                    {exercise.sets.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeSet(exerciseIndex, setIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => addSet(exerciseIndex)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Set
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button type="button" variant="outline" onClick={addExercise}>
          <Plus className="mr-2 h-4 w-4" />
          Add Exercise
        </Button>
        <Button type="submit" className="sm:ml-auto">
          Save Workout
        </Button>
      </div>
    </form>
  )
}

