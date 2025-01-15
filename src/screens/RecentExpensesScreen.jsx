import React, { useContext, useEffect, useMemo, useState } from 'react';
import ExpensesOutput from '../components/Expenses/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';
import LoadingOverlay from '../components/General/LoadingOverlay';
import ErrorOverlay from '../components/General/ErrorOverlay';

const RecentExpensesScreen = () => {
  const expenseContext = useContext(ExpensesContext);
  const { expenses, setExpenses } = expenseContext;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      try {
        const expenses = await fetchExpenses();
        setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses...');
      }

      setTimeout(() => {
        setLoading(false);
      }, [500]);
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

  const errorHandler = () => {
    setError(null)
  }

  if (loading) {
    return <LoadingOverlay />;
  }

  if (error && !loading) {
    return (
      <ErrorOverlay
        message={error}
        onConfirm={errorHandler}
      />
    );
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName='Last 7 Days'
    />
  );
};

export default RecentExpensesScreen;
