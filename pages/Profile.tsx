import Ionicons from '@expo/vector-icons/Ionicons'
import { CommonActions } from '@react-navigation/native'
import { Center, Heading, HStack, Icon, ScrollView, Text, View , Pressable, Box} from 'native-base'
import React from 'react'
import { LOGOUT } from '../state_manager/constants'
import { useStateValue } from '../state_manager/contextApi'
import { deleteUser } from '../state_manager/local_db'


const ProfileTile = ({title, value} : {title : String, value : String})=>{
  return (
    <View pb={1} mt={1} borderBottomWidth={0.5} borderBottomColor='primary.900'>
      <Text fontFamily={'heading'} fontWeight={600} >{title}</Text>
      <Text fontFamily={'body'} fontWeight={'bold'} fontSize={20} color='primary.900'>{value}</Text>
    </View>
  )
}


const Profile = ({navigation} : {navigation : any}) => {

  const {state : {user}, dispatch} = useStateValue();

  const handleLogout = ()=>{
    user?._id && deleteUser(user._id);
    
    dispatch({type : LOGOUT});

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "SignIn" }],
      })
    )
  }

  if(!user) return <View>UnAuthorized</View>

  return (
    <ScrollView p={2} backgroundColor='white' style={{flex : 1}}>
        <View>
          <HStack justifyContent={'space-between'}>
            <Heading fontFamily={'body'}>Profile</Heading>
            <Icon onPress={()=> navigation.navigate("ProfileEdit")} as={Ionicons} name='pencil-sharp' size={22} />
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
        <ProfileTile title='Gender' value={user.gender} />
        <ProfileTile title='Phone Number' value={user.phoneNumber}/>
        {
          user.isAWorker && <ProfileTile title='Ghana Card Number' value={user?.ghanaCardNumber || "--"}/>
        }
        <ProfileTile title='Location' value={user.location} />
        <ProfileTile title='Online' value={`${user.isOnline}`} />


        <Pressable  padding={3} onPress={handleLogout}>
          <Text>Logout</Text>
        </Pressable>

        <Box height={30}></Box>

       
    </ScrollView>
  )
}

export default Profile