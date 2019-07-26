
import React, { Component } from 'react';
import {createDrawerNavigator,createAppContainer,createStackNavigator,DrawerItems } from 'react-navigation';
import {View , Text} from 'react-native'
import Aganda from './Aganda'
import Logout from './Logout'
import Home from './Home'
import {Image} from 'react-native'
import MesTypes from './MesTypes'
const DrawerContent = (props) => (
  <View>
    <View
      style={{
        backgroundColor: '#FFFFFF',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image style={{ width:100,height:100 }} source={require('../img/reunion.jpg')} >
        
      </Image>
    </View>
    <DrawerItems {...props} />

  </View>
)

const stack=createStackNavigator(
  
    {
      
      Logout:Logout,
      
    
    
    
    },
    {initialRouteName: 'Logout',
      headerMode: 'none',
    
    navigationOptions: {
    headerVisible: false,}
  }
    )
    
const AppNavigator = createDrawerNavigator(
    {
      Home,
      Aganda,
      
      
      Mes_Types:MesTypes,
      Deconnection:Logout,
      
      
      
    },
  
    {contentComponent: DrawerContent,
      initialRouteName: 'Home',
      headerMode: 'none',
      navigationOptions: {
    headerVisible: false,
  },
      
  

    }
  );
  export default AppNavigator;

  
  
  
  
  
  