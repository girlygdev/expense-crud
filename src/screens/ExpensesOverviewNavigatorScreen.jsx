const Tab = createBottomTabNavigator();
import { Button, Pressable } from 'react-native';
import { GlobalStyles } from '../constants/styles';
import AllExpensesScreen from './AllExpensesScreen';
import RecentExpensesScreen from './RecentExpensesScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, Fontisto } from 'react-native-vector-icons';
import IconButton from '../components/General/IconButton';
import { Ionicons } from 'react-native-vector-icons';

const ExpensesOverviewNavigatorScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary.medium },
        headerTitleStyle: { color: GlobalStyles.colors.light },
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary.medium,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent,
        tabBarInactiveTintColor: GlobalStyles.colors.light,
        tabBarLabelStyle: {
          fontFamily: 'poppins',
        },
        headerRight: ({}) => {
          return (
            <IconButton
              onPress={() => {
                navigation.navigate('ManageExpense');
              }}
              style={({ pressed }) => [
                { marginRight: 16 },
                pressed && { opacity: 0.75 },
              ]}
            >
              <Ionicons
                name='add-circle-sharp'
                size={32}
                color={GlobalStyles.colors.accent}
              />
            </IconButton>
          );
        },
      })}
    >
      <Tab.Screen
        name='RecentExpenses'
        component={RecentExpensesScreen}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialIcons
                name='update'
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name='AllExpenses'
        component={AllExpensesScreen}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All',
          tabBarIcon: ({ color, size }) => {
            return (
              <Fontisto
                name='date'
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default ExpensesOverviewNavigatorScreen;
