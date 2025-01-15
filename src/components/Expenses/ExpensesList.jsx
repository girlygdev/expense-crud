import React from 'react';
import { FlatList } from 'react-native';
import ExpenseListItem from './ExpenseListItem';
import { useNavigation } from '@react-navigation/native';

const ExpensesList = ({ expenses }) => {
  const navigation = useNavigation();

  const expensePressHandler = (expense) => {
    navigation.navigate('ManageExpense', {
      expenseId: expense.id
    });
  };

  const renderExpenseItem = (expenseData) => {
    return (
      <ExpenseListItem
        expense={expenseData.item}
        onPress={expensePressHandler.bind(this, expenseData.item)}
      />
    );
  };

  return (
    <FlatList
      data={expenses}
      keyExtractor={(expense) => expense.id}
      renderItem={renderExpenseItem}
    />
  );
};

export default ExpensesList;
