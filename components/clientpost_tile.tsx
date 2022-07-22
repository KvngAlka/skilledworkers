import { Image, Pressable, Text, View } from 'native-base'
import React from 'react'

const ClientPostTile = ({title,description, navigation} : {title : String, description : String, navigation : any}) => {

    const url = `https://imageio.forbes.com/specials-images/imageserve/5f47d4de7637290765bce495/0x0.jpg?format=jpg&crop=2146,2145,x1699,y559,safe&height=416&width=416&fit=bounds`
  return (
    <Pressable onPress={()=> navigation.navigate("OrderDetails")}>
      <View flexDirection={'row'} alignItems={'flex-start'} p={'2'} my={'1'} backgroundColor = {'white'} borderRadius = {12}>
        <Image source={ {uri : url}} height = {50} width = {50} borderRadius = {12} mr={'2'} alt ="post pic"/>
        <View mr={2} flex = {1}>
            <Text fontWeight={'bold'}  color='primary.900'>{title}</Text>
            <Text ellipsizeMode='tail' fontWeight={'normal'} color={'black.100'} maxW={300} overflowX="revert">
                {description}
            </Text>
        </View>
      </View>
    </Pressable>
  )
}

export default ClientPostTile