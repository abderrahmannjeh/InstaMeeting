import React, { Component } from 'react';
import {createDrawerNavigator,createAppContainer,createStackNavigator } from 'react-navigation';
import Home from './src/screens/Home';
import {  Spinner } from 'native-base';
import {View} from 'react-native'
import Login from './src/screens/Login';
import Drawer from './src/screens/Drawer'

// we will use these two screens later in our AppNavigator

const AppNavigator=createStackNavigator(

{ Auth:Login,
  Drawer:Drawer



},
{
  initialRouteName: 'Auth',
  headerMode:'none'
  

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
        2000
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
      return(<View style={{      
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',margin:200}}><Spinner color='bleu' /></View>)
    }
    else
    return(
        <AppContainer/>
    )


  }
 }

