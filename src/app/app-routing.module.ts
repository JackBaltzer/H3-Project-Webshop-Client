import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { CategoriesComponent } from './admin/categories';
import { LoginsComponent } from './admin/logins';


const routes: Routes = [
    {
        path: 'admin', children: [
            {
                path: 'categories',
                component: CategoriesComponent,
                canActivate: [AuthGuard],
                data: {
                    roleAccess: 100
                }
            },
            {
                path: 'logins',
                component: LoginsComponent,
                canActivate: [AuthGuard],
                data: {
                    roleAccess: 100
                }
            },
            {
                path: '**', redirectTo: '/'
            }
        ]
    },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
