import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import LocationScreen from '../../screens/LocationScreen';
import UserHomeScreen from '../../screens/UserHomeScreen';
import MyBookings from '../../screens/MyBookings';
import TabScreens from '../Bottom Tab Navigation/TabScreens';
import SignUpScreen1 from '../../screens/SignUpScreen1';
import ChatScreen from '../../screens/ChatScreen';
import { FontAwesome } from '@expo/vector-icons';
import AllScreens from '../Stack Navigation/AllScreens';
import FavouriteAds from '../../screens/FavouriteAds';
import VendorDrawer from './VendorDrawer';
export type drawerType = {
    UserHomeScreen: undefined;
    LocationScreen: undefined;
    MyBookings: undefined;
    TabScreens: undefined;
    SignUpScreen1: undefined;
    ChatScreen: undefined;
    AllScreens: undefined;
    FavouriteAds: undefined;
    VendorDrawer: undefined;
}

const Drawer = createDrawerNavigator<drawerType>();

const DrawerScreens = () => {
  return (
    <Drawer.Navigator initialRouteName='AllScreens' screenOptions={{headerShown:false}}>
        <Drawer.Screen name = "UserHomeScreen" component={UserHomeScreen} 
          options={{ 
          drawerLabel: 'Home', 
          drawerIcon: ({color, size}) => <FontAwesome name='home' color={color} size={size}/>,
          drawerActiveTintColor: 'green'}}
          />
        <Drawer.Screen name = "LocationScreen" component={LocationScreen} 
          options={{ 
            drawerLabel: 'Near Me',
            drawerIcon: ({color, size}) => <FontAwesome name='map' color={color} size={size}/>,
            drawerActiveTintColor: 'green'}}
            />
        <Drawer.Screen name = "MyBookings" component={MyBookings} 
        options={{ 
          drawerLabel: 'My Bookings',
          drawerIcon: ({color, size}) => <FontAwesome name='list-ul' color={color} size={size}/>,
          drawerActiveTintColor: 'green'}}/>
        <Drawer.Screen name = "ChatScreen" component={ChatScreen} 
        options={{ 
          drawerLabel: 'Chats',
          drawerIcon: ({color, size}) => <FontAwesome name='comment' color={color} size={size}/>,
          drawerActiveTintColor: 'green'}}/>
         <Drawer.Screen name = "FavouriteAds" component={FavouriteAds} 
        options={{ 
          drawerLabel: 'Favourites',
          drawerIcon: ({color, size}) => <FontAwesome name='heart' color={color} size={size}/>,
          drawerActiveTintColor: 'green'}}/>
        <Drawer.Screen name = "SignUpScreen1" component={SignUpScreen1} options={{drawerLabel: '', drawerActiveTintColor: 'white'}} />
        <Drawer.Screen name = "AllScreens" component={AllScreens} options={{drawerLabel: '', drawerActiveTintColor: 'white'}}/>
        <Drawer.Screen name = "VendorDrawer" component={VendorDrawer} options={{drawerLabel: '', drawerActiveTintColor: 'white'}}/>
    </Drawer.Navigator>
  )
}

export default DrawerScreens

const styles = StyleSheet.create({})