import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, View } from 'native-base';

import {Image} from 'react-native'
export default class Home extends Component {

  static navigationOptions ={
    tabBarLabel: 'Logout',

   
    drawerIcon:(tintcolor)=>{

        return(
            <Image source={require('../img/Home.jpg')}
            
            style={{width: 50, height: 50, borderRadius: 400/ 2}}>


            </Image>)
    }}





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
            <Title>InstaMeeting</Title>
          </Body>
          <Right />
        </Header>
        <Content >
          <View style={ {
              flexDirection: 'row',
              alignItems: 'center',
               justifyContent: 'center',
               marginTop:100
              }}>
          <Image style={{width:150,height:150}} source={require('../img/welcome.jpg')}>

          </Image>
          </View>
        </Content>
        
      </Container>
    );
  }
}