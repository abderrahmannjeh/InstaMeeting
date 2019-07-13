import React , {Component} from 'react'
import styles from "./styles";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView,StyleSheet} from 'react-native';
import { Button } from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {

static navigationOptions= {
  drawerLockMode: 'locked-closed'
}
  state={
    password:'',
    email :''
 }
 handleEmail=(text)=>{
  this.setState({email:text})}
 handlePassword=(text)=>{this.setState({password:text})}
 componentDidMount(){

  this._subscribe = this.props.navigation.addListener('didFocus',this.loadCredentials)
  

 }
 async loadCredentials() {
  try {
      const username = await AsyncStorage.getItem('user');
      if(username.length>0)
        {this.state.navigation.navigate('Home')}
  }
  catch (error) {
      // Manage error handling
  }
}
constructor(props)
{   
    super(props);
  
    
}
_storeData =async (response)=>{
  try{
    await AsyncStorage.setItem('user',response.user);


  }

  catch{
    alert("ops problem");
  }


}
Login=()=>{

fetch('http://192.168.1.51:3000/users',{

method:'POST',
headers:{
    Accept: 'application/json',
    'Content-Type': 'application/json'
},
body:JSON.stringify({
    'email':this.state.email,
    'password':this.state.password


})

}).then(response => response.json())
    .then(response => {
        
        if(response.success===false)
          alert(response.message)
        else
        {
          this._storeData(response);
          this.props.navigation.navigate('Home');

        }
    })

 .catch(function(error) {
     // ADD THIS THROW error
      throw error;
    });  


}



  render()
  {
   

    return(
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>InstaMeeting</Text>
            <TextInput placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={this.handleEmail} />
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChangeText={this.handlePassword}/>
            <Button
              buttonStyle={styles.loginButton}
              onPress={() => this.Login()}
              title="Login"
            />
            <Button
              buttonStyle={styles.fbLoginButton}
              onPress={() => {}}
              title="Login with Facebook"
              color="#3897f1"
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    )

  }



}

