# 💰 Finance Dashboard UI

A clean and interactive **frontend-only finance dashboard** built using React. This project demonstrates how financial data can be visualized, managed, and explored through an intuitive user interface.

---

## 🚀 Live Demo

*(Add your deployed link here after hosting)*

---

## 📌 Overview

This dashboard allows users to track and understand their financial activity through:

* 📊 Visual summaries
* 💳 Transaction management
* 📈 Spending insights
* 🔐 Role-based UI behavior

The project focuses on **UI design, component structure, state management, and interactivity**, without relying on any backend.

---

## ✨ Features

### 📊 Dashboard Overview

* Summary cards for **Total Balance, Income, Expenses**
* 📈 Time-based visualization (balance trends)
* 🧩 Category-wise spending breakdown

---

### 💳 Transactions Management

* View transactions with:

  * Date
  * Amount
  * Category
  * Type (Income / Expense)
* 🔍 Live search functionality
* 📊 Sorting (date & amount)
* 🎯 Filtering by category/type
* ➕ Add transactions
* 🗑 Delete transactions (Admin only)

---

### 🔐 Role-Based UI (Frontend Simulation)

* **Admin Mode**

  * Full access (add, delete, export)
* **Viewer Mode**

  * Read-only access
* 🔄 Switch roles using dropdown
* Clear UI indication of current role

---

### 🧠 Insights Panel

* 💰 Highest spending category detection
* 🗓 Monthly comparison (current vs previous)
* ⚠️ Overspending alerts (expense > income)
* 📉 Dynamic savings feedback
* Graceful fallback for insufficient data

---

### ⚡ Interactive UX Enhancements

* 🎉 Toast notifications for actions (add/delete)
* 🚫 Validation for large transactions (> ₹50,000)
* 📅 Date validation (no future entries)
* 👋 Context-aware greeting (based on time)
* 📭 Empty state handling

---

### 📱 Responsive Design

* Fully responsive layout
* Mobile-friendly UI
* Sidebar adapts for smaller screens

---

## 🧠 State Management

* Used **React Context API** for:

  * Transactions data
  * Role management
* Local state for:

  * Filters
  * Sorting
  * UI interactions

---

## 🛠 Tech Stack

* ⚛️ React (Vite)
* 🎨 Tailwind CSS
* 🧠 Context API
* 📊 Charting libraries (for visualizations)

---

## 📂 Project Structure

```
src/
│── components/
│   ├── Dashboard/
│   ├── Transactions/
│   ├── Layout/
│
│── context/
│── utils/
│── App.jsx
│── main.jsx
```

---

## ▶️ How to Run Locally

```bash
npm install
npm run dev
```

---

## 🎯 Key Highlights

* Clean and modular component design
* Strong focus on **user experience and interactivity**
* Simulated real-world features like **RBAC and insights**
* Built entirely with **frontend technologies**

---

## 📌 Notes

This project was developed as part of a frontend evaluation assignment.
The focus is on **approach, UI design, and interactivity**, not backend integration.

---

## 🙌 Author

**Prashanth Babu**

---
