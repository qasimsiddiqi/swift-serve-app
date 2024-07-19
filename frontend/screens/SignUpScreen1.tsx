import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'


const SignUpScreen1 = ( {navigation}: any ) => {

    const navigateToSignUpScreen = () => {
        navigation.navigate('SignupScreen')
    }
    const navigateToLoginScreen = () => {
        navigation.navigate('LoginScreen')
    }
  return (
    <SafeAreaView>
    <View style={styles.hero}>
    <View style={styles.content}>
        <Image source={{uri: 'SwiftServe Logo 2.png'}} />
    <View style={styles.header}>
    <Text style={styles.title}>Book Your Services{'\n'}with SwiftServe</Text>
    </View>
    </View>
    </View>
    <Text style={styles.message}>Finding Services made much easier</Text>
    <Button  onPress={navigateToLoginScreen} style={{backgroundColor:'darkseagreen', margin:20}}><Text style={{fontSize:16 ,color:'darkgreen'}}>Login</Text></Button>
    <Button  onPress={navigateToSignUpScreen} style={{backgroundColor:'darkseagreen', margin:20}}><Text style={{fontSize:16 ,color:'darkgreen'}}>Sign Up as a Customer</Text></Button>
    <Button  onPress={navigateToSignUpScreen} style={{backgroundColor:'darkseagreen', margin: 20}}><Text style={{fontSize:16 ,color:'darkgreen'}}>Sign Up as a Vendor</Text></Button>
    </SafeAreaView>
  )
}

export default SignUpScreen1

const styles = StyleSheet.create({
    content:{
        padding:24
    },
    header:{
        paddingHorizontal:24
    },
    title: {
        fontSize: 28,
        lineHeight: 40,
        fontWeight: '500',
        color: '#281b52',
        textAlign: 'center',
        marginBottom: 12,
        },
    message: {
        fontSize: 15,
        lineHeight: 24,
        fontWeight: '400',
        color: '#9992a7',
        textAlign: 'center',
        },
    hero: {
            backgroundColor: '#66cdaa',
            padding: 16,
            borderRadius: 16,
            margin: 12,
        },
    heroImg: {
            width: '100%',
            height: 400,
            },
})