import { CalendarDays, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function WorkoutHistory() {
  const workouts = [
    {
      id: 1,
      date: "2024-02-22",
      type: "Strength Training",
      exercises: [
        { name: "Bench Press", sets: "3x5", maxWeight: "185" },
        { name: "Squat", sets: "3x5", maxWeight: "225" },
        { name: "Deadlift", sets: "1x5", maxWeight: "275" },
      ],
    },
    {
      id: 2,
      date: "2024-02-20",
      type: "Strength Training",
      exercises: [
        { name: "Overhead Press", sets: "3x5", maxWeight: "95" },
        { name: "Chin-ups", sets: "3x8", maxWeight: "BW" },
        { name: "Barbell Row", sets: "3x5", maxWeight: "135" },
      ],
    },
    // Add more workout history here
  ]

  return (
    <div className="space-y-4">
      {workouts.map((workout) => (
        <Card key={workout.id} className="hover:bg-muted/50">
          <CardHeader className="flex flex-row items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <CardDescription>{workout.date}</CardDescription>
              </div>
              <CardTitle className="text-lg">{workout.type}</CardTitle>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {workout.exercises.map((exercise, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{exercise.name}</span>
                  <span className="text-muted-foreground">
                    {exercise.sets} @ {exercise.maxWeight}lbs
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

