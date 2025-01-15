import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const Subtitle = ({ children, style }) => {
  return <Text style={[styles.title, style]}>{children}</Text>;
};

export default Subtitle;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'poppins-bold',
    fontSize: 16,
    color: GlobalStyles.colors.primary.dark,
  },
});
