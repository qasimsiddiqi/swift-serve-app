import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignUpScreen1 from '../../screens/SignUpScreen1';
import AdScreen from '../../screens/AdScreen';
import ChatScreen from '../../screens/ChatScreen';
import LocationScreen from '../../screens/LocationScreen';
import LoginScreen from '../../screens/LoginScreen';
import MyBookings from '../../screens/MyBookings';
import RatingAndReview from '../../screens/RatingAndReview';
import SignUpScreen from '../../screens/SignUpScreen';
import UserHomeScreen from '../../screens/UserHomeScreen';
import TabScreens from '../Bottom Tab Navigation/TabScreens';
import TopRatedAdsScreen from '../../screens/TopRatedAdsScreen';
import DrawerScreens from '../Drawer/DrawerScreens';
import FavouriteAds from '../../screens/FavouriteAds';
import VendorHomeScreen from '../../screens/VendorHomeScreen';
import VendorDrawer from '../Drawer/VendorDrawer';
import UserDrawer from '../Drawer/UserDrawer';
import VendorBookings from '../../screens/VendorBookings';
import VendorAds from '../../screens/VendorAds';
export type stackScreens = {
    SignUpScreen1: undefined;
    AdScreen: undefined;
    UserHomeScreen: undefined;
    LoginScreen: undefined;
    SignupScreen: undefined;
    LocationScreen: undefined;
    MyBookings: undefined;
    RatingAndReview: undefined;
    ChatScreen: undefined;
    TabScreens: undefined;
    TopRatedAdsScreen: undefined;
    DrawerScreens: undefined;
    FavouriteAds: undefined;
    VendorHomeScreen: undefined;
    VendorDrawer: undefined;
    UserDrawer: undefined;
    VendorBookings: undefined;
    VendorAds: undefined;
}

const Stack = createNativeStackNavigator<stackScreens>();

const AllScreens = () => {
    return (
            <Stack.Navigator initialRouteName='SignUpScreen1' screenOptions={{ headerBackTitle: "back", headerShown:false }}>
                <Stack.Screen
                    name="DrawerScreens"
                    component={DrawerScreens}
                />
                <Stack.Screen
                    name="SignUpScreen1"
                    component={SignUpScreen1}
                />
                <Stack.Screen
                    name="AdScreen"
                    component={AdScreen}
                />
                <Stack.Screen
                    name="UserHomeScreen"
                    component={UserHomeScreen}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                />
                <Stack.Screen
                    name="SignupScreen"
                    component={SignUpScreen}
                />
                <Stack.Screen
                    name="LocationScreen"
                    component={LocationScreen}
                />
                <Stack.Screen
                    name="MyBookings"
                    component={MyBookings}
                />
                <Stack.Screen
                    name="RatingAndReview"
                    component={RatingAndReview}
                />
                <Stack.Screen
                    name="ChatScreen"
                    component={ChatScreen}
                />
                <Stack.Screen
                    name="TopRatedAdsScreen"
                    component={TopRatedAdsScreen}
                />
                <Stack.Screen
                    name="FavouriteAds"
                    component={FavouriteAds}
                />
                <Stack.Screen
                    name="VendorHomeScreen"
                    component={VendorHomeScreen}
                />
                <Stack.Screen
                    name="VendorBookings"
                    component={VendorBookings}
                />
                <Stack.Screen
                    name="VendorAds"
                    component={VendorAds}
                />
            </Stack.Navigator>
    )
}

export default AllScreens

const styles = StyleSheet.create({})