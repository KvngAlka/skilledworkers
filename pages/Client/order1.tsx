import { Box, Center, FormControl, Heading, Input, Pressable, ScrollView, StatusBar, Text, TextArea, Toast, View, VStack } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { axiosInstance } from '../../state_manager/axios';
import { useStateValue } from '../../state_manager/contextApi';
import { PostProfile } from '../../state_manager/interfaces';




const Order = () => {

    const [userInput, setUserInput] = useState<PostProfile>({serviceName : "", description : "", location : ""});
    const {state : {user}} = useStateValue();
    const [dataSubmitting,setDataSubmitting] = useState(false)

    const handleOrderSubmit = async()=>{
        setDataSubmitting(true)
        await axiosInstance.post('/post/add',{ownerId : user?._id,...userInput},{headers : {"Authorization" : `Bearer ${user?.accessToken}`}})
        .then((res)=>{
            console.log("Submit res",res.data);
            
            Toast.show({title : "Successfully Posted Order"})
            setUserInput({serviceName : "",description : "",location : "",})
            setDataSubmitting(false)
        })
        .catch((err:any)=>{Toast.show({title : `${err.message}`});console.log('Err',err); setDataSubmitting(false)})
    }
  return (
    <ScrollView backgroundColor={'white'}>
        <View>
            <Center w="100%">
                <Box safeArea p="2" py="1" w="90%" >
                    <Heading size="lg" fontWeight="600" color= {'black.100'}  >
                        Order Service
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl >
                            <FormControl.Label>Title</FormControl.Label>
                            <Input type='text' borderRadius={12} color = {'black.100'} 
                            defaultValue=''
                            value = {userInput?.serviceName}   
                            onChangeText = {(val)=> userInput && setUserInput({...userInput, serviceName : `${val}` })} />
                        </FormControl>

                        <FormControl>
                            <FormControl.Label>Description</FormControl.Label>
                            <TextArea  type="text" borderRadius={12} color={'black.100'} height = {300}
                            value = {userInput?.description}
                            onChangeText = {(val)=> userInput && setUserInput({...userInput, description : val})} 
                            autoCompleteType={undefined}/>
                        </FormControl>


                        <FormControl >
                            <FormControl.Label>Location</FormControl.Label>
                            <Input type='text' borderRadius={12} color = {'black.100'} 
                            defaultValue=''
                            value = {userInput?.location}   
                            onChangeText = {(val)=> userInput && setUserInput({...userInput , location : val})} />
                        </FormControl>

                        <Pressable>
                            <Text>Add Image</Text>
                        </Pressable>

                        {
                            // userInput.img &&
                            false &&
                            <View>
                                
                            </View>
                        }


                        <Pressable mt={'2'} onPress = {handleOrderSubmit} style = {styles.order_btn} backgroundColor = 'primary.900'>
                            <Text style = {{color : 'white'}} >
                                { dataSubmitting ? "LOADING..." : "ORDER"}
                            </Text>
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