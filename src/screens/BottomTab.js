import React ,{Component} from 'react';


import AddMembers from './AddMemebers'
import AdPoints from './AddPointsDescution'

const TabNavigator = createBottomTabNavigator({
    Memebr: AddMembers,
    Points: AdPoints,
  });
  
export default TabNavigator;