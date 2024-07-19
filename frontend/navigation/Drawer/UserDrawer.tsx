import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';
import ChatScreen from '../../screens/ChatScreen';
import MyBookings from '../../screens/MyBookings';
import LocationScreen from '../../screens/LocationScreen';
import FavouriteAds from '../../screens/FavouriteAds';
import SignUpScreen1 from '../../screens/SignUpScreen1';
import UserHomeScreen from '../../screens/UserHomeScreen';
import AllScreens from '../Stack Navigation/AllScreens';
import VendorDrawer from './VendorDrawer';

export type UserDrawerType = {
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

const UsersDrawer = createDrawerNavigator<UserDrawerType>();

const UserDrawer = () => {
  return (
    <UsersDrawer.Navigator initialRouteName='AllScreens' screenOptions={{headerShown:false}}>
        <UsersDrawer.Screen name = "UserHomeScreen" component={UserHomeScreen} 
          options={{ 
          drawerLabel: 'Home', 
          drawerIcon: ({color, size}) => <FontAwesome name='home' color={color} size={size}/>,
          drawerActiveTintColor: 'green'}}
          />
        <UsersDrawer.Screen name = "LocationScreen" component={LocationScreen} 
          options={{ 
            drawerLabel: 'Near Me',
            drawerIcon: ({color, size}) => <FontAwesome name='map' color={color} size={size}/>,
            drawerActiveTintColor: 'green'}}
            />
        <UsersDrawer.Screen name = "MyBookings" component={MyBookings} 
        options={{ 
          drawerLabel: 'My Bookings',
          drawerIcon: ({color, size}) => <FontAwesome name='list-ul' color={color} size={size}/>,
          drawerActiveTintColor: 'green'}}/>
        <UsersDrawer.Screen name = "ChatScreen" component={ChatScreen} 
        options={{ 
          drawerLabel: 'Chats',
          drawerIcon: ({color, size}) => <FontAwesome name='comment' color={color} size={size}/>,
          drawerActiveTintColor: 'green'}}/>
         <UsersDrawer.Screen name = "FavouriteAds" component={FavouriteAds} 
        options={{ 
          drawerLabel: 'Favourites',
          drawerIcon: ({color, size}) => <FontAwesome name='heart' color={color} size={size}/>,
          drawerActiveTintColor: 'green'}}/>
        <UsersDrawer.Screen name = "SignUpScreen1" component={SignUpScreen1} options={{drawerLabel: '', drawerActiveTintColor: 'white'}} />
        <UsersDrawer.Screen name = "AllScreens" component={AllScreens} options={{drawerLabel: '', drawerActiveTintColor: 'white'}}/>
        <UsersDrawer.Screen name = "VendorDrawer" component={VendorDrawer} options={{drawerLabel: '', drawerActiveTintColor: 'white'}}/>
    </UsersDrawer.Navigator>
  )
}

export default UserDrawer

const styles = StyleSheet.create({})