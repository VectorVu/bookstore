import React, {useState, useEffect} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BookDetail, Reading, Register, Login, ForgotPassword, Search, Settings } from "./screens/";
import Tabs from "./navigation/tabs";
import { useFonts } from 'expo-font';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent"
    }
}

const Stack = createStackNavigator();


const App = () => {

 
    const [loaded] = useFonts({
            "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
            "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
            "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),
        })

    if(!loaded){
        return null;
    }
    return ( 
        <NavigationContainer theme={theme}>
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            // initialRouteName={'home'}
        >
            {/* Authen */} 
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />          
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />

            {/* Tabs */}
            <Stack.Screen name="home" component={Tabs} />

            {/* Screens */}
            <Stack.Screen name="BookDetail" component={BookDetail} options={{ headerShown: false }} />
            <Stack.Screen name="Reading" component={Reading} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />

        </Stack.Navigator>
    </NavigationContainer>
    );
} 

export default App;

    