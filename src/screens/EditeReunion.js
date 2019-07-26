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
import {StyleSheet,View,Dimensions} from 'react-native';
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





update=()=>{
  



  fetch('http://192.168.1.28:3000/reunion/update',{
  
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
      
    })
  
  
      }).then(response=>response.json())
      .then(response=>{
        if(response.success===false)
        {
          alert(response.message)
  
        }
        else
        {
          
          
          
          
  
        }
  
  
  
  
  })
  
  
  
  }
  







 constructor(props)
{
 super(props)
 
}
componentDidMount()
{
  this.init()
  this.loadData()
  this.getGroupeMombeurs(this.state.selectedGroupe)
}


didBlurSubscription = this.props.navigation.addListener(
  'didFocus',
  payload => {
    this.init();
    this.setState({operation:1})
    this.loadData()
    this.getGroupeMombeurs(this.state.selectedGroupe)

    
  }
);
loadData=()=>{
  if(this.props.navigation.state.params.id)
    {   const id=this.props.navigation.state.params.id
        
      this.setState({id:id})
    this.setState({operation:2})
      
      fetch('http://192.168.1.28:3000/Reunion/getById',{
        method:'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'},
    
          body:JSON.stringify({
            
           "id":id
         
         }
           )
    
    
    
      }).then(response=>response.json())
        .then(response=>{
          this.setState({
    
            titre:response.data.title,
            respPv:response.data.respPv,
            respVe:response.data.respVe,
            commentaire:response.data.commentaire,
            
            selectedGroupe:response.data.id_groupe,
            groupeItems:undefined,
            date:response.data.date,
            duree:response.data.duree,
            lieu:response.data.lieu,
            debut:response.data.debut,
            fin:response.data.fin,
    
    
    
    
    
          })
          
    
        })
    
    }
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
            <Form style={{marginLeft:15,marginRight:15,marginTop:Dimensions.get('window').height*0.1}}>
                <View style={style.Inputcontainer }>
                <Label style={style.labelStyle} >Type :</Label>
                <View style={{  borderWidth: 1, borderRadius: 5 }}>
                <Picker
                selectedValue={this.state.selectedGroupe}
                 mode="dropdown"
                 iosHeader="Select your SIM"
                 iosIcon={<Icon name="arrow-down" />}
                 style={style.InputStyle}
                 onValueChange={this.onValueChange.bind(this)}
                 //data={this.state.selectedGroupe}
                
                >
                 {this.state.groupes.map((data, key)=>(
                   
                   <Picker.Item label={(data.name).toString()} value={data.id} key={key} />)
                   )}

               </Picker>
               </View>
               </View>

              
               <View style={style.Inputcontainer}>
              <Label  style={style.labelStyle} >Titre:</Label>
                <View style={style.InputStyle}><Input  value={this.state.titre} style={{height:35,borderWidth: 1, borderRadius: 5,padding:2 }} onChangeText={(text)=>{this.setState({titre:text})}} /></View>
                </View>
              
              
              
              <View style={style.Inputcontainer} >
                <Label style={style.labelStyle}  >Resp Pv :</Label>
                <View style={{ height:35, borderWidth: 1, borderRadius: 5 }}>
              <Picker
                selectedValue={this.state.respPv}
                 mode="dropdown"
                 iosHeader="Select your SIM"
                 iosIcon={<Icon name="arrow-down" />}
                 style={style.InputStyle}
                 //data={this.state.selectedGroupe}
                 onValueChange={(value)=>{this.setState({respPv:value})}}

                >
                 {
                   this.state.memebers.map((data, key)=>(
                   
                   <Picker.Item label={(data.email).toString()} value={data.email} key={key} />)
                   )}

               </Picker>
               </View>
               </View>
               <View style={style.Inputcontainer} >
                <Label style={style.labelStyle}  >Resp Verif :</Label>
                <View style={{ height:35, borderWidth: 1, borderRadius: 5 }}>
              <Picker
                selectedValue={this.state.respVe}
                 mode="dropdown"
                 iosHeader="Select your SIM"
                 iosIcon={<Icon name="arrow-down" />}
                 style={style.InputStyle }
                 //data={this.state.selectedGroupe}
                 onValueChange={(value)=>{this.setState({respVe:value})}}

                
                >
                 {this.state.memebers.map((data, key)=>(
                   
                   <Picker.Item label={(data.email).toString()} value={data.email} key={key} />)
                   )}

               </Picker>
               </View>
               </View>

               <View style={style.Inputcontainer} >
              <Label style={style.labelStyle}>Lieu :</Label>
            <View style={style.InputStyle}><Input  value={this.state.lieu}  style={{ borderWidth: 1, borderRadius: 5 ,padding:2}} onChangeText={(text)=>{this.setState({lieu:text})}} /></View>
            </View>

          <View style={style.Inputcontainer} >
              <Label style={style.labelStyle}>Remarque:</Label>
              <View style={{width: Dimensions.get('window').width*0.6}}><Textarea rowSpan={2} style={{ borderWidth: 1, borderRadius: 5}}  onChangeText={(text)=>{this.setState({commentaire:text}) }} /></View>
          </View>
          </Form>


          
         
  
            
          </Content>
          
        </Container>
        
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
     <Container style={{margin:5}} >
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
       
         
        
      </Content>
      
      <Fab position="bottomRight" onPress={() => {this.update()}}>
         <Icon name="paper-plane" />
            
          </Fab>
    </Container>
    </Container>
    </Container>
    
     :<Container></Container>
      
      
      }
 <Footer>
          <FooterTab>
            <Button vertical onPress={()=>this.setState({show:true})}>
              <Icon name="person" />
              <Text>Info</Text>
            </Button>
            <Button vertical onPress={()=>this.setState({show:false})}>
              <Icon name="disc" />
              <Text>Plan</Text>
            </Button>
            
          </FooterTab>
        </Footer>
    
        
      </Container>
    )
  }
}
const style = StyleSheet.create({
  Inputcontainer: {
    flexDirection: 'row',
    marginBottom:10
  },
  labelStyle:{width:Dimensions.get('window').width*0.3},
  InputStyle:{width: Dimensions.get('window').width*0.6,height:35}
});