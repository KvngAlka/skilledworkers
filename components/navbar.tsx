import { useTheme} from 'native-base'
import React from 'react'
import { View } from 'react-native'

const Navbar = () => {
    const {colors} = useTheme();
  return (
    <View style = {{backgroundColor : `${colors.primary[100]}`, height : 50, marginTop : 50}}>

    </View>
  )
}

export default Navbar