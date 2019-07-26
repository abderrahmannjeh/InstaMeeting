import React , {Component} from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { View } from 'native-base';
import {Image} from 'react-native'
export default class Login extends Component {
    static navigationOptions ={
        tabBarLabel: 'Logout',
    
       
        drawerIcon:(tintcolor)=>{
    
            return(
                <Image source={require('../img/logout.png')}
                
                style={{width: 50, height: 50, borderRadius: 400/ 2}}>
    
    
                </Image>)
        }}

    constructor(props)
    {
        super(props)
    }
    signout(){
        
     }
    componentDidMount(){
console.log(this.props.navigation)
        this._subscribe = this.props.navigation.addListener('didFocus',()=>{AsyncStorage.clear(); // to clear the token 
            this.props.navigation.navigate('Auth')})
        
        
       }

       render()
       {
           return(<View></View>)
       }


}