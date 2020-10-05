import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Category } from '../../_models/category';
import { CategoryService } from '../../_services/category.service';

@Component({
	selector: 'app-categories',
	templateUrl: './categories.component.html',
	styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
	categoryForm: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;
	error = '';

	categories: Category[];
	category: Category;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private router: Router,
		private categoryService: CategoryService) { }

	// convenience getter for easy access to form fields
	get f() { return this.categoryForm.controls; }

	ngOnInit(): void {
		this.category = { id: 0, 'name': '' };
		this.categoryService.getCategories().then(res => this.categories = res);
		this.categoryForm = this.formBuilder.group({
			name: ['', Validators.required]
		});
	}

	editCategory(category: Category): void {
		console.log('edit:', category);
		this.category = category;
	}

	clear() {
		this.ngOnInit();
	}
	async	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.categoryForm.invalid) {
			 return;
		}
	
		this.category.name = this.f.name.value;
		if (this.category.id > 0) {
			console.log('update:', this.category);
			await this.categoryService.updateCategory(this.category);
		}
		else {
			console.log('create:', this.category);
			let cat = await this.categoryService.createCategory(this.category);
			console.log(cat);
		}
		this.ngOnInit();

	}


	async deleteCategory(category: Category) {
		console.log('delete:', category);
		if (confirm('Er du sikker på du vil slette?')) {
			await this.categoryService.deleteCategory(category);
			this.ngOnInit();
		}
	}
}
