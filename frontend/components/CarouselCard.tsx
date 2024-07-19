import React from 'react';
import {View, StyleSheet, Image, ScrollView, Dimensions, ImageBackground, Modal, TouchableOpacity} from 'react-native'
import { Avatar, Button, Card, Text, IconButton, MD3Colors} from 'react-native-paper';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';

type Status = AVPlaybackStatus & { isPlaying: boolean };

const CarouselCard = () => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({isPlaying: false});
    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [selectedMediaType, setSelectedMediaType] = React.useState('image');
 
    const handleScroll = (event: any) => {
       const slideWidth = Dimensions.get('window').width;
       const slideHeight = Dimensions.get('window').height;
       const currentIndex = Math.floor(event.nativeEvent.contentOffset.x / slideWidth);
       setActiveIndex(currentIndex);
     };
 
     const handleMediaPress = (index: any, type:any) => {
       setActiveIndex(index);
       setModalVisible(true);
       setSelectedMediaType(type);
     };
 
     const closeModal = () => {
       setModalVisible(false);
    };
 
     const mediaItems = [
        {
          type:'image',
          uri: 
          'https://img.freepik.com/premium-vector/piston-gear-logo-automotive-workshop-design-hexagon-shape-speed-shop-repair-garage_171487-401.jpg',
       },
       {
          type:'image',
          uri: 
          'https://img.freepik.com/premium-vector/mobile-store-logo-design_23-2149750708.jpg',
       },
       {
          type:'image',
          uri: 
          'https://t4.ftcdn.net/jpg/03/69/03/07/360_F_369030788_LnS7DYA70VExiJT5QjnINHIKXQ9wUCcf.jpg',
       },
       {
          type:'video',
          uri: 
          'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
       },
    ];
    const slideWidth = Dimensions.get('window').width;
     const slideHeight = Dimensions.get('window').height;
     const totalItems = mediaItems.length;
  return (
    <View style={{backgroundColor:'black'}}>
             <Modal
                visible={modalVisible}
                transparent={true}
                onRequestClose={closeModal}
             >
          <ScrollView
             horizontal
             pagingEnabled
             showsHorizontalScrollIndicator={false}
             onScroll={handleScroll}
             scrollEventThrottle={200}
          >  
                {mediaItems.map((item: any, index: any) => {
                   if (item.type==='image'){
                      return (
                      <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: slideWidth, height: slideHeight, backgroundColor:'black' }}>
                         <Button onPress={closeModal} style={{position: 'absolute', top:10, right:10}}><Text style={{fontSize:15, color:'white'}}>Close</Text></Button>
                         <Text style={{ position: 'absolute', top: 10, left: 10, color: 'white', fontSize: 15 }}>
                           {`${activeIndex + 1}/${mediaItems.length}`}
                         </Text>
                            <Image
                               key={index}
                               source={{ uri: item.uri }}
                               style={{ width: slideWidth, height: 300 }} />
                         
                      </View>
                   );
                  }
                  else if (item.type==='video'){
                     return (
                        <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: slideWidth, height: slideHeight, backgroundColor:'black' }}>
                        <Button onPress={closeModal} style={{position: 'absolute', top:10, right:10}}><Text style={{fontSize:15, color:'white'}}>Close</Text></Button>
                         <Text style={{ position: 'absolute', top: 10, left: 10, color: 'white', fontSize: 15 }}>
                           {`${activeIndex + 1}/${mediaItems.length}`}
                         </Text>
                        <Video
                           key = {index}
                           ref={video}
                           style={{ width: slideWidth, height:200 }}
                           source={{uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
                           useNativeControls
                           resizeMode={ResizeMode.CONTAIN}
                           isLooping
                           onPlaybackStatusUpdate={(status) => {
                              if ('isPlaying' in status) {
                                 setStatus((prevStatus) => ({
                                    ...prevStatus,
                                    ...(status as Status),
                                    isPlaying: status.isPlaying,
                                 }));
                              }
                           } } />
                        </View>
                     )
                  }
                }
                )}
             </ScrollView>
       </Modal>
       <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={200}
       >
             {mediaItems.map((item: any, index: any) => {
               if (item.type === 'image'){
                return (
                        <TouchableOpacity key={index} onPress={() => handleMediaPress(index, item.type)}>
                           <Image key={index} source={{ uri: item.uri }} style={{ width: slideWidth, height: 200 }} />
                        </TouchableOpacity>
                     );
                }
                else if (item.type === 'video'){
                  return (
                     <View>
                     <Video
                        key = {index}
                        ref={video}
                        style={{ width: slideWidth, height:200 }}
                        source={{uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        onPlaybackStatusUpdate={(status) => {
                           if ('isPlaying' in status) {
                              setStatus((prevStatus) => ({
                                 ...prevStatus,
                                 ...(status as Status),
                                 isPlaying: status.isPlaying,
                              }));
                           }
                        } } />
                     </View>
                  )
                }
             }
             )}
          </ScrollView>
          <View style={{position:'absolute', top:170, left:10, backgroundColor: 'white'}}>
             
                 <Text style={{ margin: 2, color: 'black', fontSize: 15 }}>
                 {`${activeIndex + 1}/${mediaItems.length}`}
               </Text>
             
          </View>
          </View>
  )
}

export default CarouselCard

const styles = StyleSheet.create({})