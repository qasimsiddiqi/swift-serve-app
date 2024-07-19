import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-paper';
import React from 'react'

const renderStar = (filled: boolean, key: number) => {
    return (
      <Avatar.Icon
        key={key}
        size={30}
        icon={filled ? 'star' : 'star-outline'}
        color={filled ? 'gold' : 'gray'}
        style={{ backgroundColor: 'transparent', marginRight:-10, paddingLeft:15}}
      />
    );
  };
  
  const StarRating = ({ rating }: { rating: number }) => {
    const stars = Array.from({ length: 5 }, (_, index) =>
      renderStar(index < rating, index)
    );
  
    return <View style={{flexDirection: 'row'}}>{stars}</View>;
  };
  
  export default StarRating;
const styles = StyleSheet.create({})