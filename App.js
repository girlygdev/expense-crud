import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageExpenseScreen from './src/screens/ManageExpenseScreen';
import { GlobalStyles } from './src/constants/styles';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import ExpensesOverviewNavigatorScreen from './src/screens/ExpensesOverviewNavigatorScreen';
import ExpensesContextProvider from './src/store/expenses-context';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    poppins: require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hide();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style='light' />
      
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='ExpensesOverview'
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary.medium,
              },
              headerTintColor: GlobalStyles.colors.light,
            }}
          >
            <Stack.Screen
              name='ManageExpense'
              component={ManageExpenseScreen}
              options={({ route }) => {
                return {
                  title: `${route.params?.expenseId ? 'Edit' : 'Add'} Expense`,
                  presentation: 'modal',
                };
              }}
            />
            <Stack.Screen
              name='ExpensesOverview'
              component={ExpensesOverviewNavigatorScreen}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
