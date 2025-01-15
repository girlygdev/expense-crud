import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const Title = ({ children, style }) => {
  return <Text style={[styles.title, style]}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'poppins',
    fontSize: 18,
    color: GlobalStyles.colors.primary.dark,
  },
});
