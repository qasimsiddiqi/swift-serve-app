import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Avatar, IconButton, ToggleButton, Text, Button, Portal, Modal, TextInput, Menu, MD3Colors, Card } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import CarouselCard from '../components/CarouselCard';
import { SelectList } from 'react-native-dropdown-select-list';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';
import Icon from 'react-native-fontawesome';
import { MaterialIcons } from '@expo/vector-icons';
import StarRating from '../components/StarRating';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBooking, createReview } from '../constants/apiService';

const AdScreen = ({ route, navigation }: any) => {
  const { adDetails } = route.params;
  const hours = [
    { key: '1', value: 'Hour' },
    { key: '2', value: '01' },
    { key: '3', value: '02' },
    { key: '4', value: '03' },
    { key: '5', value: '04' },
    { key: '6', value: '05' },
    { key: '7', value: '06' },
    { key: '8', value: '07' },
    { key: '9', value: '08' },
    { key: '10', value: '09' },
    { key: '11', value: '10' },
    { key: '12', value: '11' },
    { key: '13', value: '12' },
  ];

  const minutes = [
    { key: '1', value: 'Minute' },
    { key: '2', value: '00' },
    { key: '3', value: '01' },
    { key: '4', value: '02' },
    { key: '5', value: '03' },
    { key: '6', value: '04' },
    { key: '7', value: '05' },
    { key: '8', value: '06' },
    { key: '9', value: '07' },
    { key: '10', value: '08' },
    { key: '11', value: '09' },
    { key: '12', value: '10' },
    { key: '13', value: '11' },
    { key: '14', value: '12' },
    { key: '15', value: '13' },
    { key: '16', value: '14' },
    { key: '17', value: '15' },
    { key: '18', value: '16' },
    { key: '19', value: '17' },
    { key: '20', value: '18' },
    { key: '21', value: '19' },
    { key: '22', value: '20' },
    { key: '23', value: '21' },
    { key: '24', value: '22' },
    { key: '25', value: '23' },
    { key: '26', value: '24' },
    { key: '27', value: '25' },
    { key: '28', value: '26' },
    { key: '29', value: '27' },
    { key: '30', value: '28' },
    { key: '31', value: '29' },
    { key: '32', value: '30' },
    { key: '33', value: '31' },
    { key: '34', value: '32' },
    { key: '35', value: '33' },
    { key: '36', value: '34' },
    { key: '37', value: '35' },
    { key: '38', value: '36' },
    { key: '39', value: '37' },
    { key: '40', value: '38' },
    { key: '41', value: '39' },
    { key: '42', value: '40' },
    { key: '43', value: '41' },
    { key: '44', value: '42' },
    { key: '45', value: '43' },
    { key: '46', value: '44' },
    { key: '47', value: '45' },
    { key: '48', value: '46' },
    { key: '49', value: '47' },
    { key: '50', value: '48' },
    { key: '51', value: '49' },
    { key: '52', value: '50' },
    { key: '53', value: '51' },
    { key: '54', value: '52' },
    { key: '55', value: '53' },
    { key: '56', value: '54' },
    { key: '57', value: '55' },
    { key: '58', value: '56' },
    { key: '59', value: '57' },
    { key: '60', value: '58' },
    { key: '61', value: '59' },
    { key: '62', value: '60' },
  ];

  const timeOfDay = [
    { key: '1', value: 'Am' },
    { key: '2', value: 'Pm' },
  ];

  const [status, setstatus] = React.useState(false);
  const [bookingModalvisible, setBookingModalVisible] = React.useState(false);
  const [ratingModalVisible, setRatingModalVisible] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState('');
  const [calendarVisible, setCalendarVisible] = React.useState(false);
  const [selectedCity, setSelectedCity] = React.useState(null);
  const [visible, setVisible] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  const [starRating, setStarRating] = React.useState(0);
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState<'date' | 'time'>('date');
  const [show, setShow] = React.useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    if (selectedDate && selectedDate > new Date()) {
      setDate(currentDate);
    }
  };

  const showMode = (currentMode: 'date' | 'time') => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  const [review, setReview] = React.useState('');

  const handleDayPress = (day: { dateString: React.SetStateAction<string>; }) => {
    setSelectedDate(day.dateString);
  }
  const handleCityChange = (value: any) => {
    setSelectedCity(value);
    closeMenu();
  };
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const toggleCalendarVisibility = () => {
    setCalendarVisible(!calendarVisible);
  };

  const onButtonToggle = () => {
    setstatus(status === false ? true : false);
  }
  const navigateToRating = () => {
    navigation.navigate('Rating And Review')
  }

  const showBookingModal = () => setBookingModalVisible(true);
  const hideBookingModal = () => setBookingModalVisible(false);
  const showRatingModal = () => setRatingModalVisible(true);
  const hideRatingModal = () => setRatingModalVisible(false);

  class ReviewStarRating extends Component {
    constructor(props: any) {
      super(props);
      this.state = {
        starCount: 3.5
      };
    }

    onStarRatingPress(rating: any) {
      this.setState({
        starCount: rating
      });
    }
  }

  const handleCreateBooking = async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      if (userDetails !== null) {
        const userResponse = JSON.parse(userDetails); // Parse the JSON string back to an object
        const userId = userResponse?._id;
        const bookingDetails = { user: userId, adsPost: adDetails._id, serviceName: adDetails.serviceName, date };
        const response = await createBooking(bookingDetails);
        console.log("Res", response)
        Alert.alert('Success', 'Booked successfully.');
      }

    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handelCreateReview = async () => {
    try {
      const userDetails = await AsyncStorage.getItem('userDetails');
      if (userDetails !== null) {
        const userResponse = JSON.parse(userDetails); // Parse the JSON string back to an object
        const userId = userResponse?._id;
        const reviewDetails = { user: userId, adsPost: adDetails._id, rating: starRating, comments: review, image: '' };
        const response = await createReview(reviewDetails);
        console.log("Res", response)
        Alert.alert('Success', 'Thanks for reviewing.');
      }

    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };


  return (
    <SafeAreaProvider>
      <ScrollView>
        <View>
          <Portal>
            <Modal
              visible={bookingModalvisible}
              onDismiss={hideBookingModal}>
              <View style={styles.RatingModal}>
                <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Book a slot now</Text>
                <ScrollView>
                  <Text style={{ marginTop: 10, fontSize: 16 }}>Requested Service: </Text>
                  <TextInput style={{ marginTop: 10, height: 45 }}></TextInput>
                  <Text style={{ marginTop: 10, fontSize: 16 }}>Date: </Text>
                  <View>
                    <Button onPress={showDatepicker}>Pick a Date</Button>
                  </View>
                  <Text style={{ marginTop: 10, fontSize: 16 }}>Time: </Text>
                  <View>
                    <Button onPress={showTimepicker}>Pick a Time</Button>
                    <Text style={{ marginTop: 10, fontSize: 16 }}>Selected Date & Time: </Text><Text style={{ marginTop: 10, fontSize: 16, textAlign: 'center' }}>{date.toLocaleString()}</Text>
                    {show && (
                      <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={false}
                        display="default"
                        onChange={onChange}
                        minimumDate={new Date()}
                      />
                    )}
                  </View>
                  <Button onPress={handleCreateBooking} mode='contained' style={{ backgroundColor: 'darkseagreen', paddingTop: 5, marginRight: 90, marginLeft: 90, marginTop: 40 }}><Text>Book Now</Text></Button>
                </ScrollView>
              </View>
            </Modal>
            <Modal
              visible={ratingModalVisible}
              onDismiss={hideRatingModal}>
              <View style={styles.RatingModal}>
                <SafeAreaView style={{ flex: 1 }}>
                  <View style={{ alignItems: 'center' }}><Text style={{ fontSize: 18, fontWeight: 'bold' }}>How was this service?</Text></View>
                  <ScrollView>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.heading}>Tap to rate</Text>
                      <View style={styles.stars}>
                        <TouchableOpacity onPress={() => setStarRating(1)}>
                          <MaterialIcons
                            name={starRating >= 1 ? 'star' : 'star-border'}
                            size={32}
                            style={starRating >= 1 ? styles.starSelected : styles.starUnselected}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStarRating(2)}>
                          <MaterialIcons
                            name={starRating >= 2 ? 'star' : 'star-border'}
                            size={32}
                            style={starRating >= 2 ? styles.starSelected : styles.starUnselected}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStarRating(3)}>
                          <MaterialIcons
                            name={starRating >= 3 ? 'star' : 'star-border'}
                            size={32}
                            style={starRating >= 3 ? styles.starSelected : styles.starUnselected}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStarRating(4)}>
                          <MaterialIcons
                            name={starRating >= 4 ? 'star' : 'star-border'}
                            size={32}
                            style={starRating >= 4 ? styles.starSelected : styles.starUnselected}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setStarRating(5)}>
                          <MaterialIcons
                            name={starRating >= 5 ? 'star' : 'star-border'}
                            size={32}
                            style={starRating >= 5 ? styles.starSelected : styles.starUnselected}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>review/comments:</Text>
                      <TextInput onChangeText={(e) => setReview(e)} style={{ marginTop: 20, width: "90%", height: 100, padding: 0 }}></TextInput>
                      <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 20 }}>Add Media:</Text>
                      <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <MaterialIcons
                          name='camera-alt'
                          size={30}
                          style={{ paddingRight: 30 }}
                        />
                        <MaterialIcons
                          name='file-upload'
                          size={30}
                        />
                      </View>
                    </View>
                    <Button onPress={handelCreateReview} mode='contained' style={{ backgroundColor: 'darkseagreen', padding: 5, marginRight: 90, marginLeft: 90 }}><Text>Post</Text></Button>
                  </ScrollView>
                </SafeAreaView>
              </View>
            </Modal>
          </Portal>
          <CarouselCard></CarouselCard>
          <View>
            <StarRating rating={3}></StarRating>
          </View>
          <Avatar.Icon
            icon="check-decagram"
            size={35}
            style={{ position: 'absolute', top: 265, right: 220, backgroundColor: 'transparent' }}
            color='blue'
          />
          <IconButton
            icon='share-variant'
            size={20}
            style={{ position: 'absolute', top: 197, right: 30 }}
          />
          <ToggleButton
            icon="heart"
            iconColor={`${status ? 'red' : 'grey'}`}
            onPress={onButtonToggle}
            size={25}
            style={{ position: 'absolute', top: 200, right: 2 }}
          />
          <Text variant='titleLarge' style={{ paddingTop: 5, paddingLeft: 5, fontWeight: 'bold' }}>{adDetails.serviceName}</Text>
          <Text variant='titleMedium' style={{ paddingTop: 5, paddingLeft: 5, fontWeight: 'bold' }}>{adDetails.vendorName}</Text>
          <IconButton icon='google-maps' /><Text style={{ marginLeft: 30 }}>Longitude: {adDetails.location.longitude} Latitude: {adDetails.location.latitude}</Text>
          <Text variant='titleMedium' style={{ paddingTop: 20, paddingLeft: 5, fontWeight: 'bold' }}>{adDetails.serviceDetails}</Text>
          <Text variant="bodyMedium" style={{ paddingTop: 5, paddingLeft: 5 }}>{adDetails.description}</Text>
          <Text variant='titleMedium' style={{ paddingTop: 20, paddingLeft: 5, fontWeight: 'bold' }}>Service Catalog</Text>
          <Text variant="bodyMedium" style={{ paddingTop: 5, paddingLeft: 5 }}>{adDetails.serviceCatalog}</Text>
          <Text variant="bodyMedium" style={{ paddingTop: 5, paddingLeft: 5 }}>Complete Service Catalog of the Vendor will appear here</Text>
          <View style={{ borderColor: 'black', borderRadius: 5, paddingBottom: 20, borderWidth: 1, margin: 5, justifyContent: 'center' }}>
            <Text variant='titleMedium' style={{ paddingTop: 20, paddingLeft: 5, fontWeight: 'bold' }}>Reviews and Ratings</Text>
            <Text variant="bodyMedium" style={{ paddingTop: 5, paddingLeft: 5 }}>Reviews and ratings of the Vendor will appear here</Text>
            <Card style={{ backgroundColor: 'darkgrey', marginTop: 5, marginLeft: 5, marginRight: 5 }}>
              <Card.Title titleVariant='titleMedium' title='Qasim' style={{ top: 0, backgroundColor: 'grey' }} />
              <Card.Content style={{ marginBottom: 5 }}>
                <Text variant="bodyMedium">
                  I recently visited Clip & Style Barbershop and had an outstanding experience. From the moment I walked in, I was greeted with a warm welcome and a friendly smile. The shop's atmosphere was modern yet cozy, with comfortable seating and a clean, organized setup.
                </Text>
              </Card.Content>
            </Card>
            <Button onPress={showRatingModal} mode='contained' style={{ backgroundColor: 'darkseagreen', paddingTop: 5, marginRight: 70, marginLeft: 70, marginTop: 10 }}><Text>Add a Review</Text></Button>
            {/* </ScrollView> */}
          </View>
          <Button onPress={showBookingModal} mode='contained' style={{ backgroundColor: 'darkseagreen', paddingTop: 5, marginRight: 100, marginLeft: 100, marginTop: 10, marginBottom: 10 }}><Text>Book Now</Text></Button>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  )
}

export default AdScreen

const styles = StyleSheet.create({
  RatingModal: {
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
  ratingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 30,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
})

function setSelected(dateString: any) {
  throw new Error('Function not implemented.');
}
