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

  } from "native-base";

  import {StyleSheet,View,Image,Dimensions} from 'react-native'
  import AsyncStorage from '@react-native-community/async-storage';
import styles from "./styles";



import { ScrollView } from "react-native-gesture-handler";

export default class AddMemeber extends Component {
  
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
        this.init()
        } 
        



         async init()
         {
          await this.GetGroupeId()
         }

         async GetGroupeId() {
          try {
              const groupeId= await AsyncStorage.getItem('groupeId');
              alert(groupeId)
              this.setState({groupeId:groupeId});
              
          }
          catch (error) {
              // Manage error handling
              alert("eeruu")
          }
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

            tab.push({"email":this.state.nvEmail,"nom":this.state.nvNom})

            
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
        
        this.setState({memebers:this.state.memebers.splice(index,1)})

      })


}



 
  render()
    {return (
        <Container>
          <Header>
            <Left>
              
                <Icon name="menu" onPress={() => this.props.nav.openDrawer()} />
           
            </Left>
            

            
            <Body>
              <Title>Membres</Title>
            </Body>
            

            
          </Header>
         
         
         
         
         <Container style={styles.container} >
         <View style={ {
              flexDirection: 'row',
              alignItems: 'center',
               justifyContent: 'center',
              }}>
         <Item stackedLabel  style={{borderColor: 'transparent'}}>
              <Label style={{marginBottom:5}}> Email</Label>
              <Input style={{ borderWidth: 1, borderRadius: 5,padding:2}} width={Dimensions.get('window').width*0.8} value={this.state.nvEmail} onChangeText={(text)=>this.setState({nvEmail:text})}/>
            </Item>
        
          
            
            <Icon
            name="add"
            onPress={() => this.addNomber()}
              style={{marginTop:Dimensions.get('window').width*0.1,marginLeft:Dimensions.get('window').width*0.05}}
            />
            
            </View>
        
            <ScrollView>
        

            <Content scrollEnabled={false}>
            {this.state.memebers.map((item,index)=>{ 
            return(<SwipeRow 
              leftOpenValue={75}
              
              left={
                  <Text onPress={() => this.delete(item.email,index)} style={{color:'red'}}>Remove</Text>
              }
              body={
                <View  >

                <Left>
                  <View style={ {
                  flexDirection: 'row'}}>
                <Image style={{width: 50, height: 50 ,marginRight:15}} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYneVYYk4yVnFM6LX-HaU9_ng5ItncuzzjXCEW0l4aBkYs5Yhp'}} />
                <View style={ {
                  flexDirection: 'column'}}>
                <Text >{item.email}</Text>
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
      );
  

    }}

const style = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }
  });