import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import GlobalStyles from "./constants/GlobalStyles";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, Portal } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllScreens from './navigation/Stack Navigation/AllScreens';
import UserDrawer from './navigation/Drawer/UserDrawer';
import DrawerScreens from './navigation/Drawer/DrawerScreens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView>
    <SafeAreaProvider>
      <View style={GlobalStyles.container}>
        <PaperProvider>
          <NavigationContainer>
              <AllScreens/>
          </NavigationContainer>
          <StatusBar style="auto" />
        </PaperProvider>
      </View>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});