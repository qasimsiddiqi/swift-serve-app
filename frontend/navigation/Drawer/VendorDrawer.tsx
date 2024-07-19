import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { FontAwesome } from '@expo/vector-icons';
import UserHomeScreen from '../../screens/UserHomeScreen';
import VendorHomeScreen from '../../screens/VendorHomeScreen';
export type vendordrawerType = {
    VendorHomeScreen: undefined;
}

const VendorsDrawer = createDrawerNavigator<vendordrawerType>();
const VendorDrawer = () => {
    return (
        <VendorsDrawer.Navigator initialRouteName="VendorHomeScreen" screenOptions={{ headerShown: false }}>
            <VendorsDrawer.Screen name="VendorHomeScreen" component={VendorHomeScreen}
                options={{
                    drawerLabel: 'Home',
                    drawerIcon: ({ color, size }) => <FontAwesome name='home' color={color} size={size} />,
                    drawerActiveTintColor: 'green'
                }}
            />
        </VendorsDrawer.Navigator>
    )
}

export default VendorDrawer

const styles = StyleSheet.create({})