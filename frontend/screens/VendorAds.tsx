import { Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View , Image, Alert} from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Appbar, IconButton, Drawer, Portal, Modal, TextInput, RadioButton, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { createAdsPost } from '../constants/apiService';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const VendorAds = ({ navigation }: any) => {

    const [active, setActive] = React.useState('');
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [adModalVisible, setAdModalVisible] = React.useState(false);
    const [serviceName, setServiceName] = React.useState('');
    const [serviceDetails, setServiceDetails] = React.useState('');
    const [radioChecked, setRadioChecked] = React.useState('first');
    const [images, setImages] = React.useState<string []>([]);
    const [location, setLocation] = React.useState<any>('');
    const [user, setUser] = React.useState<any>('');

    const showAdModal = () => setAdModalVisible(true);
    const hideAdModal = () => setAdModalVisible(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const navigateToVendorHome = () => {
        navigation.navigate('VendorHomeScreen');
        setDrawerOpen(!drawerOpen);
        setActive(activeTintColor);
    }

    const navigateToVendorBookings = () => {
        navigation.navigate('VendorBookings');
        setDrawerOpen(!drawerOpen);
        setActive(activeTintColor);
    }

    const navigateToVendorAds = () => {
        navigation.navigate('VendorAds');
        setDrawerOpen(!drawerOpen);
        setActive(activeTintColor);
    }

    const activeTintColor = 'green';
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

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImages((prevImages) => [...prevImages, result.assets[0].uri]);
        }
    };

    const handleCreatePost = async () => {
        const adsPost = { serviceName, serviceDetails, radioChecked, images, location, user };
    
        try {
          const response = await createAdsPost(adsPost);
          console.log("Res",response)
          Alert.alert('Success', 'Ads post created successfully.');
        } catch (error:any) {
          Alert.alert('Error', error.message);
        }
      };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Portal>
                    <Modal
                        visible={adModalVisible}
                        onDismiss={hideAdModal}>
                        <View style={styles.adModal}>
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Create a new service Ad</Text>
                            <ScrollView>
                                <Text style={{ marginTop: 20, fontSize: 16 }}>Service Name: </Text>
                                <TextInput
                                    placeholder="Type the Service Name here"
                                    placeholderTextColor="grey"
                                    onChangeText={(serviceName) => setServiceName(serviceName)}
                                    style={{ marginTop: 10 }}
                                />
                                <Text style={{ marginTop: 20, fontSize: 16 }}>Service Details: </Text>
                                <TextInput
                                    placeholder="Type the Service Details here"
                                    placeholderTextColor="grey"
                                    onChangeText={(serviceDetails) => setServiceDetails(serviceDetails)}
                                    style={{ marginTop: 10, height: 150 }}
                                />
                                <Text style={{ marginTop: 20, fontSize: 16 }}>Service Type: </Text>
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
                                <Text style={{ marginTop: 20, fontSize: 16 }}>Media: </Text>
                                <Button onPress={pickImage}>Upload Photo</Button>
                                <View style={styles.imageContainer}>
                                {images.map((img, index) => (
                                        <Image key={index} source={{ uri: img }} style={styles.image} />
                                    ))}
                                    <Button onPress={handleCreatePost}>Create</Button>
                                </View>
                            </ScrollView>
                        </View>
                    </Modal>
                </Portal>
            </View>
            <View>
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
                <View style={styles.content}>
                    <Text style={styles.title}>My Ads</Text>
                    <TouchableOpacity style={styles.newAdButton} onPress={showAdModal}>
                        <Text style={styles.newAdButtonText}>Create a new Ad</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default VendorAds

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
    title: {
        fontWeight: 'bold',
        fontSize: 16
    },
    newAdButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#66cdaa',
        borderRadius: 5,
        width: '70%'
    },
    newAdButtonText: {
        textAlign: 'center',
        color: 'white',
    },
    adModal: {
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
    image: {
        width: 200,
        height: 200,
        margin: 10
      },
      imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }
})