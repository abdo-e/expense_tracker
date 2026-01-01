import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styles: []
})
export class ExpenseListComponent implements OnInit {
  expenses: Expense[] = [];
  @Output() edit = new EventEmitter<Expense>();

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe(data => {
      this.expenses = data;
    });
  }

  onEdit(expense: Expense) {
    this.edit.emit(expense);
  }

  onDelete(id?: number) {
    if (id && confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(id).subscribe(() => {
        this.loadExpenses();
      });
    }
  }
}
