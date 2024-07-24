import { Dimensions, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Appbar, IconButton, Drawer, Portal, Modal, TextInput, RadioButton, Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as Location from 'expo-location';
import { createAdsPost } from '../constants/apiService';
import MapView, { Marker } from 'react-native-maps';
import VendorDrawer from '../navigation/Drawer/VendorDrawer';
import MapViewComponent from './MapViewComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const VendorAds = ({ navigation }: any) => {

    const [active, setActive] = React.useState('');
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [adModalVisible, setAdModalVisible] = React.useState(false);
    const [mapViewVisible, setMapViewVisible] = React.useState(false);
    const [serviceName, setServiceName] = React.useState('');
    const [serviceDetails, setServiceDetails] = React.useState('');
    const [servicePrice, setServicePrice] = React.useState('');
    const [radioChecked, setRadioChecked] = React.useState('first');
    const [images, setImages] = React.useState<string[]>([]);
    const [user, setUser] = React.useState<any>('');
    const [location, setLocation] = React.useState<Location.LocationObjectCoords | null>(null);
    const [errorMsg, setErrorMsg] = React.useState('');
    const [address, setAddress] = React.useState<string | null>(null);
    const [serviceType, setServiceType] = React.useState('homeBase');
    const [ads, setAds] = React.useState(false);

    const showAdModal = () => setAdModalVisible(true);
    const hideAdModal = () => setAdModalVisible(false);
    const showMapView = () => setMapViewVisible(true);
    const hideMapView = () => setMapViewVisible(false);

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

    const navigateToMaps = () => {
        // navigation.setOptions({
        //     params: { setLocation: handleSetLocation },
        //   });
        navigation.navigate('MapViewComponent', { setLocation: handleSetLocation });
        hideAdModal();
    }

    const handleSetLocation = (newLocation: any, newAddress: any) => {
        setLocation(newLocation);
        setAddress(newAddress);
        showAdModal();
    };

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
            const imageUri = result.assets[0].uri;
            const base64Image = await FileSystem.readAsStringAsync(imageUri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            console.log(base64Image);
            setImages((prevImages) => [...prevImages, imageUri]);
        }
    };

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    const handleCreatePost = async () => {
        try {
            const userDetails = await AsyncStorage.getItem('userDetails');
            if (userDetails !== null) {
                const userResponse = JSON.parse(userDetails); // Parse the JSON string back to an object
                const user = userResponse?._id;
                const adsPost = { serviceName, serviceDetails, serviceType, images, location, user, price: servicePrice };
                const response = await createAdsPost(adsPost);
                setAds(true);
                Alert.alert('Success', 'Ads post created successfully.');
            }

        } catch (error: any) {
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
                                <Text style={{ marginTop: 20, fontSize: 16 }}>Price: </Text>
                                <TextInput
                                    placeholder="Type the Service Price here"
                                    placeholderTextColor="grey"
                                    onChangeText={(servicePrice) => setServicePrice(servicePrice)}
                                    style={{ marginTop: 10 }}
                                />
                                <Text style={{ marginTop: 20, fontSize: 16 }}>Service Type: </Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value="homeBase"
                                        status={serviceType === 'homeBase' ? 'checked' : 'unchecked'}
                                        onPress={() => setServiceType('homeBase')}
                                        color='green'
                                    />
                                    <Text onPress={() => setServiceType('homeBase')} style={{ marginLeft: 8, fontSize: 16 }}>Home Base</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value="shopBase"
                                        status={serviceType === 'shopBase' ? 'checked' : 'unchecked'}
                                        onPress={() => setServiceType('shopBase')}
                                        color='green'
                                    />
                                    <Text onPress={() => setServiceType('shopBase')} style={{ marginLeft: 8, fontSize: 16 }}>Shop Base</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <RadioButton
                                        value="both"
                                        status={serviceType === 'both' ? 'checked' : 'unchecked'}
                                        onPress={() => setServiceType('both')}
                                        color='green'
                                    />
                                    <Text onPress={() => setServiceType('both')} style={{ marginLeft: 8, fontSize: 16 }}>Both</Text>
                                </View>
                                <Text style={{ marginTop: 20, fontSize: 16 }}>Location: </Text>
                                {address && <Text style={{ marginTop: 10, fontSize: 16 }}>{address}</Text>}
                                <Button onPress={navigateToMaps}>Set Location</Button>
                                <Text style={{ marginTop: 20, fontSize: 16 }}>Media: </Text>
                                <Button onPress={pickImage}>Upload Photo</Button>
                                <View style={styles.imageContainer}>
                                    {images.map((img, index) => (
                                        <Image key={index} source={{ uri: img }} style={styles.image} />
                                    ))}
                                </View>
                                <Button mode='contained' style={{ backgroundColor: 'darkseagreen' }} onPress={handleCreatePost}>Create Ad</Button>
                            </ScrollView>
                        </View>
                    </Modal>
                </Portal>
            </View>
            <View>
                <VendorDrawer navigation={navigation} />
                <View style={styles.content}>
                    <Text style={styles.title}>My Ads</Text>
                    <TouchableOpacity style={styles.newAdButton} onPress={showAdModal}>
                        <Text style={styles.newAdButtonText}>Create a new Ad</Text>
                    </TouchableOpacity>
                    {!ads ? (
                        <Text style={{ marginTop: 20, fontSize: 16 }}>No Service Ads Found</Text>
                    ) : (
                        <Card style={{ width: '90%', marginTop: 10 }}>
                            <Card.Cover />
                            <Card.Title title="Ad Name" />
                            <Card.Content>
                                <Text>Price: </Text>
                                <Text>Description: </Text>
                                <Button mode='contained' style={{ marginTop: 10, backgroundColor: 'red', width: '50%' }}>Delete Ad</Button>
                            </Card.Content>
                        </Card>
                    )}
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
    },
    mapView: {
        flex: 1
    },
    map: {
        width: '90%',
        height: '80%',
    },
})
