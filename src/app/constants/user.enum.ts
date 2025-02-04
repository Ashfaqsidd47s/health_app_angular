import { UserData } from "../models/user.types";

export enum WorkoutTypeEnum {
    Running = 'Running',
    Cycling = 'Cycling',
    Swimming = 'Swimming',
    Yoga = 'Yoga',
    Jogging = 'Jogging',
}

export enum RowCountEnum {
    Five = 5,
    Ten = 10,
    Twenty = 20,
    Thirty = 30,
    Fifty = 50,
    Hundred = 100,
}

export const defaultUsers: UserData[] = [
    {
    id: 1,
    userName: 'Ashfaq',
    workouts: [
        { type: WorkoutTypeEnum.Running, minutes: 30 },
        { type: WorkoutTypeEnum.Cycling, minutes: 20 },
    ],
    },
    {
    id: 2,
    userName: 'Vivek',
    workouts: [
        { type: WorkoutTypeEnum.Yoga, minutes: 40 },
        { type: WorkoutTypeEnum.Running, minutes: 15 },
    ],
    },
    {
    id: 3,
    userName: 'Sachin',
    workouts: [
        { type: WorkoutTypeEnum.Cycling, minutes: 40 },
        { type: WorkoutTypeEnum.Jogging, minutes: 20 },
    ],
    },
]
  