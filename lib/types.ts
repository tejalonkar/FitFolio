export interface Set {
  reps: number
  weight: number
}

export interface Exercise {
  name: string
  sets: Set[]
}

export interface Workout {
  id: string
  date: string
  type: string
  exercises: Exercise[]
}

export interface WorkoutStats {
  totalWorkouts: number
  thisWeekWorkouts: number
  personalRecords: number
}

