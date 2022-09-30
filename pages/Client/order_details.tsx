import { StatusBar } from 'expo-status-bar'
import { Box, Center, Heading, HStack, Image, Pressable, ScrollView, Text, View, VStack } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { PostProfile } from '../../state_manager/interfaces'

const OrderDetails = ({route} : {route : any}) => {

    const orderData : PostProfile = route.params;

    const {title, description, workCategory} = orderData;
  return (
    <ScrollView>
        <StatusBar/>

        
        <View>
            <Center w="100%">
                <Box safeArea p="2" py="8" w="90%" >
                    <Heading size="lg" style= {{fontFamily : "MontserratSB"}} fontWeight="600"  >
                        Order Details
                    </Heading>

                    <Image background={"primary.100"} my="12" borderRadius={10} alt='post_img' height={300}/>

                    <Text fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Title</Text>
                    <Text color={'primary.900'} style= {{fontFamily : "MontserratR"}} >{title}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Description</Text>
                    <Text style= {{fontFamily : "MontserratR"}}>{description}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Work Category</Text>
                    <Text  style= {{fontFamily : "MontserratR"}}>{workCategory}</Text>

                    <Pressable mt={'3'} onPress = {()=> console.log('first')} style = {styles.btn} backgroundColor = 'green.600'>
                        <Text style = {{color : 'white'}} >PENDING</Text>
                    </Pressable>
                    <Pressable mt={'2'} onPress = {()=> console.log('first')} style = {styles.btn} backgroundColor = 'red.600'>
                        <Text style = {{color : 'white'}} >CANCEL</Text>
                    </Pressable>
                </Box>
            </Center>

        </View>
    </ScrollView>
  )
}

export default OrderDetails


const styles = StyleSheet.create({
    btn : {
        height : 50,
        borderRadius : 12,
        padding : 10,
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center'
    }
})
