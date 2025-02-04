import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {
            return import('./pages/home/home.component').then((m) => m.HomeComponent)
        }
    },
    {
        path: 'workouts',
        loadComponent: () => {
            return import('./pages/workouts/workouts.component').then((m) => m.WorkoutsComponent)
        }
    },
    {
        path: 'progress',
        loadComponent: () => {
            return import('./pages/progress/progress.component').then((m) => m.ProgressComponent)
        }
    },
];
