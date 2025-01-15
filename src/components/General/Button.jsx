import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const Button = ({ children, onPress, style, mode }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        mode == 'flat' && styles.flat,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={[styles.buttonText, mode == 'flat' && styles.flatText]}>
        {children}
      </Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary.light,
    overflow: 'hidden',
  },
  flat: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: GlobalStyles.colors.light,
    textAlign: 'center',
  },
  flatText: {
    color: GlobalStyles.colors.primary.dark,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary.medium,
    borderRadius: 8,
  },
});
