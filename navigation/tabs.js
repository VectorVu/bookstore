import React from "react";
import {
    Image
} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Search } from "../screens/";
import { icons, COLORS } from "../constants";

const Tab = createBottomTabNavigator();

const tabOptions = {
    showLabel: false,
    style: {
        height: "10%",
        backgroundColor: COLORS.black,
    }
}

const Tabs = () => {
    return (
      <Tab.Navigator
        tabOptions={tabOptions}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            const tintColor = focused ? COLORS.primary : COLORS.gray;

            switch (route.name) {
              case "Home":
                return (
                  <Image
                    source={icons.dashboard_icon}
                    resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 25,
                      height: 25,
                    }}
                  />
                );

              case "Search":
                return (
                  <Image
                    source={icons.search_icon}
                    resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 25,
                      height: 25,
                    }}
                  />
                );

              case "Notification":
                return (
                  <Image
                    source={icons.notification_icon}
                    resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 25,
                      height: 25,
                    }}
                  />
                );

              case "Setting":
                return (
                  <Image
                    source={icons.menu_icon}
                    resizeMode="contain"
                    style={{
                      tintColor: tintColor,
                      width: 25,
                      height: 25,
                    }}
                  />
                );
            }
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: [
            {
              display: "flex",
            },
            null,
          ],
          // Ẩn luôn header
          headerShown: false,
          
          // format header
          // headerStyle: {
          //   backgroundColor: '#3d3b3a',
          // },
          // headerTitleStyle: {
          //   color: 'white',
          //   fontSize: 25,
          // },
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
        />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Notification" component={Home} />
        <Tab.Screen name="Setting" component={Home} />
      </Tab.Navigator>
    );
}

export default Tabs;