import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import Button from './Button';

const ErrorOverlay = ({ title = 'An error occurred.', message, onConfirm }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{message}</Text>
      <Button onPress={onConfirm}>Okay</Button>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary.medium,
  },
  title: {
    fontFamily: 'poppins-bold',
    fontSize: 18,
    color: GlobalStyles.colors.light,
    textAlign: 'center',
    marginBottom: 2
  },
  text: {
    fontFamily: 'poppins',
    fontSize: 14,
    color: GlobalStyles.colors.light,
    textAlign: 'center',
    marginBottom: 8
  }
});
