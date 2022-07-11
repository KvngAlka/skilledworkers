import { Box, Center, FormControl, Heading, Input, Pressable, ScrollView, StatusBar, Text, TextArea, View, VStack } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import AppBar from '../../components/appbar';

const Order = ({navigation}: {navigation : any}) => {

    const [userInput, setUserInput] = useState({title : "", description : "", location : "", workCategory : "", img : null});
    const handleOrderSubmit = ()=>{
        console.log(userInput)
        navigation.navigate('OrderDetails')
    }
  return (
    <ScrollView backgroundColor={'white'}>
        <View>
            <Center w="100%">
                <Box safeArea p="2" py="1" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color= {'black.100'}  >
                        Order Service
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl >
                            <FormControl.Label>Title</FormControl.Label>
                            <Input type='text' borderRadius={12} color = {'black.100'} 
                            defaultValue=''
                            value = {userInput?.title}   
                            onChangeText = {(val)=> userInput && setUserInput({...userInput, title : `${val}` })} />
                        </FormControl>

                        <FormControl>
                            <FormControl.Label>Description</FormControl.Label>
                            <TextArea  type="text" borderRadius={12} color={'black.100'} height = {300}
                            onChangeText = {(val)=> userInput && setUserInput({...userInput, description : val})} 
                            autoCompleteType={undefined}/>
                        </FormControl>

                        <FormControl >
                            <FormControl.Label>Work Category</FormControl.Label>
                            <Input type='text' borderRadius={12} color = {'black.100'} 
                            defaultValue=''
                            value = {userInput?.title}   
                            onChangeText = {(val)=> userInput && setUserInput({...userInput, workCategory : val })} />
                        </FormControl>

                        <FormControl >
                            <FormControl.Label>Location</FormControl.Label>
                            <Input type='text' borderRadius={12} color = {'black.100'} 
                            defaultValue=''
                            value = {userInput?.title}   
                            onChangeText = {(val)=> userInput && setUserInput({...userInput , location : val})} />
                        </FormControl>

                        <Pressable>
                            <Text>Add Image</Text>
                        </Pressable>

                        {
                            userInput.img &&
                            <View>
                                
                            </View>
                        }


                        <Pressable mt={'2'} onPress = {handleOrderSubmit} style = {styles.order_btn} backgroundColor = 'primary.900'>
                            <Text style = {{color : 'white'}} >ORDER</Text>
                        </Pressable>
                    </VStack>
                </Box>
            </Center>
        </View>
    </ScrollView>
  )
}

export default Order



const styles = StyleSheet.create({
    order_btn : {
        height : 50,
        borderRadius : 12,
        padding : 10,
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center'
    }
})