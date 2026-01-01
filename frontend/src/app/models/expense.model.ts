import { Category } from './category.model';

export interface Expense {
    id?: number;
    title: string;
    amount: number;
    date: string; // Using string for easy binding to date input
    categoryId: number;
    category?: Category;
}
