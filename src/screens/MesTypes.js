import React, { Component } from 'react';
import {
    Container,
    Header,
    Title,
 
    Body,
    Left,
    Icon,
    Text,
    Right,SwipeRow,Content,

  } from "native-base";
  import styles from "./styles";
  import AsyncStorage from '@react-native-community/async-storage';
  import { ScrollView } from "react-native-gesture-handler";
  import {View,Image,Dimensions} from 'react-native'




  export default class ListItemSelectedExample extends Component {
  
  
  
  state={
            email:'',
            Types:[]


        }

        constructor(props)
        {
         super(props)
         this.init()
         } 
         
 
 
 
          async init()
          {
           await this.GetCourentUser()
           this.getMesTypes(this.state.email)
          }
 
          async GetCourentUser() {
           try {
               const user= await AsyncStorage.getItem('user');
               this.setState({email:user});
               
           }
           catch (error) {
               // Manage error handling
               alert("eeruu")
           }
         }        
 
  
         getMesTypes=(value)=>{
            fetch("http://192.168.1.28:3000/groupe/mesGroupes",{
              method:'POST',
              headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              "email":value
            
            
            })
            }).then(response=>response.json())
              .then(response=>{
                  alert("hi")
                this.setState({Types:response.data})
            
              })
          
          
          
          }
           

          delete=(id,index)=>{
            fetch("http://192.168.1.28:3000/groupe/delete",{
              method:'POST',
              headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              "id":id
            
            
            })
            }).then(response=>response.json())
              .then(response=>{
                  
                tab=this.state.Types
                tab.splice(index,1)
                this.setState({Types:tab})
            
              })
          
          
          
          }
           
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
    render() {
    return (
        <Container>
        <Header>
            <Left>
              
                <Icon name="arrow-back" onPress={() => this.props.navigation.goBack()}
                style={{color: '#fff'}}
                
                />
           
            </Left>
            
            

            
            <Body>
              <Title>Discutions</Title>
            </Body>
            <Right>
            
              <Icon style={{color: '#fff'}} name='add' onPress={() => {this.props.navigation.navigate('AddTyp')}}></Icon>
            </Right>
            

            
          </Header>
        <Container style={styles.container} >
      
       
           <ScrollView>
       

           <Content scrollEnabled={false}>
           {this.state.Types.map((item,index)=>{ 
           return(<SwipeRow 
             leftOpenValue={75}
             key={index}
             left={
                 <Text onPress={() => this.delete(item.id,index)} style={{color:'red'}}>Remove</Text>
             }
             body={
               <View  >

               <Left>
                 <View style={ {
                 flexDirection: 'row'}}>
                <Image style={{width: 50, height: 50 ,marginRight:15}} source={require('../img/type.jpg')} />
               <View style={ {
                 flexDirection: 'column'}}>
               <Text >{item.name}</Text>
               </View>
               </View>
               </Left>
               </View>
               
             }
            
           />)})}
         </Content>
     
      


    
         
           
         </ScrollView>
         
        
       </Container>
       </Container>
    )
  }
}