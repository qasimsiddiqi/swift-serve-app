import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BottomNavigation } from 'react-native-paper'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LocationScreen from '../../screens/LocationScreen';
import MyBookings from '../../screens/MyBookings';
import UserHomeScreen from '../../screens/UserHomeScreen';
import ChatScreen from '../../screens/ChatScreen';
import { FontAwesome } from '@expo/vector-icons';
import AllScreens from '../Stack Navigation/AllScreens';
import DrawerScreens from '../Drawer/DrawerScreens';
import SignUpScreen1 from '../../screens/SignUpScreen1';
export type screenType = {
    UserHomeScreen: undefined;
    LocationScreen: undefined;
    MyBookings: undefined;
    ChatScreen: undefined;
    AllScreens: undefined;
    DrawerScreens: undefined;
}

const Tab = createBottomTabNavigator<screenType>();

const TabScreens = () => {
  return (
    <Tab.Navigator initialRouteName='DrawerScreens' screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false, tabBarLabelStyle: {fontSize:12}}}>
        <Tab.Screen name = "DrawerScreens" component={DrawerScreens} options={{
            tabBarIcon: ({color, size}) => <FontAwesome name='home' color={color} size={size}/>,
            tabBarLabel: "Home"
        }}/>
        <Tab.Screen name = "LocationScreen" component={LocationScreen} options={{
            tabBarIcon: ({color, size}) => <FontAwesome name='map' color={color} size={size}/>,
            tabBarLabel: "Near Me"
        }}/>
        <Tab.Screen name = "MyBookings" component={MyBookings} options={{
            tabBarIcon: ({color, size}) => <FontAwesome name='list-ul' color={color} size={size}/>,
            tabBarLabel: "My Bookings"
        }}/>
        <Tab.Screen name = "ChatScreen" component={ChatScreen} options={{
            tabBarIcon: ({color, size}) => <FontAwesome name='comment' color={color} size={size}/>,
            tabBarLabel: "Chats"
        }}/>
    </Tab.Navigator>
  )
}

export default TabScreens

const styles = StyleSheet.create({})