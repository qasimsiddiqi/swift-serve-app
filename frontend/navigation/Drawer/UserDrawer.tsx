import { Dimensions, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, Drawer, IconButton, Portal, RadioButton, Button } from 'react-native-paper'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SelectList } from 'react-native-dropdown-select-list';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const UserDrawer = ({ navigation }: any) => {

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

  const [active, setActive] = React.useState('');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [searchModalvisible, setSearchModalVisible] = React.useState(false);
  const [radioChecked, setRadioChecked] = React.useState('first');
  const [selected, setSelected] = React.useState("");

  const showSearchModal = () => setSearchModalVisible(true);
  const hideSearchModal = () => setSearchModalVisible(false);

  const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
  };

  const navigateToUserHomeScreen = () => {
      navigation.navigate('UserHomeScreen');
      setDrawerOpen(!drawerOpen);
      setActive('first');
  }

  const navigateToLocationScreen = () => {
      navigation.navigate('LocationScreen');
      setDrawerOpen(!drawerOpen);
      setActive('second');
  }

  const navigateToMyBookings = () => {
      navigation.navigate('MyBookings');
      setDrawerOpen(!drawerOpen);
      setActive('third');
  }

  const navigateToChatScreen = () => {
    navigation.navigate('ChatScreen');
    setDrawerOpen(!drawerOpen);
    setActive('fourth');
}

const navigateToFavouriteAds = () => {
  navigation.navigate('FavouriteAds');
  setDrawerOpen(!drawerOpen);
  setActive('fifth');
}

  const activeTintColor = '#66cdaa';
  const inactiveTintColor = 'black';

  const drawerTranslationX = useSharedValue(-width);
  const drawerOpacity = useSharedValue(0);

  const openDrawer = () => {
      drawerTranslationX.value = withSpring(0, { damping: 20, stiffness: 100 });
      drawerOpacity.value = withSpring(1);
  };

  const closeDrawer = () => {
      drawerTranslationX.value = withSpring(-width, { damping: 20, stiffness: 100 });
      drawerOpacity.value = withSpring(0);
      setDrawerOpen(false);
  };

  React.useEffect(() => {
      if (drawerOpen) {
          openDrawer();
      } else {
          closeDrawer();
      }
  }, [drawerOpen]);

  const drawerAnimatedStyle = useAnimatedStyle(() => {
      return {
          transform: [{ translateX: drawerTranslationX.value }],
          opacity: drawerOpacity.value,
      };
  });

  return (
      <>
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
          <Appbar.Header style={{ height: 30 }}>
              <IconButton icon="menu" iconColor='black' mode='contained' style={styles.menuButton} onPress={toggleDrawer} />
              {/* <IconButton icon="filter-outline" onPress={showSearchModal} style={styles.filterButton} /> */}
          </Appbar.Header>
          <Animated.View style={[styles.drawer, drawerAnimatedStyle]}>
              <Drawer.Item
                  style={styles.drawerItem}
                  icon="home"
                  label="Home"
                  active={active === 'first'}
                  onPress={navigateToUserHomeScreen}
                  background={{ color: active === 'first' ? activeTintColor : inactiveTintColor }}
              />
              <Drawer.Item
                  style={styles.drawerItem}
                  icon="format-list-bulleted"
                  label="My Bookings"
                  active={active === 'second'}
                  onPress={navigateToMyBookings}
              />
              <Drawer.Item
                  style={styles.drawerItem}
                  icon="map-outline"
                  label="Near Me"
                  active={active === 'third'}
                  onPress={navigateToLocationScreen}
              />
              <Drawer.Item
                  style={styles.drawerItem}
                  icon="message"
                  label="Chats"
                  active={active === 'fourth'}
                  onPress={navigateToChatScreen}
              />
              <Drawer.Item
                  style={styles.drawerItem}
                  icon="heart"
                  label="Favourites"
                  active={active === 'fifth'}
                  onPress={navigateToFavouriteAds}
              />
              <Drawer.Item
                  style={styles.drawerItem}
                  icon="account"
                  label="Account"
                  active={active === 'sixth'}
                  onPress={() => setActive('sixth')}
              />
              <TouchableOpacity style={styles.closeDrawerButton} onPress={toggleDrawer}>
                  <Text style={styles.closeDrawerButtonText}>Close Drawer</Text>
              </TouchableOpacity>
          </Animated.View>
      </>
  )
}

export default UserDrawer

const styles = StyleSheet.create({
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
menuButton: {
    backgroundColor: '#66cdaa',
    marginLeft: 10,
    borderRadius: 10,
    marginBottom: 25
},
filterButton: {
  backgroundColor: '#66cdaa',
  // position: 'absolute',
  marginLeft: 250,
  marginBottom: 25,
  borderRadius: 10,
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