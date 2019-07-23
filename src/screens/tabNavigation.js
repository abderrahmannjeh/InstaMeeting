import React ,{Component} from 'react';
import { Text, View } from 'react-native';

import AddMembers from './AddMemebers'
import AdPoints from './AddPointsDescution'
import { Container,FooterTab,Footer,Button,Icon } from 'native-base';


  

  export default class App extends Component {

state={show:0}
    
      
    render() {
  
      return(
        <Container>
        {this.state.show==0?
            <AddMembers nav={this.props.navigation}></AddMembers>
            :
            <AdPoints nav={this.props.navigation}></AdPoints>
        
        
        
        }
        <Footer>
          <FooterTab>
            <Button vertical onPress={()=>this.setState({show:0})}>
              <Icon name="person" />
              <Text>Memebers</Text>
            </Button>
            <Button vertical onPress={()=>this.setState({show:1})}>
              <Icon name="disc" />
              <Text>Discute</Text>
            </Button>
            
          </FooterTab>
        </Footer>
        </Container>  
      )
  
  
    }
   }
  
  




