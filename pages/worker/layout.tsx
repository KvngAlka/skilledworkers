import React from 'react'
import { Box,Center,Icon,Text,View,} from 'native-base'
import AppBar from '../../components/appbar'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../Profile'
import { Ionicons } from '@expo/vector-icons'
import WorkerHome from './home'
import AddSkill from './add_skill';
import Notifications from './notifications';


const Tab = createBottomTabNavigator();



const WorkerLayout = () => {

  const listTabs = [
    { route : "Home", label : "Home",  iconName : "square", component : WorkerHome},
    { route : "Order", label : "Order",  iconName : "add-circle-outline",  component : AddSkill},
    { route : "Notification", label : "Notification",  iconName : "notifications-outline",  component : Notifications },
    { route : "Profile", label : "Profile",  iconName : "person-outline",  component : Profile}
  ]

  
  return (
    <View flex={1}>
      <Box safeArea/>
      <AppBar/>
      <Tab.Navigator  screenOptions={{headerShown : false,tabBarStyle : {
        height : 60,
        borderRadius : 10
      }}}>

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

export default WorkerLayout


