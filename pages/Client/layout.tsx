import React, { useState } from 'react'
import { Box,Icon,Pressable,Text,useTheme, View,} from 'native-base'
import AppBar from '../../components/appbar'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../Profile'
import { Ionicons } from '@expo/vector-icons'
import ClientHome from './home'
import Notifications from './notifications';
import Services from './services';


const Tab = createBottomTabNavigator();

const listTabs = [
  { route : "Home", label : "Home",  iconName : "square", component : ClientHome},
  { route : "Order", label : "Order",  iconName : "add-circle-outline",  component : Services},
  { route : "Notification", label : "Notification",  iconName : "notifications-outline",  component : Notifications },
  { route : "Profile", label : "Profile",  iconName : "person-outline",  component : Profile}
]




const ClientLayout = () => {

  return (
    <View flex={1}>
      <Box safeArea/>
      <AppBar/>
      <Tab.Navigator  screenOptions={{headerShown : false, tabBarStyle : {
        height : 60,
        borderRadius : 10
      }}} >


        {
          listTabs.map((tabData, i)=>{
            return (
              <Tab.Screen 
              key={i}
              name={tabData.route}
              component = {tabData.component}
              options={{
                tabBarIcon : ({color, focused})=> 
                <Icon as={Ionicons} color = {focused ? 'primary.600' : 'gray.500'} name={tabData.iconName} size={'lg'} /> , 
                tabBarShowLabel : false ,
              }}
              />
            )
          })
        }

      </Tab.Navigator>
    </View>
  )
}

export default ClientLayout


