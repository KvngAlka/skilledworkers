import Ionicons from '@expo/vector-icons/Ionicons'
import { Center, Heading, HStack, Icon, ScrollView, Text, View } from 'native-base'
import React from 'react'
import { Pressable } from 'react-native'
import { LOGOUT } from '../state_manager/constants'
import { useStateValue } from '../state_manager/contextApi'


const ProfileTile = ({title, value} : {title : String, value : String})=>{
  return (
    <View pb={1} mt={1} borderBottomWidth={0.5} borderBottomColor='primary.900'>
      <Text fontWeight={600} >{title}</Text>
      <Text fontWeight={'bold'} fontSize={20} color='primary.900'>{value}</Text>
    </View>
  )
}


const Profile = () => {

  const {state : {user}, dispatch} = useStateValue()

  if(!user) return <View>UnAuthorized</View>

  return (
    <ScrollView p={2} backgroundColor='white' style={{flex : 1}}>
        <View>
          <HStack justifyContent={'space-between'}>
            <Heading>Profile</Heading>
            <Icon as={Ionicons} name='pencil-sharp' size={22} />
          </HStack>
        </View>
        <View width={'100%'}>
          <Center mt={10}>
            <View height={150} width={150} backgroundColor={'primary.100'} borderRadius = {150} >
              <Center height={'100%'}>
                <Icon as={Ionicons} name='person-outline' size={60}  />
              </Center>
            </View>
          </Center>
        </View>


        <ProfileTile title='Full Name' value={user.fullName} />
        <ProfileTile title='Age' value={user.age} />
        <ProfileTile title='Gender' value={'23'} />
        <ProfileTile title='Phone Number' value={user.phoneNumber}/>
        <ProfileTile title='Location' value={user.location} />
        <ProfileTile title='Online' value={`${user.isOnline}`} />


        <Pressable onPress={()=> dispatch({type : LOGOUT})}>
          <Text>Logout</Text>
        </Pressable>

       
    </ScrollView>
  )
}

export default Profile