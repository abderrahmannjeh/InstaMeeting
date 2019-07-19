import React, { Component } from "react";
import {
    Container,
    Header,
    Title,
    Button,
    Item,
    Label,
    Input,
    Body,
    Left,
    Icon,
    Form,
    Text,

  } from "native-base";
  import {StyleSheet} from 'react-native'
  import { Table, Row, Rows } from 'react-native-table-component';
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
    fetch('http://192.168.1.28:3000/groupe/',{
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
          this.props.navigation.navigate('AddMember',{groupeId:response.groupeId})
        }



      }).catch(error=>{})




}


 
  render()
    {return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon name="menu" />
              </Button>
           
            </Left>
            

            
            <Body>
              <Title>Type</Title>
            </Body>

            
          </Header>
         
         <Container style={{margin:20}}>
         <Form style={{marginTop:50}}>
            <Item stackedLabel>
              <Label>Titre</Label>
              <Input  multiline={true} onChangeText={(text)=>this.setState({nom:text})}/>
            </Item>
            <Item stackedLabel last>
              <Label>Description</Label>
              <Input numberOfLines={4} multiline={true} onChangeText={(text)=>this.setState({description:text})}/>
            </Item>
            
          </Form>
          <Button style={{marginTop:20 }} block onPress={()=>{this.saveGroupe()}}>
            <Text>Enregistrer</Text>
          </Button>




         </Container>
         
         


     
          
            
            
        </Container>
      );
  

    }}

const style = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  });