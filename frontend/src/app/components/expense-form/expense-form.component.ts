import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ExpenseService } from '../../services/expense.service';
import { Category } from '../../models/category.model';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styles: []
})
export class ExpenseFormComponent implements OnInit {
  @Input() expense?: Expense;
  @Output() saved = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  categories: Category[] = [];
  formData: Expense = {
    title: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    categoryId: 0
  };

  isEdit = false;

  constructor(
    private categoryService: CategoryService,
    private expenseService: ExpenseService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      if (this.categories.length > 0 && !this.expense) {
        this.formData.categoryId = this.categories[0].id;
      }
    });

    if (this.expense) {
      this.isEdit = true;
      this.formData = { ...this.expense };
      this.formData.date = new Date(this.expense.date).toISOString().split('T')[0];
    }
  }

  onSubmit() {
    if (this.isEdit && this.formData.id) {
      this.expenseService.updateExpense(this.formData.id, this.formData).subscribe(() => {
        this.saved.emit();
      });
    } else {
      this.expenseService.addExpense(this.formData).subscribe(() => {
        this.saved.emit();
      });
    }
  }

  onCancel() {
    this.cancelled.emit();
  }
}
