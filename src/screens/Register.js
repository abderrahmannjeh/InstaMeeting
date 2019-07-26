import React from 'react'
import {
    Text,
  ScrollView,ToastAndroid
} from 'react-native'
import{ Button,Container,Input,Label,Item,Body,Icon,Header,Title,Right,Fab, View} from 'native-base'

export default class Register extends React.Component {
  state = {
     password: '', email: '', nom:'',prenom:'',password2:'',
     nameEr:false,emailEr:false,prenomEr:false,passwordEr:false
  }

  register=()=>{
   if ( this.state.emailEr==false &&  this.state.passwordEr ==false)

    {  
        fetch('http://192.168.1.28:3000/users/register',{

        method:'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            'email':this.state.email,
            'password':this.state.password,
            "nom":this.state.nom,
            "prenom":this.state.prenom
        
        
        })
        
        }).then(response => response.json())
            .then(response => {
                if(response.success===false)
                ToastAndroid.show(response.message, ToastAndroid.SHORT);

                else
                {
                    
                    ToastAndroid.show(response.message, ToastAndroid.SHORT);
                    this.setState({password: '', email: '', nom:'',prenom:'',password2:''})
        
                }
            })
        
         .catch(function(error) {
             // ADD THIS THROW error
              throw error;
            });  
        
        

        }

  }


 
  render() {
    return (
        <Container >
            <Header>
          <Button transparent onPress={()=>this.props.navigation.goBack()} >
              <Icon name='arrow-back' />
            </Button>
            <Body>
              <Title>Register</Title>
            </Body>
            <Right />
          </Header>
          <ScrollView>
          <Container style={{margin:10}} >
       

        <Item stackedLabel error={this.state.emailEr} >
            <Icon name="ios-person" style={{ color: '#0A69FE' }} />

                <Label>Email:</Label>
                <Input type="email" value={this.state.email}  onChangeText={(text)=>{
                     text==''?this.setState({emailEr:true}):this.setState({emailEr:false})

                    this.setState({email:text})}} />
        </Item>
        {this.state.emailEr? <Text>Email Invalide </Text>:<Text></Text>}

        <Item stackedLabel error={this.state.passwordEr} >
        <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />

                <Label>Mots De Passe:</Label>
                <Input value={this.state.password}  onChangeText={(text)=>{
                    text==''?this.setState({passwordEr:true}):this.setState({passwordEr:false})
                    
                    this.setState({password:text})}} />
        </Item>
        {this.state.passwordEr? <Text>Mots de passe require </Text>:<Text></Text>}

        <Item stackedLabel >
        <Icon name="ios-unlock" style={{ color: '#0A69FE' }} />

                <Label>Confirmer mots de passe:</Label>
                <Input value={this.state.password2}  onChangeText={(text)=>{
                    text==''?this.setState({passwordEr:true}):this.setState({passwordEr:false})
                    
                    
                    this.setState({password2:text})}} />
        </Item>
        {this.state.passwordEr? <Text>Mots de passe require </Text>:<Text></Text>}
        {this.state.password!=this.state.password2 ?<Text>Mots de passe invalide </Text>:<Text></Text>}               
        
        <Button style={{ alignSelf: 'center', marginBottom: 30 ,width:120}} onPress={()=>{this.register()}}>
            <View style={{flex:1,
             justifyContent: 'center',
            alignItems: 'center'}}>
                       <Text > Register</Text>
                       </View>
                    </Button>
        </Container>
       
</ScrollView>

       
        </Container>    )
  }
}

