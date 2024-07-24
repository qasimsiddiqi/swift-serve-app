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
        <VendorDrawer navigation={navigation} />
        <View style={styles.content}>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text>Item 1</Text>
            </View>
            <View style={styles.gridItem}>
              <Text>Item 2</Text>
            </View>
            <View style={styles.gridItem}>
              <Text>Item 3</Text>
            </View>
            <View style={styles.gridItem}>
              <Text>Item 4</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default VendorHomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    marginTop: 20,
    alignItems: 'center',
  },
  grid: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    height: height * 0.3,
    backgroundColor: 'white',
    marginVertical: 10,
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // for Android shadow
  },
})