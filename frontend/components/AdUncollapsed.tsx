import { StyleSheet, View, Image, TouchableHighlight, Dimensions } from 'react-native'
import React from 'react'
import { Avatar, Button, Card, Text, IconButton, MD3Colors, ToggleButton } from 'react-native-paper';
import StarRating from './StarRating';

export type RootStackParamList = {
  IndividualAdScreen: { id?: number } | undefined
};
const AdUncollapsed = (props: any) => {

  const slideWidth = Dimensions.get('window').width;

  const [collapsed, setCollapsed] = React.useState(false);
  const onButtonPress = () => {
    setCollapsed(collapsed === false ? true : false);
  }

  const [status, setstatus] = React.useState(false);

  const onButtonToggle = () => {
    setstatus(status === false ? true : false);
  }
  return (
    <Card>
      <Button onPress={props.navigation}>
        <Card.Cover source={{ uri: 'https://vmo.rocks/wp-content/uploads/2014/08/connexion_nexus_ballroom_01.jpg' }} style={{ width: slideWidth }} />
      </Button>
      <View style={{position: 'absolute', marginTop: 30}}><StarRating rating={5}></StarRating></View>
      <Card.Title titleVariant='titleMedium' title='Qasim' style={{ position: 'absolute', top: 0 }} />
      <Card.Actions>
        <IconButton
          icon='share-variant'
          size={15}
          style={{ position: 'absolute', right: 88 }}
        />
        <Avatar.Icon
          icon="check-decagram"
          size={40}
          //iconColor='blue'
          style={{ backgroundColor: 'transparent', position: 'absolute', right: 130 }}
          color='blue'
        />
        <IconButton
          icon="eye"
          size={15}
          iconColor='grey'
          onPress={props.onButtonPress}
          style={{ position: 'absolute', right: 40 }}
        />
        <ToggleButton
          icon="heart"
          iconColor={`${props.status ? 'red' : 'grey'}`}
          onPress={props.onButtonToggle}
          style={{ position: 'absolute' }}
        />
      </Card.Actions>
      <Card.Content style={{ marginBottom: 5 }}>
        <Text variant="titleLarge" style={{ marginTop: 7 }}>{props?.data?.Name}</Text>
        <Text variant='bodyMedium'>{props?.data?.Address}</Text>
        <Text variant="bodyMedium">Step into the world of elegance and sophistication with our captivating marquee.
          Whether you're planning a lavish wedding,<Button onPress={props.navigation} style={{ paddingTop: 34 }}><Text style={{ fontWeight: 'bold', marginBottom: 0 }}>[see more...]</Text></Button>
        </Text>
      </Card.Content>
    </Card>
  )
}

export default AdUncollapsed

const styles = StyleSheet.create({})