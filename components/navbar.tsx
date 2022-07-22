import Ionicons  from '@expo/vector-icons/Ionicons';
import FontAwesome  from '@expo/vector-icons/FontAwesome';
import { Center, HStack, Icon, Pressable, Text, useTheme} from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const Navbar = ({setInitPage} : {setInitPage : any}) => {
    const {colors} = useTheme();
  return (
    <HStack  style = {styles.navbar} px="5" py="3" mt={1} justifyContent="space-between" alignItems="center" w="100%" >
      <Pressable onPress={()=> setInitPage(0)} borderBottomColor={'primary.900'} borderBottomWidth = {3} pb = {1} height={30}>
        <Icon  as={Ionicons} name='square' size={'lg'} color={'black'}/>
      </Pressable>

      <Pressable >
        <Icon as={Ionicons} name='add-circle-outline' size={'lg'} />
      </Pressable>
      <Pressable>
        <Icon as={Ionicons} name='notifications-outline' size={'lg'} />
      </Pressable>
      <Pressable>
        <Icon as ={Ionicons} name='person-outline' size={'lg'} />
      </Pressable>
    </HStack>
  )
}

export default Navbar




export const BottomNavbar = ()=>{
  const [selected, setSelected] = useState(0)
  return (
    <HStack bg="primary.900" alignItems="center" safeAreaBottom shadow={6}>
          <Pressable  opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected(0)}>
            <Center>
              <Icon mb="1" as={<Icon as={MaterialCommunityIcons} name={selected === 0 ? 'home' : 'home-outline'} />} color="white" size="sm" />
              <Text color="white" fontSize="12">
                Home
              </Text>
            </Center>
          </Pressable>
          <Pressable opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(1)}>
            <Center>
              <Icon mb="1" as={<Icon as={MaterialIcons} name="search" />} color="white" size="sm" />
              <Text color="white" fontSize="12">
                Search
              </Text>
            </Center>
          </Pressable>
          <Pressable  opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => setSelected(2)}>
            <Center>
              <Icon mb="1" as={<Icon as={MaterialCommunityIcons} name={selected === 2 ? 'cart' : 'cart-outline'} />} color="white" size="sm" />
              <Text color="white" fontSize="12">
                Cart
              </Text>
            </Center>
          </Pressable>
          <Pressable opacity={selected === 3 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(3)}>
            <Center>
              <Icon mb="1" as={<Icon as={MaterialCommunityIcons} name={selected === 3 ? 'account' : 'account-outline'} />} color="white" size="sm" />
              <Text color="white" fontSize="12">
                Account
              </Text>
            </Center>
          </Pressable>
        </HStack>
  )
}


const styles = StyleSheet.create({
  navbar : {
    padding : 5,
    height : 50,
    bottom : 0,
    backgroundColor : 'white'
  }
})