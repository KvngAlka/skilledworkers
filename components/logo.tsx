
import { useTheme } from 'native-base';
import React from 'react'
import { Text, View } from 'react-native';

const Logo : React.FC<{ size : number, type : 'primary' | 'normal', fontSize : number}> = ({size, type, fontSize}) => {
    const {colors} = useTheme();

    const logoProp = {
        backgroundColor : type === 'primary' ? colors.primary[900] : "white",
        color : type === 'primary' ? "white" : "black"
    }
    
  return (
    <View style = {{width : size , height : size, borderRadius : 100, backgroundColor : logoProp.backgroundColor, justifyContent : 'center', alignItems : 'center'}}>
        <Text style = {{fontWeight : 'bold', fontSize : fontSize, color : logoProp.color}}>SW</Text>
    </View>
  )
}

export default Logo