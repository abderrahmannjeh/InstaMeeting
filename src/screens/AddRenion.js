import React, { Component } from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Item,
  Label,
  Input,
  Body,
  Left,
  Right,
  Icon,
  Form,
  Text,
  Picker,
  Textarea,
  FooterTab,
  Footer,
  Fab
} from "native-base";
import {StyleSheet,View} from 'react-native';
import DatePicker from 'react-native-datepicker'
import RNCalendarEvents from 'react-native-calendar-events';
import AsyncStorage from '@react-native-community/async-storage';

export default class AddReunion extends Component {
  static navigationOptions = {
    header: null,
    }

  state={
    show:true,
    id:0,
    titre:'',
    respPv:'',
    respVe:'',
    commentaire:'',
    groupes:[],
    owner:'',
    selectedGroupe:'',
     groupeItems:undefined,
     date:"2016-05-01",
        duree:1,
        lieu:"",
        debut:"",
        fin:"",
        memebers:[],
        operation:1


}

save=()=>{




fetch('http://192.168.1.28:3000/reunion/',{

  method:'POST',
  headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json'
  },
  body:JSON.stringify({
    "id":this.state.id,
    "titre":this.state.titre,
    "respPv":this.state.respPv,
    "respVe":this.state.respVe,
    "commentaire":this.state.commentaire,
   "groupeId":this.state.selectedGroupe,
    "date":this.state.date,
    "duree":this.state.duree,
      "lieu":this.state.lieu,
    "debut":this.state.debut,
    "fin":this.state.fin,
    memebers:[]
  })


    }).then(response=>response.json())
    .then(response=>{
      if(response.success===false)
      {
        alert(response.message)

      }
      else
      {
        RNCalendarEvents.saveEvent(this.state.titre, {startDate: this.state.date+'T'+this.state.debut+':00.000Z',
      endDate: this.state.date+'T'+this.state.fin+':00.000Z'}, {});
        this.setState({
          show:true,
    titre:'',
    respPv:'',
    respVe:'',
    commentaire:'',
    groupes:this.state.groupes,
    owner:this.state.owner,
    selectedGroupe:'',
     groupeItems:undefined,
     date:"2019-08-01",
        duree:1,
        lieu:"",
        debut:"",
        fin:"",

        })
        
        alert(response.message)

      }




})



}



 constructor(props)
{
 super(props)
 
 this.init()



}


