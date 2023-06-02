import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Contacts from './screens/Contacts';
import ContactDetails from './screens/ContactDetails';
const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Contacts}
          name="Contacts"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={ContactDetails}
          name="ContactDetails"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
