import React , {Component} from 'react'
import styles from "./styles";
import { Text, View, TextInput} from 'react-native';
import { Button } from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {

static navigationOptions= {
  drawerLockMode: 'locked-closed'
}
  state={
    password:'',
    email :'',
    emailEr:false,
    PasswordEr:false,
    change:false
 }
 handleEmail=(text)=>{
   if(this.state.change==false)
   this.setState({change:true})
    text==''?this.setState({emailEr:true}):this.setState({emailEr:false});
   this.setState({email:text})}
 handlePassword=(text)=>{
  if(this.state.change==false)
  this.setState({change:true})
   text==''?this.setState({PasswordEr:true}):this.setState({PasswordEr:false}); 
  this.setState({password:text})}


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
  if(this.state.change==true && this.state.emailEr==false && this.state.PasswordEr==false)

{fetch('http://192.168.1.28:3000/users',{

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
        ToastAndroid.show(response.message, ToastAndroid.SHORT);

        else
        {
          this._storeData(response);
          this.props.navigation.navigate('Aganda');

        }
    })

 .catch(function(error) {
     // ADD THIS THROW error
      throw error;
    });  


}
}



  render()
  {
   

    return(
      
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
          <Text style={styles.logoText}>InstaMeeting</Text>
            <TextInput placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={this.handleEmail} />
            {this.state.emailEr?<Text style={{color: 'red'}}>Email est require</Text>:<Text></Text>}
            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} onChangeText={this.handlePassword}/>
            {this.state.PasswordEr?<Text style={{color: 'red'}}>mots de passe est require</Text>:<Text></Text>}   
            <View style={ {
              flexDirection: 'row',
              alignItems: 'center',
               justifyContent: 'center',
              }}>
            <Button
              buttonStyle={{width:100, margin:30}}
              onPress={() => this.Login()}
              title="Login"
            />
            <Button
              buttonStyle={{width:100,margin:30}}
              onPress={() => {this.props.navigation.navigate('Register')}}
              title="Register"
              
              color="#D55E2A"
            />
            </View>
          
          </View>
         
        </View>
      
    )

  }



}

