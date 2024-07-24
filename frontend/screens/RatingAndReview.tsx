import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'

const RatingAndReview = () => {
  return (
    <SafeAreaView>
    <View>
      <Text style={{marginTop: 10, marginBottom: 10, fontWeight: 'bold', marginLeft: 5}}>Vendor Reviews</Text>
      <Card style={{ backgroundColor: 'darkgrey', marginTop: 5, marginLeft: 5, marginRight: 5 }}>
              <Card.Title titleVariant='titleMedium' title='Qasim' style={{ top: 0, backgroundColor: 'grey' }} />
              <Card.Content style={{ marginBottom: 5 }}>
                <Text>
                  I recently visited Clip & Style Barbershop and had an outstanding experience. From the moment I walked in, I was greeted with a warm welcome and a friendly smile. The shop's atmosphere was modern yet cozy, with comfortable seating and a clean, organized setup.
                </Text>
              </Card.Content>
            </Card>
    </View>
    </SafeAreaView>
  )
}

export default RatingAndReview

const styles = StyleSheet.create({})