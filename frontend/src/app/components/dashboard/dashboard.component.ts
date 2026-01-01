import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { BudgetService } from '../../services/budget.service';
import { Expense } from '../../models/expense.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {
  totalExpenses = 0;
  budget = 0;
  remainingBalance = 0;
  isEditingBudget = false;
  categorySummary: { name: string, total: number, percentage: number }[] = [];

  private refreshSub?: Subscription;
  private budgetSub?: Subscription;

  constructor(
    private expenseService: ExpenseService,
    private budgetService: BudgetService
  ) { }

  ngOnInit(): void {
    this.budgetSub = this.budgetService.budget$.subscribe(b => {
      this.budget = b;
      this.calculateRemaining();
    });

    this.refreshSub = this.expenseService.refresh$.subscribe(() => {
      this.loadData();
    });

    this.loadData();
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
    this.budgetSub?.unsubscribe();
  }

  loadData() {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.calculateSummary(expenses);
    });
  }

  calculateSummary(expenses: Expense[]) {
    this.totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    this.calculateRemaining();

    const summaryMap = new Map<string, number>();
    expenses.forEach(e => {
      const catName = e.category?.name || 'Uncategorized';
      summaryMap.set(catName, (summaryMap.get(catName) || 0) + e.amount);
    });

    this.categorySummary = Array.from(summaryMap.entries()).map(([name, total]) => ({
      name,
      total,
      percentage: this.totalExpenses > 0 ? (total / this.totalExpenses) * 100 : 0
    })).sort((a, b) => b.total - a.total);
  }

  calculateRemaining() {
    this.remainingBalance = this.budget - this.totalExpenses;
  }

  toggleEditBudget() {
    this.isEditingBudget = !this.isEditingBudget;
  }

  saveBudget(newBudget: number) {
    this.budgetService.setBudget(newBudget);
    this.isEditingBudget = false;
  }
}
