import React, { useState } from 'react'
import { Box,Icon,useTheme, View,} from 'native-base'
import AppBar from '../../components/appbar'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../Profile'
import Order from './order'
import { Ionicons } from '@expo/vector-icons'
import ClientHome from './home'


const Tab = createBottomTabNavigator();



const ClientLayout = () => {

  return (
    <View flex={1}>
      <Box safeArea/>
      <AppBar/>
      <Tab.Navigator  screenOptions={{headerShown : false}}>

        <Tab.Screen  
        options={{tabBarIcon : ()=> <Icon  as={Ionicons} name='square' size={'lg'} color={'black'}/>  }}  
        name = "Home" 
        component={ClientHome}
        />

        <Tab.Screen 
        options={{tabBarIcon : ()=> <Icon as={Ionicons} name='add-circle-outline' size={'lg'} />}}
        name="Order" component={Order} />


        <Tab.Screen 
        options={{tabBarIcon : ()=>  <Icon as={Ionicons} name='notifications-outline' size={'lg'} />}}
        name="Notifications" component={Order} />


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


