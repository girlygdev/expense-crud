import { StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const LabelText = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default LabelText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'poppins-bold',
    fontSize: 16,
    color: GlobalStyles.colors.primary.dark,
  },
});
