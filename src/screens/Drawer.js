
import React, { Component } from 'react';
import {createDrawerNavigator,createAppContainer,createStackNavigator } from 'react-navigation';

import Aganda from './Aganda'
import Register from './Register'

import MesTypes from './MesTypes'

const stack=createStackNavigator(
  
    {
      
      Register:Register,
      
    
    
    
    },
    {initialRouteName: '',
      headerMode: 'none',
    
    navigationOptions: {
    headerVisible: false,}
  }
    )
    
const AppNavigator = createDrawerNavigator(
    {
      
      Aganda,
      
      
      Logout:stack,
      Mes_Types:MesTypes
      
      
      
    },
  
    {
      initialRouteName: 'Aganda',
      headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
      
   
    }
  );
  export default AppNavigator;

  
  
  
  
  
  