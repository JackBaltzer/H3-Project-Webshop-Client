import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environment';

import { Category } from '../_models/category';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {


	private httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
	constructor(private http: HttpClient) {	}

	getCategories() {
		return this.http.get(`${environment.apiUrl}/api/category`)
			.toPromise()
			.then(res => res as Category[])
			.catch(err => {
				console.log(err);
				return [];
			});
	}

	getCategory(id: number) {
		return this.http.get(`${environment.apiUrl}/api/category/${id}`)
			.toPromise()
			.then(res => res as Category)
			.catch(err => {
				console.log(err);
				return {};
			});
	}

	createCategory(category: Category) {
		return this.http.post(`${environment.apiUrl}/api/category`, category, this.httpOptions)
			.toPromise()
			.then(res => res as Category)
			.catch(err => {
				console.log(err);
				return category;
			});
	}

	updateCategory(category: Category) {
		return this.http.put(`${environment.apiUrl}/api/category/${category.id}`, category, this.httpOptions)
			.toPromise()
			.then(res => res as Category)
			.catch(err => {
				console.log(err);
				return category;
			});
	}

	deleteCategory(category: Category | number) {
		const id = typeof category === 'number' ? category : category.id;
		return this.http.delete(`${environment.apiUrl}/api/category/${id}`)
			.toPromise()
			.then(res => res as Category)
			.catch(err => {
				console.log(err);
				return {};
			});
	}


}
