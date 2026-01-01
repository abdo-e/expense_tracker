# Expense Tracker - Full Stack Application

A modern expense management application built with **Angular 16**, **Tailwind CSS**, and **.NET 8 Web API**. The application uses **MySQL** as its primary database.

## 🚀 Features

- **Dynamic Dashboard**: View total spending and a breakdown by category with responsive progress bars.
- **Expense Management**: Full CRUD operations for expenses (Add, Edit, Delete, List).
- **Automated Database Setup**: The backend automatically initializes the MySQL database and seeds default categories on the first run.
- **Responsive Design**: Built with Tailwind CSS for a premium, mobile-friendly experience.

## 🛠️ Tech Stack

- **Frontend**: Angular 16, Tailwind CSS, RxJS, HttpClient.
- **Backend**: .NET 8 Web API, Entity Framework Core.
- **Database**: MySQL (configured for port 3308).

## 📋 Prerequisites

- **.NET 8 SDK**
- **Node.js** (v18+)
- **Angular CLI** (`npm install -g @angular/cli`)
- **MySQL Server** (Running on port 3308)

## 🏃 How to Run

### 1. Database Configuration
Ensure your MySQL server is running on **port 3308**. You can adjust the connection string in `backend/appsettings.json` if needed.

### 2. Start the Backend
```powershell
cd backend
dotnet run
```
The API will be available at `http://localhost:5028`. The database `expense_tracker` will be created automatically.

### 3. Start the Frontend
```powershell
cd frontend
npm install
npm start
```
The application will be available at `http://localhost:4200`.

## 📂 Project Structure

- `/backend`: .NET Web API project with Entity Framework Core.
- `/frontend`: Angular 16 project styled with Tailwind CSS.

## 📄 License
MIT
