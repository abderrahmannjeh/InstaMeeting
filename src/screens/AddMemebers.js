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
    List, ListItem, Thumbnail,Right

  } from "native-base";
  import {StyleSheet} from 'react-native'
  import { Table, Row, Rows } from 'react-native-table-component';
  import AsyncStorage from '@react-native-community/async-storage';

import styles from "./styles";



import { ScrollView } from "react-native-gesture-handler";

export default class AddMemeber extends Component {

        state={
            email:'',
            memebers:[],
            selectMemeber:[],
            nvMemebr:{email:'',nom:''},
            
            headers:['email ','nom'],
            nom:'',
            description:'',
            groupeId:0


        }
      
        
       constructor(props)
       {
        super(props)
         } 
         componentDidMount()
         {id=this.props.navigation.state.params.groupeId;
         this.setState({groupeId:id})
         }

addNomber=()=>{
  fetch("http://192.168.1.28:3000/groupe/addMemberGroupe",{
    method:"POST",
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json'
  },
  body:JSON.stringify({
    "groupeId":this.state.groupeId,
    "email":this.state.nvMemebr.email,
    "nom":this.state.nvMemebr.nom



  })


  }).then(response=>response.json())
    .then(response=>{
        if(response.success==false)
          alert(response.message)
          else
          {
            var tab=this.state.memebers
            console.log(tab)

            tab.push({"email":this.state.nvMemebr.email,"nom":this.state.nvMemebr.nom})
            console.log(tab)

            
            this.setState({memebers:tab});
            
            this.setState({nvMemebr:{email:'',nom:''}})
            console.log(this.state.memebers)
          }

          


    })
}

delete=(email,index)=>{

    fetch("http://192.168.1.28:3000/groupe/deleteMemeber",{
    method:"POST",
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({
        'groupeId':this.state.groupeId,
        'email':email

    })

    }).then(response=>response.json())
      .then(response=>{

        if(response.success==false)
            alert(response.message)
        else
        
        this.setState({memebers:this.state.memebers.splice(index,1)})

      })


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
              <Title>Ajout Memebers</Title>
            </Body>

            
          </Header>
         
         
         
         <Container style={styles.container} >
            <ScrollView>
        <Form style={{marginTop:50}}>
            <Item stackedLabel>
              <Label>Memeber Email</Label>
              <Input value={this.state.nvMemebr.email} onChangeText={(text)=>this.setState({nvMemebr:{nom:this.state.nvMemebr.nom,email:text}})}/>
            </Item>
            <Item stackedLabel last>
              <Label>Nom et Prenom</Label>
              <Input  value={this.state.nvMemebr.nom}  onChangeText={(text)=>this.setState({nvMemebr:{email:this.state.nvMemebr.email,nom:text}})}/>
            </Item>
          </Form>
        
          <Button block onPress={()=>{this.addNomber()}}>
            <Text>Ajouter Member</Text>
          </Button>

          <List>
            {this.state.memebers.map((item,index)=>{ 
            return(<ListItem thumbnail key={index}>
              
              <Body>
                <Text>{item.nom}</Text>
                <Text note numberOfLines={1}>{item.email}</Text>
              </Body>
              <Right>
                <Button transparent onPress={()=>{this.delete(item.email,index)}}>
                  <Text style={{color: 'red'}} >Remove</Text>
                </Button>
              </Right>
            </ListItem>)})}
          </List>
      
       


     
          
            
          </ScrollView>
            
        </Container>
        </Container>
      );
  

    }}

const style = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  });