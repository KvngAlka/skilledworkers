import { Image, Text, View } from 'native-base'
import React from 'react'

const ClientPostTile = () => {

    const url = `https://imageio.forbes.com/specials-images/imageserve/5f47d4de7637290765bce495/0x0.jpg?format=jpg&crop=2146,2145,x1699,y559,safe&height=416&width=416&fit=bounds`
  return (
    <View flexDirection={'row'} p={'2'} my={'1'} backgroundColor = {'white'} borderRadius = {12}>
        <Image source={ {uri : url}} height = {50} width = {50} borderRadius = {12} mr={'2'} alt ="post pic"/>
        <View>
            <Text fontWeight={'bold'}  color='primary.900'>Kingsford Ashitey</Text>
            <Text ellipsizeMode='tail'>
                This is was a great idea to build in this modern world
            </Text>
        </View>
    </View>
  )
}

export default ClientPostTile