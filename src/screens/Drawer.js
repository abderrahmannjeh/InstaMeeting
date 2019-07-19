
import React, { Component } from 'react';
import {createDrawerNavigator,createAppContainer,createStackNavigator } from 'react-navigation';

import Login from './Login';
import AddReunion from'./AddRenion'
import AddGroupe from'./AddGroupe'
import Aganda from './Aganda'
import Register from './Register'
import Home from './Home'
import EditeReunion from './EditeReunion'
import AddMemember from './AddMemebers'
const stack=createStackNavigator(
  
    {
      LoginScreen:Login,
      Register:Register,
      EditeReunion:EditeReunion,
      AddMember:AddMemember
    
    
    
    },
    {headerMode: 'none',
    navigationOptions: {
    headerVisible: false,}
  }
    )


const AppNavigator = createDrawerNavigator(
    {
      Login:stack,
      Home,
      
      
      
      AddGroupe,
      Aganda,
      AddReunion,
      
    },
  
    {
      initialRouteName: 'Login',
      headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
      
   
    }
  );
  export default AppNavigator;

  
  
  
  
  
  