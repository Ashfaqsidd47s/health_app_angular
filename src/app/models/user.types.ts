export type WorkoutType = "Running" | "Cycling" | "Swimming" | "Yoga" | "Jogging";

export type Workout = {
    type: string,
    minutes: number,
}
export type UserData = {
    id: number;
    userName: string;
    workouts: Workout[];
}

export type UserRowData = {
    id: number;
    userName: string;
    workouts: string;
    count: number;
    totalTime: number;
}