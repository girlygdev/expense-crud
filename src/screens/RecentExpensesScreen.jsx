import React, { useContext } from 'react';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

const RecentExpensesScreen = () => {
  const expenseContext = useContext(ExpensesContext);
  const expenses = expenseContext.expenses;

  const recentExpenses = expenses.filter(expense => {
    const today = new Date()
    const date7DaysAgo = getDateMinusDays(today, 7)

    return expense.date > date7DaysAgo
  })

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName='Last 7 Days'
    />
  );
};

export default RecentExpensesScreen;
