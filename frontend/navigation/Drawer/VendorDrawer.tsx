import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Appbar, Drawer, IconButton } from 'react-native-paper'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');



const VendorDrawer = ({ navigation }: any) => {

    const [active, setActive] = React.useState('');
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const navigateToVendorHome = () => {
        navigation.navigate('VendorHomeScreen');
        setDrawerOpen(!drawerOpen);
        setActive('first');
    }

    const navigateToVendorBookings = () => {
        navigation.navigate('VendorBookings');
        setDrawerOpen(!drawerOpen);
        setActive('second');
    }

    const navigateToVendorAds = () => {
        navigation.navigate('VendorAds');
        setDrawerOpen(!drawerOpen);
        setActive('third');
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
            </Appbar.Header>
            <Animated.View style={[styles.drawer, drawerAnimatedStyle]}>
                <Drawer.Item
                    style={styles.drawerItem}
                    icon="home"
                    label="Home"
                    active={active === 'first'}
                    onPress={navigateToVendorHome}
                    background={{ color: active === 'first' ? activeTintColor : inactiveTintColor }}
                />
                <Drawer.Item
                    style={styles.drawerItem}
                    icon="format-list-bulleted"
                    label="My Bookings"
                    active={active === 'second'}
                    onPress={navigateToVendorBookings}
                />
                <Drawer.Item
                    style={styles.drawerItem}
                    icon="file-table-box-multiple"
                    label="My Ads"
                    active={active === 'third'}
                    onPress={navigateToVendorAds}
                />
                <Drawer.Item
                    style={styles.drawerItem}
                    icon="account"
                    label="Account"
                    active={active === 'fourth'}
                    onPress={() => setActive('fourth')}
                />
                <TouchableOpacity style={styles.closeDrawerButton} onPress={toggleDrawer}>
                    <Text style={styles.closeDrawerButtonText}>Close Drawer</Text>
                </TouchableOpacity>
            </Animated.View>
        </>
    )
}

export default VendorDrawer

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
})