import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import VendorDrawer from '../navigation/Drawer/VendorDrawer';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const VendorHomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <VendorDrawer navigation={navigation}/>
          <View style={styles.content}>
        <Text>Vendor Home Screen Content</Text>
      </View>
      </View>
    </SafeAreaView>
  )
}

export default VendorHomeScreen

const styles = StyleSheet.create({
  menuButton: {
    backgroundColor: '#66cdaa',
    marginLeft: 10,
    borderRadius: 10,
    marginBottom: 25
  },
  container: {
    flex: 1
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width * 0.75,
    height: height,
    backgroundColor: '#ffffff',
    zIndex: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  drawerItem: {
    // backgroundColor: '#66cdaa',
    marginVertical: 5,
    borderRadius: 20
  },
  closeDrawerButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#66cdaa',
    borderRadius: 5,
  },
  closeDrawerButtonText: {
    textAlign: 'center',
    color: 'white',
  },
  content: {
    marginTop: 20,
    alignItems: 'center',
  },
})