import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const LoadingOverlay = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size='large'
        color={GlobalStyles.colors.accent}
      />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalStyles.colors.primary.medium,
  },
});
