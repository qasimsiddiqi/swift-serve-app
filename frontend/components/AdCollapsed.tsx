import { StyleSheet, Text, View } from 'react-native'
import { Card, IconButton } from 'react-native-paper'
import React from 'react'
import CardContent from 'react-native-paper/lib/typescript/components/Card/CardContent'

const AdCollapsed = (props:any) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const onButtonPress = () => {
   setCollapsed(collapsed === false ? true:false);
  }
  return (
    <View>
      <Card>
      <Card.Title titleVariant='titleMedium' title='Qasim'/>
      <Card.Content>
        <Text>Service Type: </Text>
        <IconButton
        icon="eye-off"
        iconColor='grey'
        onPress={props.onButtonPress}
        />
      </Card.Content>
      </Card>
    </View>
  )
}

export default AdCollapsed

const styles = StyleSheet.create({})