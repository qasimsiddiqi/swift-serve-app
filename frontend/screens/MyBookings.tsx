import { StyleSheet, Text, Touchable, View } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Card, IconButton, SegmentedButtons } from 'react-native-paper';
import Icon from 'react-native-fontawesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MyBookings = ({navigation}: any) => {
  const [value, setValue] = React.useState('pending');

  const navigateToAdScreen = () => {
    navigation.navigate('AdScreen')
  }

  const renderContent = () => {
    switch (value) {
      case 'pending':
        return (
          <>
            <Text style={styles.tabContent}>Pending Bookings</Text>
            <View>
              <Card>
                <Card.Title titleVariant='titleMedium' title="barber" />
                <Card.Content>
                  <Text>Requested Service: Haircut and Facial Service</Text>
                  <Text>Price: 30,000 Rs</Text>
                  <Text>Date: 07-11-24</Text>
                  <Text>Time: 1:25 pm</Text>
                  <TouchableOpacity><Text onPress={navigateToAdScreen}style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>Details</Text></TouchableOpacity>
                </Card.Content>
              </Card>
            </View>
          </>
        );
      case 'approved':
        return (
          <>
            <Text style={styles.tabContent}>Approved Bookings</Text>
            <View>
              <Card>
                <Card.Title titleVariant='titleMedium' title="Mechanic" />
                <Card.Content>
                  <Text>Requested Service: General Maintainance of Vehicle</Text>
                  <Text>Price: 30,000 Rs</Text>
                  <Text>Date: 07-11-24</Text>
                  <Text>Time: 1:25 pm</Text>
                  <TouchableOpacity><Text onPress={navigateToAdScreen}style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>Details</Text></TouchableOpacity>
                </Card.Content>
              </Card>
            </View>
          </>
        );
      case 'rejected':
        return (
          <>
            <Text style={styles.tabContent}>Rejected Bookings</Text>
            <View>
              <Card>
                <Card.Title titleVariant='titleMedium' title="Electrician" />
                <Card.Content>
                  <Text>Requested Service: Wiring problems in house</Text>
                  <Text>Price: 30,000 Rs</Text>
                  <Text>Date: 07-11-24</Text>
                  <Text>Time: 1:25 pm</Text>
                  <TouchableOpacity><Text onPress={navigateToAdScreen}style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>Details</Text></TouchableOpacity>
                </Card.Content>
              </Card>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Bookings</Text>
        </View>
        <View style={styles.segmentedButtonsContainer}>
          <SegmentedButtons
            value={value}
            onValueChange={setValue}
            buttons={[
              { value: 'pending', label: 'Pending' },
              { value: 'approved', label: 'Approved' },
              { value: 'rejected', label: 'Rejected' },
            ]}
          />
        </View>
        <View style={styles.contentContainer}>
          {renderContent()}
        </View>
      </View>
    </SafeAreaProvider>
  );
};

export default MyBookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  segmentedButtonsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  tabContent: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
