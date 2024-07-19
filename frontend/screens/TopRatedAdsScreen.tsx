import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AdCard from '../components/AdCard'

const TopRatedAdsScreen = (props: any, {navigation}: any) => {

    const navigateToAdScreen = () => {
        navigation.navigate('AdScreen')
    }
    const Venues = [
        {
        id: 1,
        name: 'Pit Stop',
        uri:'https://img.freepik.com/premium-vector/piston-gear-logo-automotive-workshop-design-hexagon-shape-speed-shop-repair-garage_171487-401.jpg'
        },
        {
        id: 2,
        name: 'Tailor Shop',
        uri:'https://t4.ftcdn.net/jpg/03/69/03/07/360_F_369030788_LnS7DYA70VExiJT5QjnINHIKXQ9wUCcf.jpg'
        },
        {
        id: 3,
        name: 'Mobile Repairing',
        uri:'https://img.freepik.com/premium-vector/mobile-store-logo-design_23-2149750708.jpg'
        },
        {
        id: 4,
        name: 'Electrician for your house',
        uri:'https://camelotbanquets.com/wp-content/uploads/2020/01/0901-%C2%A9-KATANA-PHOTO.jpg'
        },
        {
        id: 5,
        name: 'Plumber for your house',
        uri:'https://ramyashotels.com/wp-content/uploads/2021/09/banquet-hall-trichy.jpg'
        },
        ];
  return (
    <View>
      <ScrollView>
      { 
      Venues?.map((item: any,index:any)=> (
        <AdCard key={index} data={item} navigation={navigateToAdScreen}/>
      ))
      }
      </ScrollView>
    </View>
  )
}

export default TopRatedAdsScreen

const styles = StyleSheet.create({})

