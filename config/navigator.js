import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';
import Splash from '../screens/splash';
import Login from '../screens/login';
import SignUp from '../screens/signup';
import AddToMenu from '../screens/employee_screens/addtomenu';
import Orders from '../screens/employee_screens/allorders';
import OrderNow from '../screens/ordernow';
import ItemDetails from '../screens/itemdetails';
import Map from '../screens/map';


const Stack = createNativeStackNavigator();

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="Splash" component={Splash} />
                <Stack.Screen name="Sign Up" component={SignUp} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Map" component={Map} />
                <Stack.Screen name="Add to menu" component={AddToMenu} />
                <Stack.Screen name="Orders" component={Orders} />
                <Stack.Screen name="Order Now" component={OrderNow} />
                <Stack.Screen name="Item Details" component={ItemDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;