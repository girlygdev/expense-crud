import React from 'react';
import { StyleSheet, View } from 'react-native';
import LabelText from '../General/LabelText';
import { GlobalStyles } from '../../constants/styles';

const ExpensesSummary = ({ periodName, expenses }) => {
  const expensesSum = expenses?.reduce(
    (sum, expense) => (sum += expense.amount),
    0
  );

  return (
    <View style={styles.summaryContainer}>
      <LabelText style={styles.textColor}>{periodName}</LabelText>
      <LabelText style={styles.textColor}>${expensesSum?.toFixed(2)}</LabelText>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary.medium,
    borderRadius: 6,
    marginBottom: 4,
  },
  textColor: {
    color: GlobalStyles.colors.light
  }
});
