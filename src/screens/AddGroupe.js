import React, { Component } from "react";
import {
    Container,
    Header,
    Title,
    
    Item,
    Label,
    Input,
    Body,
    Left,
    Icon,
    Form,
    Text,
    Textarea 
  } from "native-base";
  import{ Button} from "react-native-elements"
  import {StyleSheet , View} from 'react-native'
  import AsyncStorage from '@react-native-community/async-storage';

import styles from "./styles";



import { ScrollView } from "react-native-gesture-handler";

export default class AddGroup extends Component {

        state={
            email:'',
            memebers:[],
            selectMemeber:[],
            nvMemebr:{email:'',nom:''},
            owner:'',
            headers:['email ','nom'],
            nom:'',
            description:'',
            groupeId:0


        }
        async GetConnectUser() {
          try {
              const username = await AsyncStorage.getItem('user');
              this.setState({owner:username});
          }
          catch (error) {
              // Manage error handling
          }
        }
        
       constructor(props)
       {
        super(props)
        this.GetConnectUser();


       } 



saveGroupe=()=>{
    fetch('http://192.168.137.15:3000/groupe/',{
        method:'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            'owner':this.state.owner,
            'nom':this.state.nom,
            'description':this.state.description
        })




    }).then(response=> response.json())
      .then(response=>{
        if(response.success==false)
        alert(response.message)
        if(response.success==true)
        {
          this.setState({nom:''})
          this.setState({description:''})
          this.props.navigation.navigate('AddMember',{groupeId:response.groupeId})
        }



      }).catch(error=>{})




}


 
  render()
    {return (
        <Container>
          <Header>
            <Left>
                <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
           
            </Left>
            

            
            <Body>
              <Title>Type</Title>
            </Body>

            
          </Header>
         
         <Container style={{alignItems: 'center',
               justifyContent: 'center'}}>
         <Form style={{marginTop:50}}>
         <Item stackedLabel  style={{marginBottom:10 ,borderColor: 'transparent'}} >
              <Label style={{marginBottom:5}}>Titre</Label>
              <Input style={{ borderWidth: 1, borderRadius: 5 ,padding:2}}  onChangeText={(text)=>this.setState({nom:text})}/>
            </Item>
            <Item stackedLabel  style={{marginBottom:10 ,borderColor: 'transparent'}} >
              <Label style={{marginBottom:5}}>Description</Label>
              <Textarea rowSpan={5} style={{ borderWidth: 1, borderRadius: 5, width:300}}  onChangeText={(text)=>this.setState({description:text})}/>
            </Item>
            
          </Form>
          <View style={ {
              flexDirection: 'row',
              alignItems: 'center',
               justifyContent: 'center',
              }}>
          <Button
              buttonStyle={{width:100 , margin:20}}
              onPress={() => {this.saveGroupe()}}
              title="créer"
              
              backgroundColor="#D55E2A"
            />
            </View>




         </Container>
         
         


     
          
            
            
        </Container>
      );
  

    }}

const style = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  });