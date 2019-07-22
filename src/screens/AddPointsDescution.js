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
    List, Thumbnail,Right,Fab,SwipeRow,Content,
    Picker,Textarea 

  } from "native-base";
  import DatePicker from 'react-native-datepicker'

  import { Button } from 'react-native-elements';

  import {StyleSheet,View,Image,KeyboardAvoidingView,Dimensions} from 'react-native'
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
           titre:'',
            groupeId:0,
            commentaire:'',
            date:new Date(),
            heure:'08:00',
            etat:'',
            animateur:'',
            discution:[],
            memebers:[],
            

            visible:false


        }
      
        
       constructor(props)
       {
        super(props)
         } 
         componentDidMount()
         {id=this.props.navigation.state.params.groupeId;
         this.setState({groupeId:id})
         this.getGroupeMombeurs(id)
         }

addDiscution=()=>{
  
  fetch("http://192.168.137.15:3000/discution/add",{
    method:"POST",
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json'
  },
  body:JSON.stringify({
     "titre":this.state.titre,
     "groupeId":this.state.groupeId,
      "commentaire":this.state.commentaire,
     
      "heure":this.state.heure,
      "etat":this.state.etat,
      "animateur":this.state.animateur,



  })


  }).then(response=>response.json())
    .then(response=>{
        if(response.success==false)
         alert(response.message)
         else
          {
            var tab=this.state.discution

            tab.push({"titre":this.state.titre,
            "groupeId":this.state.groupeId,
             "commentaire":this.state.commentaire,
            
             "heure":this.state.heure,
             "etat":this.state.etat,
             "animateur":this.state.animateur})
            

            
            this.setState({discution:tab});
            
            
            this.setState({visible:false})
          }

          


    })
}


getGroupeMombeurs=(value)=>{
  fetch("http://192.168.137.15:3000/groupe/getGroupeMemebers",{
    method:'POST',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json'
  },
  body:JSON.stringify({
    "groupeId":value
  
  
  })
  }).then(response=>response.json())
    .then(response=>{
      this.setState({memebers:response.data})
      
  
  
    })



}

delete=(email,index)=>{

    fetch("http://192.168.137.15:3000/groupe/deleteMemeber",{
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
              <Title>Discutions</Title>
            </Body>
            

            
          </Header>
          <KeyboardAvoidingView  behavior={'position'}>

          <ModalWrapper
          onRequestClose={this.onCancel}
        style={{ height: Dimensions.get('window').height ,
        width: Dimensions.get('window').width}}
        visible={this.state.visible}>
            <View>
          <Form >
          

            <Item stackedLabel  style={{marginBottom:10 ,borderColor: 'transparent'}} >
              <Label style={{marginBottom:5}}>Titre</Label>
              <Input style={{ borderWidth: 1, borderRadius: 5, width:'100%',padding:2}} value={this.state.titre}  onChangeText={(text)=>this.setState({titre:text})}/>
            </Item>
            <Item stackedLabel style={{marginBottom:10 ,borderColor: 'transparent'}} >
              <Label style={{marginBottom:5}}>commentaire</Label>
              <Textarea rowSpan={3} style={{ borderWidth: 1, borderRadius: 5 , width:'100%'}}  value={this.state.commentaire}  onChangeText={(text)=>this.setState({commentaire:text})}/>
            </Item>
            
            
            <Item stackedLabel style={{marginBottom:10 ,  borderColor: 'transparent'}} >
                <Label style={{marginBottom:5}}  >Animateur :</Label>
                <View style={{ height:35, borderWidth: 1, borderRadius: 5 ,width:'100%'}}>
                <Picker 
                selectedValue={this.state.animateur}
                 mode="dropdown"
                 iosHeader="Select your SIM"
                 iosIcon={<Icon name="arrow-down" />}
                 style={{ width: undefined }}
                 onValueChange={(value)=>{this.setState({animateur:value})}}
                
                >
                 {this.state.memebers.map((data, key)=>(
                   
                   <Picker.Item label={(data.nom).toString()} value={data.email} key={key} />)
                   )}

               </Picker>
               </View>
               <Item stackedLabel style={{  borderColor: 'transparent'}} >
              <Label style={{marginBottom:5}}>Durée</Label>

              <DatePicker
                style={{width: 240}}
                mode="time"
                date={this.state.heure}
                placeholder="select date"
                
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                
                dateInput: {
                    marginLeft: 20
                }
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.setState({heure:date})}}
            />
            </Item>
               
               </Item>
               
          </Form>
        
          <View style={ {
              flexDirection: 'row',
              alignItems: 'center',
               justifyContent: 'center',
               marginTop:10
              }}>
            <Button
              buttonStyle={{width:100, margin:5}}
              onPress={() => this.addDiscution()}
              title="ajouter"
            />
            <Button
              buttonStyle={{width:100,margin:5}}
              onPress={() => {this.setState({visible:false})}}
              title="anuller"
              
              backgroundColor="#D55E2A"
            /></View>
          </View>
        </ModalWrapper>
        </KeyboardAvoidingView>
         
         
         <Container style={styles.container} >
       
        
            <ScrollView>
        

            <Content scrollEnabled={false}>
            {this.state.discution.map((item,index)=>{ 
            return(<SwipeRow 
              leftOpenValue={75}
              
              left={
                  <Text  style={{color:'red'}}>Remove</Text>
              }
              body={
                <View  >

                <Left>
                  <View style={ {
                  flexDirection: 'row'}}>
                <Image style={{width: 50, height: 50 ,marginRight:15}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYneVYYk4yVnFM6LX-HaU9_ng5ItncuzzjXCEW0l4aBkYs5Yhp'}} />
                <View style={ {
                  flexDirection: 'column'}}>
                <Text>Titre  {item.titre}</Text>
                <Text note >Durée:{item.heure}</Text>
                </View>
                </View>
                </Left>
                </View>
                
              }
             
            />)})}
          </Content>
      
       


     
          
            
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