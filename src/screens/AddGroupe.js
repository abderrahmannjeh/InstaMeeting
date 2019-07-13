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
            headers:['email ','nom']


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

addNomber=()=>{
    var tab=this.state.memebers
    
    tab.push([this.state.nvMemebr.email,this.state.nvMemebr.nom])
    var selected=this.state.selectMemeber;
    selected.push({"email":this.state.nvMemebr.email,"nom":this.state.nvMemebr.nom})
    this.setState({memebers:tab});
    this.setState({selectMemeber:selected})
}

saveGroupe=()=>{
    fetch('http://192.168.1.51:3000/groupe/',{
        method:'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            'owner':this.state.owner,
            'memebers':this.state.selectMemeber
        })




    }).then(response=> response.json())
      .then(response=>{

        alert(response.message)



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
              <Title>Groupe</Title>
            </Body>

            
          </Header>
         <Container style={styles.container} >



        <ScrollView>
        <Form style={{marginTop:50}}>
            <Item stackedLabel>
              <Label>Memeber Email</Label>
              <Input onChangeText={(text)=>this.setState({nvMemebr:{nom:this.state.nvMemebr.nom,email:text}})}/>
            </Item>
            <Item stackedLabel last>
              <Label>Nom et Prenom</Label>
              <Input onChangeText={(text)=>this.setState({nvMemebr:{email:this.state.nvMemebr.email,nom:text}})}/>
            </Item>
          </Form>
        
          <Button block onPress={()=>{this.addNomber()}}>
            <Text>Ajouter Member</Text>
          </Button>


          <Table borderStyle={{borderWidth: 4, borderColor: '#c8e1ff'}} style={{marginTop:40,marginBottom:20}}>
          <Row data={this.state.headers} style={style.head} textStyle={styles.text}/>
          <Rows data={this.state.memebers} textStyle={style.text}/>
        </Table>
        <Button block onPress={()=>{this.saveGroupe()}}>
            <Text>Enregistrer</Text>
          </Button>
       


     
          
            
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