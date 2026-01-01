import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  totalExpenses = 0;
  categorySummary: { name: string, total: number, percentage: number }[] = [];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.expenseService.getExpenses().subscribe(expenses => {
      this.calculateSummary(expenses);
    });
  }

  calculateSummary(expenses: Expense[]) {
    this.totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

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
}
