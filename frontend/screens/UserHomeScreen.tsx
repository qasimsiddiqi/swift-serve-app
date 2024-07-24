import { FlatList, Platform, ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Avatar, BottomNavigation, Button, Card, Checkbox, FAB, Icon, IconButton, Modal, Portal, RadioButton, Searchbar } from 'react-native-paper';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LocationScreen from './LocationScreen';
import MyBookings from './MyBookings';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { SelectList } from 'react-native-dropdown-select-list';
import TabScreens from '../navigation/Bottom Tab Navigation/TabScreens';
import UserDrawer from '../navigation/Drawer/UserDrawer';
import VendorDrawer from '../navigation/Drawer/VendorDrawer';
import { getAdsPost } from '../constants/apiService';

const UserHomeScreen = ({ navigation }: any) => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    (async () => {
      await getAds()
    })()
  }, [])
  console.log("Adssss", ads)

  const getAds = async () => {
    try {
      const response = await getAdsPost()
      console.log("Ads response", response)
      setAds(response)
    } catch (error) {
      console.log("Error while getting ads", error)
    }
  }

  const priceRange = [
    { key: '1', value: '0 - 1000 Rs' },
    { key: '2', value: '1000 - 2000 Rs' },
    { key: '3', value: '2000 - 3000 Rs' },
    { key: '4', value: '3000 - 4000 Rs' },
    { key: '5', value: '4000 - 5000 Rs' },
    { key: '6', value: '5000 - 6000 Rs' },
    { key: '7', value: '6000 - 7000 Rs' },
    { key: '8', value: '7000 - 8000 Rs' },
    { key: '9', value: '8000 - 9000 Rs' },
    { key: '10', value: '9000 - 10,000 Rs' },
    { key: '11', value: 'Above 10,000 Rs' },
  ];
  const serviceCategory = [
    { key: '1', value: 'not specified' },
    { key: '2', value: 'Barbers' },
    { key: '3', value: 'Gents Tailors' },
    { key: '4', value: 'Mobile Repairing' },
    { key: '5', value: 'Ladies Salons' },
    { key: '6', value: 'Ladies Tailors' },
    { key: '7', value: 'Electricians' },
    { key: '8', value: 'Plumbers' },
    { key: '9', value: 'Mechanics' },
  ];

  const [searchQuery, setSearchQuery] = React.useState('');
  const [active, setActive] = React.useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState('');
  const [selected, setSelected] = React.useState("");
  const [searchModalvisible, setSearchModalVisible] = React.useState(false);
  const [radioChecked, setRadioChecked] = React.useState('first');

  const showSearchModal = () => setSearchModalVisible(true);
  const hideSearchModal = () => setSearchModalVisible(false);

  const navigateToAdScreen = (ad: any) => {
    navigation.navigate('AdScreen', { adDetails: ad });
  };

  const navigateToTopRatedAdsScreen = () => {
    navigation.navigate('TopRatedAdsScreen')
  }
  return (
    <SafeAreaView>
      <View>
        <Portal>
          <Modal
            visible={searchModalvisible}
            onDismiss={hideSearchModal}>
            <View style={styles.filterModal}>
              <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Search Filters</Text>
              <ScrollView>
                <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>Price Range</Text>
                <SelectList
                  // onSelect={() => alert(selected)}
                  setSelected={setSelected}
                  data={priceRange}
                  arrowicon={<IconButton icon={'chevron-down'} size={20} style={{ alignSelf: 'center', marginLeft: 0 }} />}
                  searchicon={<IconButton icon={'chevron-down'} size={10} style={{}} />}
                  search={false}
                  boxStyles={{ borderRadius: 0, width: '100%', marginTop: 10, height: 50 }} //override default styles
                  inputStyles={{ fontSize: 16, textAlign: 'center' }}
                  defaultOption={{ key: '1', value: '0 - 1000 Rs' }}   //default selected option
                />
                <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>Service Type</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton
                    value="first"
                    status={radioChecked === 'first' ? 'checked' : 'unchecked'}
                    onPress={() => setRadioChecked('first')}
                    color='green'
                  />
                  <Text onPress={() => setRadioChecked('first')} style={{ marginLeft: 8, fontSize: 16 }}>Home Base</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton
                    value="second"
                    status={radioChecked === 'second' ? 'checked' : 'unchecked'}
                    onPress={() => setRadioChecked('second')}
                    color='green'
                  />
                  <Text onPress={() => setRadioChecked('second')} style={{ marginLeft: 8, fontSize: 16 }}>Shop Base</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton
                    value="third"
                    status={radioChecked === 'third' ? 'checked' : 'unchecked'}
                    onPress={() => setRadioChecked('third')}
                    color='green'
                  />
                  <Text onPress={() => setRadioChecked('third')} style={{ marginLeft: 8, fontSize: 16 }}>Both</Text>
                </View>
                <Text style={{ textAlign: 'left', fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>Service Category</Text>
                <SelectList
                  // onSelect={() => alert(selected)}
                  setSelected={setSelected}
                  data={serviceCategory}
                  arrowicon={<IconButton icon={'chevron-down'} size={20} style={{ alignSelf: 'center', marginLeft: 0 }} />}
                  searchicon={<IconButton icon={'chevron-down'} size={10} style={{}} />}
                  search={false}
                  boxStyles={{ borderRadius: 0, width: '100%', marginTop: 10, height: 50 }} //override default styles
                  inputStyles={{ fontSize: 16, textAlign: 'center' }}
                  defaultOption={{ key: '1', value: 'not specified' }}   //default selected option
                />
                <Button mode='contained' onPress={hideSearchModal} style={{ marginTop: 20, backgroundColor: 'green', marginLeft: 40, marginRight: 40 }}>Apply</Button>
              </ScrollView>
            </View>
          </Modal>
        </Portal>
      </View>
      <View style={styles.container}>
        <UserDrawer navigation={navigation} />
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
        />
        <IconButton icon="filter-outline" onPress={showSearchModal} style={styles.filterButton} />
        <View style={styles.contentContainer}>
          <ScrollView>
            <View>
              <View style={styles.container1}>
                <Text style={{ fontSize: 18, marginLeft: 15, marginTop: 2, fontWeight: 'bold' }}>Top Rated Ads</Text>
                <FlatList
                  style={{ borderWidth: 0, borderColor: 'black', borderRadius: 10, margin: 5 }}
                  horizontal
                  data={ads.slice(0, 3)} // Only display the first 3 ads
                  renderItem={({ item }: any) => (
                    <Card onPress={() => navigateToAdScreen(item)} style={{ margin: 10, width: 150, height: 200 }}>
                      <Card.Cover source={{ uri: item.images[0] }} style={{ width: 150, height: 120 }} />
                      <Text style={{ fontSize: 16, paddingRight: 5, paddingLeft: 5, paddingBottom: 5, paddingTop: 5 }}>{item.serviceName}</Text>
                    </Card>
                  )}
                />
                {ads.length > 2 && (
                  <Button onPress={navigateToTopRatedAdsScreen} mode="outlined" style={{ alignSelf: 'center', justifyContent: 'center', borderRadius: 0 }}>
                    See All
                  </Button>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default UserHomeScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
  contentContainer: {
    // flex: 1,
    marginBottom: 50,
  },
  bottomNavigation: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  searchBar: {
    backgroundColor: '#66cdaa',
    position: 'absolute',
    marginTop: 10,
    marginLeft: 95,
    width: '50%',
    borderRadius: 10,
    height: 40,
    paddingBottom: 0,
  },
  searchInput: {
    fontSize: 16,
    paddingBottom: 15, // Adjust this value to vertically center the text
    lineHeight: 50,
  },
  filterButton: {
    backgroundColor: '#66cdaa',
    position: 'absolute',
    marginLeft: 310,
    marginTop: 10,
    borderRadius: 10,
  },
  menuButton: {
    backgroundColor: '#66cdaa',
    marginLeft: 10,
    borderRadius: 10,
  },
  container1: {
    backgroundColor: 'white',
    width: '95%',
    marginTop: 100,
    height: 250,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 10
  },
  bottom: {
    backgroundColor: 'aquamarine',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  fab: {
    position: 'absolute',
    right: 16,
  },
  filterModal: {
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),

    // Additional styles for your View
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    height: 500
  },
})