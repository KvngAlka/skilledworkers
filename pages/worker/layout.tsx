import React from 'react'
import { Box,Icon,View,} from 'native-base'
import AppBar from '../../components/appbar'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../Profile'
import { Ionicons } from '@expo/vector-icons'
import WorkerHome from './home'
import AddSkill from './add_skill';
import Notifications from './notifications';


const Tab = createBottomTabNavigator();



const WorkerLayout = () => {

  return (
    <View flex={1}>
      <Box safeArea/>
      <AppBar/>
      <Tab.Navigator  screenOptions={{headerShown : false}}>

        <Tab.Screen  
        options={{tabBarIcon : ()=> <Icon  as={Ionicons} name='square' size={'lg'} color={'black'}/>  }}  
        name = "Home" 
        component={WorkerHome}
        />

        <Tab.Screen 
        options={{tabBarIcon : ()=> <Icon as={Ionicons} name='add-circle-outline' size={'lg'} />}}
        name="Order" component={AddSkill} />


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

export default WorkerLayout

