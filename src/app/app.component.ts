import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './_services';
import { User, Role } from './_models';

@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent {
	user: User;

	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) {
		this.authenticationService.user.subscribe(x => this.user = x);
	}

	get isLoggedIn() {
		return this.user != null;
	}

	get isAdmin() {
		return this.user && this.user.role === "Admin";
	}

	logout() {
		this.authenticationService.logout();
		this.router.navigate(['/login']);
	}
}