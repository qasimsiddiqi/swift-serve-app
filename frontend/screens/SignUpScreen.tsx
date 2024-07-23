import { Platform, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native'
import React from 'react'
import { Button, Dialog, IconButton, PaperProvider, Portal, TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { SelectList } from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { login, register } from '../constants/apiService';

const SignUpScreen = ({ navigation }: any) => {

  const serviceCategory = [
    { key: '1', value: 'Not Specified' },
    { key: '2', value: 'Barbers' },
    { key: '3', value: 'Gents Tailors' },
    { key: '4', value: 'Mobile Repairing' },
    { key: '5', value: 'Ladies Salons' },
    { key: '6', value: 'Ladies Tailors' },
    { key: '7', value: 'Electricians' },
    { key: '8', value: 'Plumbers' },
    { key: '9', value: 'Mechanics' },
  ];

  const accountType = [
    { key: '1', value: 'customer' },
    { key: '2', value: 'vendor' }
  ];

  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [reEnterPassword, setReEnterPassword] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [selected, setSelected] = React.useState("");
  const [selectedAccountType, setSelectedAccountType] = React.useState('');
  const [selectedServiceCategory, setSelectedServiceCategory] = React.useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [birthDate, setBirthDate] = React.useState('');
  const [image, setImage] = React.useState<string | null>(null);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const navigateToLoginScreen = () => {
    navigation.navigate('LoginScreen')
  }

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
      setImage(imageUri);
    }
  };


  const handleRegister = async () => {
    try {
      const selectedAccountTypeValue = accountType.find(item => item.key === selectedAccountType)?.value || '';
      const selectedServiceCategoryValues = serviceCategory.filter(item => selectedServiceCategory.includes(item.key)).map(item => item.value);

      const response = await register(email, fullName, password, selectedAccountTypeValue, selectedServiceCategoryValues, image);
      // console.log("STATUS CODE------------>", response.status);
      if (response.status === 201) {
        // console.log("Inside navigate to login screen------------>");
        navigateToLoginScreen();
        Alert.alert('Sign up Successful');
      }
    } catch (error) {
      // console.error("Error during sign up:", error); // Log the error
      Alert.alert('Sign up Failed');
    }
  };

  return (
    <PaperProvider>
      <View style={styles.background}>
        <View style={{ alignItems: 'center' }}><Text style={{ position: 'absolute', fontSize: 16, fontWeight: 'bold', marginTop: 40 }}>Create your new account</Text></View>
        <View style={styles.signUpStyle}>
          <ScrollView>
            <Text style={{ marginTop: 20, marginLeft: 5, fontSize: 14 }}>Name: </Text>
            <TextInput
              placeholder="Enter Full Name Here"
              placeholderTextColor="grey"
              onChangeText={(fullName) => setFullName(fullName)}
              style={{ backgroundColor: 'darkseagreen', width: '90%', height: 15, flex: 1, padding: 17, marginTop: 20 }}
            />
            <Text style={{ marginTop: 20, marginLeft: 5, fontSize: 14 }}>Email: </Text>
            <TextInput
              placeholder="abc@xyz.com"
              placeholderTextColor="grey"
              onChangeText={(email) => setEmail(email)}
              style={{ backgroundColor: 'darkseagreen', width: '90%', height: 15, flex: 1, padding: 17, marginTop: 20 }}
            />
            <Text style={{ marginTop: 20, marginLeft: 5, fontSize: 14 }}>Password: </Text>
            <TextInput
              placeholder="Set a New Password"
              placeholderTextColor="grey"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              style={{ backgroundColor: 'darkseagreen', width: '90%', height: 15, flex: 1, padding: 17, marginTop: 20 }}
            />
            <Text style={{ marginTop: 20, marginLeft: 5, fontSize: 14 }}>Re-Enter Password: </Text>
            <TextInput
              placeholder="re-enter password"
              placeholderTextColor="grey"
              secureTextEntry={true}
              onChangeText={(reEnterPassword) => setReEnterPassword(reEnterPassword)}
              style={{ backgroundColor: 'darkseagreen', width: '90%', height: 15, flex: 1, padding: 17, marginTop: 20 }}
            />
            <Text style={{ marginTop: 20, marginLeft: 5, fontSize: 14 }}>Account Type: </Text>
            <SelectList
              // onSelect={() => alert(selected)}
              setSelected={setSelectedAccountType}
              data={accountType}
              arrowicon={<IconButton icon={'chevron-down'} size={20} style={{ alignSelf: 'center', marginLeft: 0 }} />}
              searchicon={<IconButton icon={'chevron-down'} size={10} style={{}} />}
              search={false}
              boxStyles={{ borderRadius: 0, width: '90%', marginTop: 20, height: 50 }} //override default styles
              inputStyles={{ fontSize: 16, textAlign: 'center' }}
              defaultOption={{ key: '1', value: 'Customer' }}   //default selected option
            />
            {selectedAccountType === '2' && (
              <>
                <Text style={{ marginTop: 20, marginLeft: 5, fontSize: 14 }}>Service Category: </Text>
                <SelectList
                  setSelected={setSelectedServiceCategory}
                  data={serviceCategory}
                  arrowicon={<IconButton icon={'chevron-down'} size={20} style={{ alignSelf: 'center', marginLeft: 0 }} />}
                  searchicon={<IconButton icon={'chevron-down'} size={10} style={{}} />}
                  search={false}
                  boxStyles={{ borderRadius: 0, width: '90%', marginTop: 20, height: 50 }} //override default styles
                  inputStyles={{ fontSize: 16, textAlign: 'center' }}
                  defaultOption={{ key: '1', value: 'Not Specified' }}   //default selected option
                />
              </>
            )}
            <Text style={{ marginTop: 20, marginLeft: 5, fontSize: 14 }}>Profile Picture:  </Text>
            <Button onPress={pickImage}>Upload Photo</Button>
            <View style={styles.imageContainer}>
              {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
            <View>
              <View style={{ alignItems: 'center' }}>
                <Button onPress={handleRegister} style={{ marginTop: 20, backgroundColor: 'darkseagreen' }}><Text style={{ color: 'white' }}>Register</Text></Button>
                <Text style={{ marginTop: 10 }}>Already have an account? </Text>
                <TouchableOpacity style={{ marginTop: 10 }} onPress={navigateToLoginScreen}><Text style={{ textDecorationLine: 'underline' }}>Login</Text></TouchableOpacity>
              </View>
            </View>
            <View>
              <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} style={{ backgroundColor: 'lightgreen' }}>
                  <Dialog.Title>Sign Up</Dialog.Title>
                  <Dialog.Content>
                    <Text>Your Registration Was Successful</Text>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <Button onPress={hideDialog} style={{}}><Text style={{ color: 'darkgreen' }}>Done</Text></Button>
                  </Dialog.Actions>
                </Dialog>
              </Portal>
            </View>
          </ScrollView>
        </View>
      </View>
    </PaperProvider>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'darkseagreen'
  },
  signUpStyle: {
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
    height: 450,
    flex: 0,
    marginTop: 110,
  },
  input: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    fontSize: 16,
    marginBottom: 10,
  },
  title: {
    color: 'purple',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 200,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})