import { Image, Pressable, Text, View } from 'native-base'
import React from 'react'
import { PostProfile } from '../state_manager/interfaces'

const NotificationTile = ({postData,navigation, clientName} : {postData : PostProfile, navigation : any, clientName? : string}) => {
  const {description,name , imgUrl} = postData;

  return (
    <Pressable onPress={()=> navigation.navigate("NotificationDetails",{...postData, clientName})}>
      <View flexDirection={'row'} alignItems={'flex-start'} p={'2'} my={'1'} backgroundColor = {'white'} borderRadius = {12}>
        <Image source={ {uri : imgUrl}} height = {50} width = {50} borderRadius = {12} mr={'2'} alt ="post pic"/>
        <View mr={2} flex = {1}>
            <Text fontWeight={'bold'}  color='primary.900'>{name}</Text>
            <Text fontWeight={'bold'}  color='black'>{clientName}</Text>
            <Text ellipsizeMode='tail' fontWeight={'normal'} color={'black.100'} maxW={300}>
                {description}
            </Text>
        </View>
      </View>
    </Pressable>
  )
}

export default NotificationTile