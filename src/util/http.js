import axios from 'axios';

const BACKEND_URL =
  'https://rn-expense-tracker-4c6c2-default-rtdb.asia-southeast1.firebasedatabase.app';

export const storeExpense = async (expenseData) => {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData
  );

  return response.data.name;
};

export const fetchExpenses = async () => {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);
  const expenses = [];

  for (const key in response.data) {
    const expenseObject = {
      id: key,
      title: response.data[key].title,
      amount: response.data[key].amount,
      description: response.data[key].description,
      date: new Date(response.data[key].date),
    };

    expenses.push(expenseObject);
  }

  return expenses;
};

export const updateExpense = (id, expenseData) => {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id) => {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
};
