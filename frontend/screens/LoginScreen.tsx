import { Alert, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Dialog, PaperProvider, Portal, TextInput, TouchableRipple } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { login } from '../constants/apiService';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [clientDialogVisible, setClientDialogVisible] = React.useState(false);
  const [VendorDialogVisible, setVendorDialogVisible] = React.useState(false);
  const showClientDialog = () => setClientDialogVisible(true);
  const showVendorDialog = () => setVendorDialogVisible(true);
  const hideClientDialog = () => setClientDialogVisible(false);
  const hideVendorDialog = () => setVendorDialogVisible(false);
  const navigateToSignUpScreen = () => {
    navigation.navigate('SignupScreen')
  }
  const navigateToUserHomeScreen = () => {
    navigation.navigate('UserHomeScreen')
  }
  const navigateToVendorHomeScreen = () => {
    navigation.navigate('VendorHomeScreen')
  }

  const handleLogin = async () => {
    try {
      const data = await login(email, password);
      console.log("Login response---->",data?.token)
      if(data?.token){
      navigateToUserHomeScreen()
      Alert.alert('Login Successful');
      }
    } catch (error) {
      Alert.alert('Invalid Credentials');
    }
  };

  return (
    <PaperProvider>
      <View style={styles.background}>
        <View style={{alignItems: 'center'}}><Text style={{ position: 'absolute', fontSize: 16, fontWeight: 'bold', marginTop: 60 }}>Login to your account</Text></View>
        <View style={styles.loginStyle}>
        <Text style={{ position: 'absolute', marginTop: 45, marginLeft: 20, fontSize: 16 }}>Email: </Text>
        <Text style={{ position: 'absolute', marginTop: 135, marginLeft: 20, fontSize: 16 }}>Password: </Text>
        <View style={{ height: 45, marginBottom: 20 }}>
          <TextInput
            placeholder="abc@xyz.com"
            placeholderTextColor="grey"
            onChangeText={(email) => setEmail(email)}
            style={{ backgroundColor: 'darkseagreen', position: 'absolute', width: 210, height: 15, flex: 1, padding: 10, marginLeft: 100, marginTop: 25 }}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            style={{ backgroundColor: 'darkseagreen', position: 'absolute', width: 210, height: 15, flex: 1, padding: 10, marginLeft: 100, marginTop: 115 }}
          />
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={{ position: 'absolute', marginTop: 185 }}><Text style={{ textDecorationLine: 'underline' }}>Forgot Password?</Text></TouchableOpacity>
            <Text style={{ position: 'absolute', marginTop: 220 }}>Don't have an account?</Text>
            <TouchableOpacity style={{ position: 'absolute', marginTop: 240 }} onPress={navigateToSignUpScreen}><Text style={{ textDecorationLine: 'underline' }}>Sign Up</Text></TouchableOpacity>
            <Button onPress={navigateToUserHomeScreen} style={{ position: 'absolute', marginTop: 270, backgroundColor: 'darkseagreen' }}><Text style={{ fontSize: 16, color: 'white' }}>CLIENT LOGIN</Text></Button>
            <Button onPress={showVendorDialog} style={{ position: 'absolute', marginTop: 320, backgroundColor: 'darkseagreen' }}><Text style={{ fontSize: 16, color: 'white' }}>VENDOR LOGIN</Text></Button>
          </View>
        </View>
        <View>
          <Portal>
            <Dialog visible={clientDialogVisible} onDismiss={hideClientDialog} style={{ backgroundColor: 'lightgreen' }}>
              <Dialog.Title>Client Login</Dialog.Title>
              <Dialog.Content>
                <Text>Your Login Was Successful</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={navigateToUserHomeScreen}><Text style={{ color: 'darkgreen' }}>Done</Text></Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          </View>
          <View>
          <Portal>
            <Dialog visible={VendorDialogVisible} onDismiss={hideVendorDialog} style={{ backgroundColor: 'lightgreen' }}>
              <Dialog.Title>Vendor Login</Dialog.Title>
              <Dialog.Content>
                <Text>Your Login Was Successful</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={navigateToVendorHomeScreen}><Text style={{ color: 'darkgreen' }}>Done</Text></Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          </View>
      </View>
      </View>
    </PaperProvider>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#66cdaa'
  },
  loginStyle: {
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
    flex:0,
    marginTop:130,
  },
  background: {
    backgroundColor: 'darkseagreen'
  }
})