import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',
        loadComponent: () => import('./pages/signin/signin.component')
        .then(c => c.SigninComponent)
    }
];
