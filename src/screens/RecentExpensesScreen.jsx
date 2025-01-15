import React, { useContext, useEffect, useMemo, useState } from 'react';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

const RecentExpensesScreen = () => {
  const expenseContext = useContext(ExpensesContext);
  const { expenses, setExpenses } = expenseContext;

  useEffect(() => {
    const getData = async () => {
      const expenses = await fetchExpenses();
      setExpenses(expenses);
    };

    getData();
  }, []);

  const recentExpenses = useMemo(() => {
    return expenses?.filter((expense) => {
      const today = new Date();
      const date7DaysAgo = getDateMinusDays(today, 7);

      return expense.date > date7DaysAgo;
    });
  }, [expenses]);

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName='Last 7 Days'
    />
  );
};

export default RecentExpensesScreen;
