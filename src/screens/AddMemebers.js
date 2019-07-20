import React, { Component } from "react";
import {
    Container,
    Header,
    Title,
    TouchableOpacity,
    Item,
    Label,
    Input,
    Body,
    Left,
    Icon,
    Form,
    Text,
    List, ListItem,Right,Fab

  } from "native-base";
  import { Button } from 'react-native-elements';

  import {StyleSheet,View} from 'react-native'
  import { Table, Row, Rows } from 'react-native-table-component';
  import AsyncStorage from '@react-native-community/async-storage';
  import Modal from "react-native-modal";
  import ModalWrapper from 'react-native-modal-wrapper'
import styles from "./styles";



import { ScrollView } from "react-native-gesture-handler";

export default class AddMemeber extends Component {
  static navigationOptions = {
    mode: 'modal'
  };
        state={
            email:'',
            memebers:[],
            selectMemeber:[],
            nvEmail:'',
            nvNom:'',
            
            headers:['email ','nom'],
            nom:'',
            description:'',
            groupeId:0,
            visible:false


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
    "email":this.state.nvEmail,
    "nom":this.state.nvNom



  })


  }).then(response=>response.json())
    .then(response=>{
      //  if(response.success==false)
        //  alert(response.message)
        //  else
          {
            var tab=this.state.memebers
            console.log(tab)

            tab.push({"email":this.state.nvEmail,"nom":this.state.nvNom})
            console.log(tab)

            
            this.setState({memebers:tab});
            
            this.setState({nvEmail:'',nvNom:''})
            this.setState({visible:false})
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

        //if(response.success==false)
        //    alert(response.message)
       // else
        
        this.setState({memebers:this.state.memebers.splice(1,index)})

      })


}



 
  render()
    {return (
        <Container>
          <Header>
            <Left>
              
                <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
           
            </Left>
            

            
            <Body>
              <Title>Membres</Title>
            </Body>
            

            
          </Header>
          <ModalWrapper
          onRequestClose={this.onCancel}
        style={{ width: 280, height: 300, paddingLeft: 24, paddingRight: 24 }}
        visible={this.state.visible}>
            <View>
          <Form style={{marginTop:10}}>
            <Item stackedLabel>
              <Label>Memeber Email</Label>
              <Input value={this.state.nvEmail} onChangeText={(text)=>this.setState({nvEmail:text})}/>
            </Item>
            <Item stackedLabel last>
              <Label>Nom et Prenom</Label>
              <Input  value={this.state.nvNom}  onChangeText={(text)=>this.setState({nvNom:text})}/>
            </Item>
          </Form>
        
          <View style={ {
              flexDirection: 'row',
              alignItems: 'center',
               justifyContent: 'center',
              }}>
            <Button
              buttonStyle={{width:100, margin:15}}
              onPress={() => this.addNomber()}
              title="ajouter"
            />
            <Button
              buttonStyle={{width:100,margin:15}}
              onPress={() => {this.setState({visible:false})}}
              title="anuller"
              
              backgroundColor="#D55E2A"
            /></View>
          </View>
        </ModalWrapper>
         
         
         <Container style={styles.container} >
       
        
            <ScrollView>
        

          <List>
            {this.state.memebers.map((item,index)=>{ 
            return(<ListItem thumbnail key={index}>
              
              <Body>
                <Text>{item.nom}</Text>
                <Text note numberOfLines={1}>{item.email}</Text>
              </Body>
              <Right>
                  <Text  onPress={()=>{this.delete(item.email,index)}} style={{color: 'red'}} >Remove</Text>
              </Right>
            </ListItem>)})}
          </List>
      
       


     
          
            
          </ScrollView>
          <Fab direction="right" position="bottomRight"
          onPress={() => {this.setState({visible:true})}}>
              <Icon name='add'></Icon>
          </Fab>
        </Container>
        </Container>
      );
  

    }}

const style = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  });