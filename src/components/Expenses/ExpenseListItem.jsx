import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

const ExpenseListItem = ({ expense, onPress }) => {
  return (
    <Pressable
      android_ripple={{ color: GlobalStyles.colors.primary.medium }}
      style={({ pressed }) => [styles.rootContainer, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.text}>{expense.title}</Text>
          <Text style={styles.text}>{getFormattedDate(expense.date)}</Text>
        </View>

        <View style={styles.amountContiner}>
          <Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseListItem;

const styles = StyleSheet.create({
  rootContainer: {
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary.light,
    elevation: 2,
    overflow: 'hidden',
    marginVertical: 4,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  labelContainer: {
    flex: 1,
  },
  amountContiner: {
    backgroundColor: GlobalStyles.colors.light,
    justifyContent: 'center',
    borderRadius: 4,
    width: 80,
    alignItems: 'center',
  },
  text: {
    color: GlobalStyles.colors.light,
    fontFamily: 'poppins',
  },
  amount: {
    color: GlobalStyles.colors.primary.dark,
    fontFamily: 'poppins-bold',
  },
  pressed: {
    opacity: 0.7,
  },
});
