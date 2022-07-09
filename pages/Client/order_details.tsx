import { StatusBar } from 'expo-status-bar'
import { Box, Center, Heading, HStack, Pressable, ScrollView, Text, View, VStack } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'

const OrderDetails = () => {
  return (
    <ScrollView>
        <StatusBar/>

        
        <View>
            <Center w="100%">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color= {'black.100'}  >
                        Order Details
                    </Heading>

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
