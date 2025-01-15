import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const TextField = ({ label, options, style }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.field, style]}
        {...options}
      />
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  field: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontFamily: 'poppins',
    fontSize: 16,
    backgroundColor: GlobalStyles.colors.primary.lighter,
    color: GlobalStyles.colors.primary.medium,
    borderRadius: 4,
    textAlignVertical: 'top'
  },
  label: {
    color: GlobalStyles.colors.primary.light,
    marginBottom: 8,
  },
});
