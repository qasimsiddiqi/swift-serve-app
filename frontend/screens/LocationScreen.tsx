import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import AdCard from '../components/AdCard';

const LocationScreen = ({ navigation }: any) => {

  const [location, setLocation] = React.useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = React.useState('');

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

  const navigateToAdScreen = () => {
    navigation.navigate('AdScreen')
  }

  const Venues = [
    {
      id: 1,
      name: 'Pit Stop',
      uri: 'https://img.freepik.com/premium-vector/piston-gear-logo-automotive-workshop-design-hexagon-shape-speed-shop-repair-garage_171487-401.jpg'
    },
    {
      id: 2,
      name: 'Tailor Shop',
      uri: 'https://t4.ftcdn.net/jpg/03/69/03/07/360_F_369030788_LnS7DYA70VExiJT5QjnINHIKXQ9wUCcf.jpg'
    },
    {
      id: 3,
      name: 'Mobile Repairing',
      uri: 'https://img.freepik.com/premium-vector/mobile-store-logo-design_23-2149750708.jpg'
    },
    {
      id: 4,
      name: 'Electrician for your house',
      uri: 'https://camelotbanquets.com/wp-content/uploads/2020/01/0901-%C2%A9-KATANA-PHOTO.jpg'
    },
    {
      id: 5,
      name: 'Plumber for your house',
      uri: 'https://ramyashotels.com/wp-content/uploads/2021/09/banquet-hall-trichy.jpg'
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Near Me</Text>
      </View>
      <ScrollView>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={{
              latitude: location ? location.latitude : 37.78825,
              longitude: location ? location.longitude : -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
          >
            {location && (
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title="You are here"
                description="This is your current location"
              />
            )}
          </MapView>
        </View>
        <View>
          <ScrollView>
            {
              Venues?.map((item: any, index: any) => (
                <AdCard key={index} data={item} navigation={navigateToAdScreen} />
              ))
            }
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginVertical: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: 300,
  },
});