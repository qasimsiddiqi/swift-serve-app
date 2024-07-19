import * as React from 'react';
import { Avatar, Button, Card, Text, IconButton, MD3Colors, ToggleButton } from 'react-native-paper';
import AdCollapsed from './AdCollapsed';
import AdUncollapsed from './AdUncollapsed';


const AdCard = ( {data, navigation }: any) => {

   const [collapsed, setCollapsed] = React.useState(false);
   const onButtonPress = () => {
    setCollapsed(collapsed === false ? true:false);
   }
   const [status, setstatus] = React.useState(false);
   const onButtonToggle = () => {
    setstatus( status === false ? true:false);
  }
  
    return(
      <>{
        collapsed ? (<AdCollapsed 
          data={data}
          onButtonPress={onButtonPress}
        />): (<AdUncollapsed
        data={data}
        onButtonPress={onButtonPress}
        status={status}
        onButtonToggle={onButtonToggle}
        navigation = {navigation}
        />)
      }

      </>
    )
}
export default AdCard