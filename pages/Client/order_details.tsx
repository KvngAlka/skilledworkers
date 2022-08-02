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
                    <Heading size="lg" fontWeight="600" color= {'black.100'}  >
                        Order Details
                    </Heading>

                    <Image background={"primary.100"} my="12" borderRadius={10} alt='post_img' height={300}/>

                    <Text fontWeight={'bold'}>Title</Text>
                    <Text color={'primary.900'}>{title}</Text>

                    <Text fontWeight={'bold'}>Description</Text>
                    <Text>{description}</Text>

                    <Text fontWeight={'bold'}>Work Category</Text>
                    <Text >{workCategory}</Text>

                    <Pressable mt={'2'} onPress = {()=> console.log('first')} style = {styles.btn} backgroundColor = 'green.600'>
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
