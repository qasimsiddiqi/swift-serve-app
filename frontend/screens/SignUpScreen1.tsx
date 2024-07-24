import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../constants/Colors'
import { ScrollView } from 'react-native-gesture-handler'


const SignUpScreen1 = ({ navigation }: any) => {

    const navigateToSignUpScreen = () => {
        navigation.navigate('SignupScreen')
    }
    const navigateToLoginScreen = () => {
        navigation.navigate('LoginScreen')
    }
    return (
        <SafeAreaView>
            <ScrollView>
            <View style={styles.hero}>
                <View style={styles.content}>
                    <Image source={require('../assets/SwiftServe_Logo-removebg.png')} style={styles.logo} />
                    <View style={styles.header}>
                        <Text style={styles.title}>Book Your Services{'\n'}with SwiftServe</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.message}>Finding Services made much easier</Text>
            <Button onPress={navigateToLoginScreen} style={{ backgroundColor: 'limegreen', margin: 20 }}><Text style={{ fontSize: 16, color: 'darkgreen' }}>Login</Text></Button>
            <Button onPress={navigateToSignUpScreen} style={{ backgroundColor: 'limegreen', margin: 20 }}><Text style={{ fontSize: 16, color: 'darkgreen' }}>Signup</Text></Button>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUpScreen1

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    content:{
        padding:24
    },
    header: {
        paddingHorizontal: 24
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
        fontSize: 18,
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