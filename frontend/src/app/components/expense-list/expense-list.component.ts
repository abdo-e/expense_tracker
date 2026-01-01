import { Component, EventEmitter, OnInit, OnDestroy, Output } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styles: []
})
export class ExpenseListComponent implements OnInit, OnDestroy {
  expenses: Expense[] = [];
  @Output() edit = new EventEmitter<Expense>();

  private refreshSub?: Subscription;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.refreshSub = this.expenseService.refresh$.subscribe(() => {
      this.loadExpenses();
    });
    this.loadExpenses();
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
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
      this.expenseService.deleteExpense(id).subscribe();
      // No need to call loadExpenses manually here, 
      // the tap in the service will trigger the refresh$ Subject.
    }
  }

  getEmoji(category?: string): string {
    const emojis: { [key: string]: string } = {
      'Food': '🍕',
      'Transport': '🚗',
      'Entertainment': '🎬',
      'Shopping': '🛍️',
      'Health': '🏥',
      'Uncategorized': '📦'
    };
    return emojis[category || 'Uncategorized'] || '💰';
  }
}
