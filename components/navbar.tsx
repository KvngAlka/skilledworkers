import Ionicons  from '@expo/vector-icons/Ionicons';
import { HStack, Pressable, Icon, useTheme} from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'

const Navbar = ({setInitPage} : {setInitPage : any}) => {
    const {colors} = useTheme();
  return (
    <HStack style = {styles.navbar} px="5" py="3" mt={1} justifyContent="space-between" alignItems="center" w="100%" >
      <Pressable onPress={()=> setInitPage(0)} borderBottomColor={'primary.900'} borderBottomWidth = {3} pb = {1} height={30}>
        <Ionicons name='home-outline' size={24}  color ='blue' />
      </Pressable>

      <Pressable >
        <Icon  name='menu' />
        <Ionicons name='add-circle-outline' size={24} />
      </Pressable>
      <Pressable>
        <Ionicons name='notifications-outline' size={24} />
      </Pressable>
      <Pressable>
        <Ionicons name='person-outline' size={24} />
      </Pressable>
    </HStack>
  )
}

export default Navbar


const styles = StyleSheet.create({
  navbar : {
    padding : 5,
    height : 50,
    bottom : 0,
    backgroundColor : 'white'
  }
})