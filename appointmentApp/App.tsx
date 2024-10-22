import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// ייבוא המסכים שיצרת
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Search: undefined;
  Chat: undefined;
  Review: undefined;
  Login: undefined;
  SignUp: undefined;
  SearchByArea: undefined; // הוספת SearchByArea

};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login" // הדף הראשון - התחברות
        screenOptions={{
          headerShown: false, // הסרת הכותרות מכל המסכים
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />

      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
