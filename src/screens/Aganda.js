
import _ from 'lodash';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
 
  StyleSheet,
  View
 
} from 'react-native';
import {ExpandableCalendar,  CalendarProvider} from 'react-native-calendars';
import WeekView  from 'react-native-week-view';
import { Icon,Fab, Container,Header,Left,Body,Title,Button,Right,Spinner } from 'native-base';

import {Image} from 'react-native'




export default class ExpandableCalendarScreen extends Component {

  

  static navigationOptions ={
    tabBarLabel: 'Logout',

   
    drawerIcon:(tintcolor)=>{

        return(
            <Image source={require('../img/aganda.jpg')}
            
            style={{width: 50, height: 50, borderRadius: 400/ 2}}>


            </Image>)
    }}

  state={
    email:'',
    events :[],
    selecteedDate:new Date(),
    dates:new Date(),
    isLoading:true
  }
  
  constructor(props)
  {
    super(props);
   

  }
  componentDidMount()
  {this.init()}
  async init(){
    await this.GetConnectUser();
    
    this.getListReunion(this.state.dates);
   
   
     }
     async GetConnectUser() {
       try {
           const username = await AsyncStorage.getItem('user');
           
           this.setState({email:username});
           
       }
       catch (error) {
           // Manage error handling
           alert("eeruu")
       }
     }
     getListReunion=(date)=>{
   
       fetch("http://192.168.1.28:3000/Reunion/getUtilisateurRenion",{
         method:'POST',
         headers:{
           Accept: 'application/json',
           'Content-Type': 'application/json'},
   
           body:JSON.stringify({
             
            "email":this.state.email,
            "date":date
          
          }
            )
   
   
   
   
   
       }).then(response=>response.json())
         .then(response=>{
          const tab=[]
          
           for(var ev of response.data)
           { 
             tab.push({
              id: ev.id,
              description: ev.title,
              startDate: new Date(ev.date.toString().substring(0,10)+'T'+ev.debut+':00'),
              endDate: new Date(ev.date.toString().substring(0,10)+'T'+ev.fin+':00'),
              color: '#F70000',
            })
           }
           this.setState({events:tab});
          // this.setState({items:this.state.items})
   
   
         })
   
   
   
   
     }
    


  onDateChanged = ( date) => {
  
     this.setState({dates:new Date(date)})
     this.getListReunion(date);
  }


  




 
    


  



  render() { 
   
    return (
      <Container>
        
 <Header>
          <Left>
            <Button transparent onPress={()=>this.props.navigation.openDrawer()} >
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Aganda</Title>
          </Body>
          <Right />
        </Header>

        <CalendarProvider 
        date={this.state.selecteedDate} 
        
        onDateChanged={this.onDateChanged} 
        onMonthChange={this.onMonthChange}
        theme={{todayButtonTextColor: '#0059ff'}} 
        showTodayButton 
        disabledOpacity={0.6}
      >
        <ExpandableCalendar 
          // horizontal={false}
          // hideArrows
          // disablePan
          // hideKnob
          // initialPosition={'open'} // ExpandableCalendar.positions.OPEN - can't find static positions
          firstDay={1}
           // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
          // calendarStyle={styles.calendar}
          // headerStyle={styles.calendar} // for horizontal only
        />
           <WeekView
       selectedDate={this.state.dates}
       numberOfDays={1}
       events={this.state.events}
       onEventPress={(event) => this.props.navigation.navigate('EditeReunio',{'id':event.id})}
       headerStyle={styles.headerStyle}
       formatDateHeader="MMM D"
       locale="fr"


        />
        <Fab direction="right" position="bottomRight"
          onPress={() => {this.props.navigation.navigate('AddReunio')}}>
              <Icon name='add'></Icon>
          </Fab>
      </CalendarProvider>

      </Container>
         );
  }
}

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20, 
    paddingRight: 20
  },
  section: {
    backgroundColor: '#f0f4f7', 
    color: '#79838a'
  },
  item: {
    padding: 20, 
    backgroundColor: 'white', 
    borderBottomWidth: 1, 
    borderBottomColor: '#e8ecf0', 
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey', 
    fontSize: 12, 
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black', 
    marginLeft: 16, 
    fontWeight: 'bold', 
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1, 
    alignItems: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52, 
    justifyContent: 'center',
    borderBottomWidth: 1, 
    borderBottomColor: '#e8ecf0' 
  },
  emptyItemText: {
    color: '#79838a',
    fontSize: 14
  }
});
