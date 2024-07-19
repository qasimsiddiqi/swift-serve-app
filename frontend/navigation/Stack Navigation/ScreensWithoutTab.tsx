import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignUpScreen1 from '../../screens/SignUpScreen1';
import AllScreens from './AllScreens';
export type stack = {
    SignUpScreen1: undefined;
    AllScreens: undefined;
}

const Stack = createNativeStackNavigator<stack>();

const ScreensWithoutTab = () => {
  return (
    <Stack.Navigator initialRouteName='SignUpScreen1' screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignUpScreen1" component={SignUpScreen1} />
    </Stack.Navigator>
  )
}

export default ScreensWithoutTab

const styles = StyleSheet.create({})