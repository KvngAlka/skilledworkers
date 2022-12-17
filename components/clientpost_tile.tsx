import { Image, Pressable, Text, View } from 'native-base'
import React from 'react'
import { PostProfile } from '../state_manager/interfaces'

const ClientPostTile = ({postData,navigation} : {postData : PostProfile, navigation : any}) => {
  const {description,name, imgUrl, serviceName} = postData;

    
  return (
    <Pressable onPress={()=> navigation.navigate("OrderDetails",{...postData, subServiceName : postData.name})}>
      <View flexDirection={'row'} alignItems={'flex-start'} p={'2'} my={'1'} backgroundColor = {'white'} borderRadius = {12}>
        <Image source={ {uri : imgUrl}} height = {60} width = {60} borderRadius = {12} mr={'2'} alt ="post pic"/>
        <View mr={2} flex = {1}>
            <Text style = {{fontFamily : 'MontserratSB'}} color='primary.900'>{name}</Text>
            <Text style = {{fontFamily : 'MontserratSB'}} color='black'>{serviceName}</Text>
            <Text ellipsizeMode='tail' style ={{fontFamily : 'MontserratR'}} fontWeight={'normal'} color={'black.100'} maxW={300} >
                {description}
            </Text>
        </View>
      </View>
    </Pressable>
  )
}

export default ClientPostTile