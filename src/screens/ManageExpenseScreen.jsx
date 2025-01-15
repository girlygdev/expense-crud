import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import IconButton from '../components/General/IconButton';
import { Ionicons } from 'react-native-vector-icons';
import Button from '../components/General/Button';
import { ExpensesContext } from '../store/expenses-context';
import TextField from '../components/General/TextField';
import Title from '../components/General/Title';
import { getFormattedDate } from '../util/date';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/General/LoadingOverlay';

const ManageExpenseScreen = ({ route, navigation }) => {
  const expenseContext = useContext(ExpensesContext);
  const {
    expenses,
    addExpense: contextAddExpense,
    deleteExpense: contextDeleteExpense,
    updateExpense: contextUpdateExpense,
  } = expenseContext;

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(getFormattedDate(new Date()));
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const currentExpense = expenses.find((expense) => expense.id == expenseId);
    if (currentExpense) {
      setTitle(currentExpense.title);
      setDescription(currentExpense.description);
      setAmount(currentExpense.amount.toString());
      setDate(getFormattedDate(currentExpense.date));
    }
  }, [expenseId]);

  const deleteHandler = async () => {
    setIsSubmitting(true)
    contextDeleteExpense(expenseId);
    await deleteExpense(expenseId);

    setTimeout(() => {
      navigation.goBack();
    }, [500])
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    setIsSubmitting(true)
    validateData();
  };

  const submitData = async () => {
    const expenseData = {
      title,
      description,
      amount: parseFloat(amount),
      date: new Date(date),
    };

    if (isEditing) {
      contextUpdateExpense(expenseId, expenseData);
      await updateExpense(expenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      contextAddExpense({ id, ...expenseData });
    }

    setTimeout(() => {
      navigation.goBack();
    }, [200])
  };

  const validateData = () => {
    const titleIsValid = title.trim().length > 0;
    const amountIsValid = !isNaN(amount) && parseFloat(amount) > 0;
    const dateIsValid =
      date.toString() !== 'Invalid Date' && date.toString().length > 0;

    if (!titleIsValid || !amountIsValid || !dateIsValid) {
      Alert.alert('Invalid input', 'Please check your entered values.');
      return false;
    }

    submitData();
  };

  if (isSubmitting) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>
      <Title>Your Expense</Title>
      <View style={styles.fieldContainer}>
        <TextField
          label={'Title'}
          options={{
            onChangeText: setTitle,
            value: title,
            placeholder: 'Title'
          }}
        />

        <TextField
          label='Amount'
          options={{
            onChangeText: setAmount,
            value: amount,
            keyboardType: 'decimal-pad',
            placeholder: '0.00'
          }}
        />

        <TextField
          label={'Date'}
          options={{
            onChangeText: setDate,
            value: date,
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
          }}
        />

        <TextField
          label={'Description'}
          options={{
            onChangeText: setDescription,
            value: description,
            numberOfLines: 4,
            multiline: true,
          }}
          style={{ height: 100 }}
        />
      </View>

      <View style={styles.actionsContainer}>
        <Button
          mode={'flat'}
          onPress={cancelHandler}
          style={styles.action}
        >
          Cancel
        </Button>
        <Button
          onPress={confirmHandler}
          style={styles.action}
        >
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton onPress={deleteHandler}>
            <Ionicons
              name='trash-bin'
              size={24}
              color={GlobalStyles.colors.error.main}
            />
          </IconButton>
        </View>
      )}
    </View>
  );
};

export default ManageExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.light,
  },
  fieldContainer: {
    marginTop: 16,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary.dark,
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  action: {
    flex: 1,
    marginRight: 1,
  },
});
