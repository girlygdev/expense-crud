import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ title, description, amount, date }) => {},
  updateExpense: (id, { title, description, amount, date }) => {},
  deleteExpense: (id) => {},
  setExpenses: ([]) => {}
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload];

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

    case 'set': 
      const inverted = action.payload.reverse()
      return inverted

    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

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

  const setExpenses = (expenses) => {
    dispatch({
      type: 'set',
      payload: expenses
    });
  }

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
    setExpenses
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
