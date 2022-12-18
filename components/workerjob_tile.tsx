import { Image, Pressable, Text, View } from 'native-base'
import React from 'react'
import { PostProfile } from '../state_manager/interfaces'

const WorkerJobTile = ({postData,navigation} : {postData : PostProfile, navigation : any}) => {
    const {location,name, imgUrl, nameOfClient} = postData;

   
    return (
      <Pressable onPress={()=> navigation.navigate("JobDetails",{...postData})}>
        <View flexDirection={'row'} alignItems={'flex-start'} p={'2'} my={'1'} backgroundColor = {'white'} borderRadius = {12}>
          <Image source={ {uri : imgUrl}} height = {50} width = {50} borderRadius = {12} mr={'2'} alt ="post pic"/>
          <View mr={2} flex = {1}>
              <Text style = {{fontFamily : 'MontserratSB'}} fontWeight={'bold'}  color='primary.900'>{name}</Text>
              <Text style = {{fontFamily : 'MontserratSB'}}  fontWeight={'bold'}  color='black'>{nameOfClient}</Text>
              <Text style = {{fontFamily : 'MontserratR'}} ellipsizeMode='tail' fontWeight={'normal'} color={'black.100'} maxW={300} >
                 Location :  {location}
              </Text>
          </View>
        </View>
      </Pressable>
    )
}

export default WorkerJobTile