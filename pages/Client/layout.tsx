import React, { useState } from 'react'
import { Box,Icon,useTheme, View,} from 'native-base'
import AppBar from '../../components/appbar'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../Profile'
import { Ionicons } from '@expo/vector-icons'
import ClientHome from './home'
import Notifications from './notifications';
import Services from './services';


const Tab = createBottomTabNavigator();



const ClientLayout = () => {

  return (
    <View flex={1}>
      <Box safeArea/>
      <AppBar/>
      <Tab.Navigator  screenOptions={{headerShown : false}}   >

        <Tab.Screen  
        options={{tabBarIcon : ()=> <Icon   as={Ionicons} name='square' size={'lg'} />  }}  
        name = "Home" 
        component={ClientHome}
        />

        <Tab.Screen 
        options={{tabBarIcon : ()=> <Icon as={Ionicons}  name='add-circle-outline' size={'lg'} />}}
        name="Order" component={Services} />


        <Tab.Screen 
        options={{tabBarIcon : ()=>  <Icon as={Ionicons} name='notifications-outline' size={'lg'} />}}
        name="Notifications" component={Notifications} />


        <Tab.Screen 
        options={{tabBarIcon : ()=> <Icon as ={Ionicons} name='person-outline' size={'lg'} /> }} 
        name="Profile" 
        component={Profile} 
        />
        
      </Tab.Navigator>
    </View>
  )
}

export default ClientLayout


