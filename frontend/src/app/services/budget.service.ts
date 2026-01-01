import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private budgetKey = 'app_budget';
  private budgetSubject = new BehaviorSubject<number>(this.loadBudget());

  budget$ = this.budgetSubject.asObservable();

  constructor() { }

  private loadBudget(): number {
    const savedBudget = localStorage.getItem(this.budgetKey);
    return savedBudget ? parseFloat(savedBudget) : 1000; // Default budget
  }

  setBudget(amount: number) {
    localStorage.setItem(this.budgetKey, amount.toString());
    this.budgetSubject.next(amount);
  }

  getBudget(): number {
    return this.budgetSubject.value;
  }
}
