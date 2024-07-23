import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapView, { Marker } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import AdCard from '../components/AdCard';
import UserDrawer from '../navigation/Drawer/UserDrawer';
import { Button } from 'react-native-paper';

const MapViewComponent = ({navigation, route}: any) => {
  const { setLocation } = route.params || {};
  const [location, setInternalLocation] = React.useState<Location.LocationObjectCoords | null>(null);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [address, setAddress] = React.useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setInternalLocation(currentLocation.coords);
      let reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      if (reverseGeocode.length > 0) {
        const addressObject = reverseGeocode[0];
        const street = addressObject.name || addressObject.street || 'Unknown street';
        const city = addressObject.city || 'Unknown city';
        const region = addressObject.region || 'Unknown region';
        setAddress(`${street}, ${city}, ${region}`);
      }
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const handleSetLocation = () => {
    if (location && address) {
      setLocation(location, address);
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView>
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
          <View>
            <Button onPress={handleSetLocation} style={styles.locationButton}><Text style = {styles.locationButtonText}>Set Location</Text></Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MapViewComponent

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 70,
  },
  locationButton: {
    backgroundColor: 'darkseagreen',
    borderRadius: 0,
    width: Dimensions.get('window').width,
    height: 50
  },
  locationButtonText: {
    color: 'white',
    fontSize: 16,
    
  }
})