async init()
{
  await this.GetConnectUser();
 
  this.getGroupeList();

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

onValueChange=(value)=>
{
  
this.setState({selectedGroupe:value})
this.getGroupeMombeurs(value);

}

getGroupeList=()=>{
  
  fetch("http://192.168.1.28:3000/groupe/getList",{
    method:'POST',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json'
  },
  body:JSON.stringify({
    "owner":this.state.owner
  
  
  })
  }).then(response=>response.json())
    .then(response=>{
      this.setState({groupes:response.data})
      
  
  
    })



}
getGroupeMombeurs=(value)=>{
  fetch("http://192.168.1.28:3000/groupe/getGroupeMemebers",{
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




  render() {
    
 
    return (
      <Container >
        {this.state.show===true?
          //Renion informations
          <Container >
          <Header>
          <Button transparent onPress={()=>this.props.navigation.goBack()} >
              <Icon name='arrow-back' />
            </Button>
            <Body>
              <Title>Information</Title>
            </Body>
            <Right />
          </Header>
         <Container  >
          <Content>
            <Form>
            <Item stackedLabel style={{marginBottom:10 ,  borderColor: 'transparent'}} >
                <Label style={{marginBottom:5}}  >Groupe :</Label>
                <View style={{ height:35, borderWidth: 1, borderRadius: 5, width:'90%' }}>
                <Picker
                selectedValue={this.state.selectedGroupe}
                 mode="dropdown"
                 iosHeader="Select your SIM"
                 iosIcon={<Icon name="arrow-down" />}
                 style={{ width: undefined }}
                 onValueChange={this.onValueChange.bind(this)}
                 //data={this.state.selectedGroupe}
                
                >
                 {this.state.groupes.map((data, key)=>(
                   
                   <Picker.Item label={(data.id).toString()} value={data.name} key={key} />)
                   )}

               </Picker>
               </View>
               </Item>


               <Item stackedLabel  style={{marginBottom:5 ,borderColor: 'transparent'}} >
              <Label style={{marginBottom:5}}>Titre:</Label>
                <Input  value={this.state.titre} style={{ marginLeft:'5%',borderWidth: 1, borderRadius: 5 ,width:'90%'}} onChangeText={(text)=>{this.setState({titre:text})}} />
              </Item>
              
              <Item stackedLabel style={{marginBottom:7 ,  borderColor: 'transparent'}} >
                <Label style={{marginBottom:5}}  >Resp Pv :</Label>
                <View style={{ height:35, borderWidth: 1, borderRadius: 5, width:'90%' }}>
              <Picker
                selectedValue={this.state.selectedGroupe}
                 mode="dropdown"
                 iosHeader="Select your SIM"
                 iosIcon={<Icon name="arrow-down" />}
                 style={{ width: undefined }}
                 //data={this.state.selectedGroupe}
                 onValueChange={(value)=>{this.setState({respPv:value})}}

                >
                 {
                   this.state.memebers.map((data, key)=>(
                   
                   <Picker.Item label={(data.nom).toString()} value={data.nom} key={key} />)
                   )}

               </Picker>
               </View>
               </Item>
               <Item stackedLabel style={{marginBottom:7 ,  borderColor: 'transparent'}} >
                <Label style={{marginBottom:5}}  >Resp Verif :</Label>
                <View style={{ height:35, borderWidth: 1, borderRadius: 5, width:'90%' }}>
              <Picker
                selectedValue={this.state.selectedGroupe}
                 mode="dropdown"
                 iosHeader="Select your SIM"
                 iosIcon={<Icon name="arrow-down" />}
                 style={{ width: undefined }}
                 //data={this.state.selectedGroupe}
                 onValueChange={(value)=>{this.setState({respVe:value})}}

                
                >
                 {this.state.memebers.map((data, key)=>(
                   
                   <Picker.Item label={(data.nom).toString()} value={data.nom} key={key} />)
                   )}

               </Picker>
               </View>
               </Item>
               <Item stackedLabel  style={{marginBottom:7 ,borderColor: 'transparent'}} >
              <Label style={{marginBottom:5}}>Lieu :</Label>
            <Input  value={this.state.lieu}  style={{ borderWidth: 1, borderRadius: 5 ,padding:2,width:'90%',marginLeft:'5%'}} onChangeText={(text)=>{this.setState({lieu:text})}} />
          </Item>
          <Item stackedLabel  style={{marginBottom:10 ,borderColor: 'transparent'}} >
              <Label style={{marginBottom:5}}>Commentaire:</Label>
              <Textarea rowSpan={2} style={{ borderWidth: 1, borderRadius: 5, width:'90%'}}  onChangeText={(text)=>{this.setState({commentaire:text}) }} />
          </Item>
          </Form>


          
         
  
            
          </Content>
          
        </Container>
        <Fab style={{marginTop:10}} position="bottomRight" onPress={() => {this.setState({show:false})}}
        
        >
            <Icon name="arrow-forward" />
            </Fab>
        </Container>
      
      
      
      
      
      
      
      
      
      
      
      
      
      :
      this.state.show===false?
      <Container >
      <Header>
      <Button transparent onPress={()=>this.props.navigation.goBack()} >
              <Icon name='arrow-back' />
            </Button>
        <Body>
          <Title>Planification</Title>
        </Body>
        <Right />
      </Header>
      <Container >
     <Container style={{marginTop:'30%'}} >
      <Content>
        <Form>
          <Item stackedLabel style={{marginBottom:15 ,borderColor: 'transparent'}}>
            <Label style={{marginBottom:5}}>Date Prévue:</Label>
            <DatePicker
                style={{width: 250}}
                date={this.state.date}
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2019-05-01"
                maxDate="2019-10-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(dat) => {this.setState({date:dat})}}
            />
          </Item>

          <Item stackedLabel style={{marginBottom:15 ,borderColor: 'transparent'}}>
            <Label style={{marginBottom:5}}>Duré Prévue:</Label>
            <DatePicker
                style={{width: 250}}
                mode="time"
                date={this.state.duree}
                placeholder="select date"
                
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.setState({duree:date})}}
            />
          </Item>
          <Item stackedLabel style={{marginBottom:15 ,borderColor: 'transparent'}}>
            <Label style={{marginBottom:5}}>Heure Debut:</Label>
            <DatePicker
                style={{width: 250}}
                mode="time"
                date={this.state.debut}
                placeholder="select date"
               
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.setState({debut:date})}}
            />
          </Item>

          <Item stackedLabel style={{marginBottom:15 ,borderColor: 'transparent'}}>
            <Label style={{marginBottom:5}}>Heure Fin:     </Label>
            <DatePicker
                style={{width: 250}}
                mode="time"
                date={this.state.fin}
                placeholder="select date"
                
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.setState({fin:date})}}
            />
          </Item>
          
          
        </Form>
        <Footer >
        <FooterTab style={{backgroundColor:'white'}}>
          
          </FooterTab>
          <FooterTab style={{backgroundColor:'white'}}>
          
          </FooterTab>
          </Footer>
         
        
      </Content>
      <Fab position="bottomLeft" onPress={() => {this.setState({show:true})}}>
      <Icon name="arrow-back" />


      </Fab>
      <Fab position="bottomRight" onPress={() => {this.save()}}>
         <Icon name="paper-plane" />
            
          </Fab>
    </Container>
    </Container>
    </Container>
    
     :<Container></Container>
      
      
      }

    
        
      </Container>
    )
  }
}
const style = StyleSheet.create({
  container: {
marginTop:100,
justifyContent:'center'
  }
});