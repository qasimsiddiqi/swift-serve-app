import { Dimensions, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, Drawer, IconButton, Portal, RadioButton, Button } from 'react-native-paper'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SelectList } from 'react-native-dropdown-select-list';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const UserDrawer = ({ navigation }: any) => {

  const [active, setActive] = React.useState('');
  const [drawerOpen, setDrawerOpen] = React.useState(false);

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
      <Appbar.Header style={{ height: 30 }}>
        <IconButton icon="menu" iconColor='black' mode='contained' style={styles.menuButton} onPress={toggleDrawer} />
        {/* <IconButton icon="filter-outline" onPress={showSearchModal} style={styles.filterButton} /> */}
      </Appbar.Header>
      <Animated.View style={[styles.drawer, drawerAnimatedStyle]}>
        <ScrollView>
        <Text>Welcome User</Text>
        <Image
          source={require('../../assets/SwiftServe Logo.png')}
          style={styles.logo}
        />
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
        </ScrollView>
      </Animated.View>
    </>
  )
}

export default UserDrawer

const styles = StyleSheet.create({
  logo: {
    width: '50%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
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
    marginBottom: 20,
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