import { useTheme} from 'native-base'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Logo from './logo';

const Navbar = () => {
    const {colors} = useTheme();
  return (
    <View style = {styles.navbar}>
      <Logo size={30} fontSize = {17} type = 'primary' />
    </View>
  )
}

export default Navbar


const styles = StyleSheet.create({
  navbar : {
    padding : 10,
    height : 50,
    marginTop : 50,
    flexDirection : 'row',
    justifyContent : 'space-between' 
  }
})