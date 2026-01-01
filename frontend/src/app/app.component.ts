import { Component } from '@angular/core';
import { Expense } from './models/expense.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  showForm = false;
  selectedExpense?: Expense;

  openAddForm() {
    this.selectedExpense = undefined;
    this.showForm = true;
  }

  editExpense(expense: Expense) {
    this.selectedExpense = expense;
    this.showForm = true;
  }

  onSaved() {
    this.showForm = false;
    // Data refreshes automatically via ExpenseService.refresh$
  }

  closeForm() {
    this.showForm = false;
  }
}
