import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { CategoriesComponent } from './admin/categories';
import { LoginsComponent } from './admin/logins';
import { Role } from './_models';

const routes: Routes = [
    {
        path: 'admin', children: [
            {
                path: 'categories',
                component: CategoriesComponent,
                canActivate: [AuthGuard],
                data: {
                    roles: [Role.Admin]
                }
            },
            {
                path: 'logins',
                component: LoginsComponent,
                canActivate: [AuthGuard],
                data: {
                    roles: [Role.Admin]
                }
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
