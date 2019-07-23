import React, { Component } from 'react';
import {createDrawerNavigator,createAppContainer,createStackNavigator } from 'react-navigation';
import Home from './src/screens/Home';
import {  Spinner } from 'native-base';
import {View} from 'react-native'
import Login from './src/screens/Login';
import Drawer from './src/screens/Drawer'
import AddPointsDescution from './src/screens/AddPointsDescution'
import AddReunion from'./src/screens/AddRenion'
import AddGroupe from'./src/screens/AddGroupe'
import Aganda from './src/screens/Aganda'
import Register from './src/screens/Register'

import EditeReunion from './src/screens/EditeReunion'
import AddMemember from './src/screens/AddMemebers'
import AddDiscution from './src/screens/AddPointsDescution'
// we will use these two screens later in our AppNavigator
import tab from './src/screens/tabNavigation'
const AppNavigator=createStackNavigator(

{ Auth:Login,
    Register:Register,
      EditeReunio:EditeReunion,
      tabNavigatio:tab,

      AddMemembe:AddMemember,
      AddDiscutio:AddDiscution,
      AddReunio:AddReunion,
      AddTyp:AddGroupe,
  Drawer:Drawer,
 

},
{
  initialRouteName: 'Auth',
  headerMode:'none',
  
  

}

)




const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {

  state={
    isLoading:true
  
  }
  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        0
      )
    );
  }
  async componentDidMount() {
    const data = await this.performTimeConsumingTask();
  
    if (data !== null) {
      this.setState({ isLoading: false });
    }
  }
  
    
  render() {
    if (this.state.isLoading) {
      return(<View  style={ {
        flexDirection: 'row',
        alignItems: 'center',
         justifyContent: 'center',
         marginTop:'50%'
        }}><Spinner color='bleu' /></View>)
    }
    else
    return(
        <AppContainer/>
    )


  }
 }

