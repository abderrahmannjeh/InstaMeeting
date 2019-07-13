import React, { Component } from 'react';
import {createDrawerNavigator,createAppContainer,createStackNavigator } from 'react-navigation';
import Home from './src/screens/Home';

// we will use these two screens later in our AppNavigator

import Login from './src/screens/Login';
import AddReunion from'./src/screens/AddRenion'
import AddGroupe from'./src/screens/AddGroupe'
import Aganda from './src/screens/Aganda'

const AppNavigator = createDrawerNavigator(
  {
    Home,
    
    Login,
    
    AddGroupe,
    Aganda,
    AddReunion
  },

  {
    initialRouteName: 'Login',
 
  }
);


const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
