import type { Workout, WorkoutStats } from "./types"

const STORAGE_KEY = "workout-tracker-data"

export function saveWorkout(workout: Workout): void {
  const workouts = getWorkouts()
  workouts.push(workout)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts))
}

export function getWorkouts(): Workout[] {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : []
}

export function getStats(): WorkoutStats {
  const workouts = getWorkouts()
  const now = new Date()
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))

  const thisWeekWorkouts = workouts.filter((workout) => new Date(workout.date) >= startOfWeek).length

  // Calculate PRs by finding max weight for each exercise
  const exerciseMaxes = new Map<string, number>()
  workouts.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      const maxWeight = Math.max(...exercise.sets.map((set) => set.weight))
      const currentMax = exerciseMaxes.get(exercise.name) || 0
      if (maxWeight > currentMax) {
        exerciseMaxes.set(exercise.name, maxWeight)
      }
    })
  })

  return {
    totalWorkouts: workouts.length,
    thisWeekWorkouts,
    personalRecords: exerciseMaxes.size,
  }
}

export function deleteWorkout(id: string): void {
  const workouts = getWorkouts()
  const filteredWorkouts = workouts.filter((workout) => workout.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredWorkouts))
}

