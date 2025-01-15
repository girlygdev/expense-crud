import { createContext, useReducer, useState } from 'react';
import uuid from 'react-native-uuid';

const DUMMYDATA = [
  {
    id: 'e1',
    description: 'Shoes',
    amount: 59.99,
    date: new Date('2025-01-12'),
  },
  {
    id: 'e2',
    description: 'Shirt',
    amount: 12.99,
    date: new Date('2025-01-01'),
  },
  {
    id: 'e3',
    description: 'Trousers',
    amount: 39.5,
    date: new Date('2025-01-02'),
  },
  {
    id: 'e4',
    description: 'Socks',
    amount: 9.99,
    date: new Date('2025-01-03'),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  updateExpense: (id, { description, amount, date }) => {},
  deleteExpense: (id) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      const newExpense = {
        id: uuid.v4(),
        ...action.payload,
      };
      return [...state, newExpense];

    case 'update':
      const currExpenseId = state.findIndex(
        (currExpense) => currExpense.id == action.payload.id
      );
      const currExpense = state[currExpenseId];
      const updatedItem = { ...currExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[currExpenseId] = updatedItem;
      return updatedExpenses;

    case 'delete':
      return state.filter((currExpense) => currExpense.id !== action.payload);

    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMYDATA);

  const addExpense = (data) => {
    dispatch({
      type: 'add',
      payload: data,
    });
  };

  const deleteExpense = (id) => {
    dispatch({
      type: 'delete',
      payload: id,
    });
  };

  const updateExpense = (id, data) => {
    dispatch({
      type: 'update',
      payload: {
        id: id,
        data: data,
      },
    });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
