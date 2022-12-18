import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { AlertDialog, Box, Button, Center, Heading, Icon, Image, Pressable, ScrollView, Text, Toast, View, } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { axiosInstance } from '../../state_manager/axios'
import { useStateValue } from '../../state_manager/contextApi'
import { PostProfile } from '../../state_manager/interfaces'

const JobDetails = ({route, navigation} : {route : any, navigation : any}) => {

    const orderData : PostProfile = route.params;

    const {_id,serviceName, description,name, price,imgUrl, isAccepted, location} = orderData;
    const {state : {user}} = useStateValue();

    const [isOpen, setIsOpen] = React.useState(false);

    const onClose = () => setIsOpen(false);
  
    const cancelRef = React.useRef(null);
    

    const deletePost = async ()=>{

        console.log(_id)

        await axiosInstance.post(
            "/post/delete",
            {_id , ownerId : user?._id},
            {headers : { "Authorization" : `Bearer ${user?.accessToken}` }} 
            ).then(res => {
            if(res.data.code === 200){
                const {data} = res.data;
                return;
            }

            Toast.show({title : res.data.msg})
            
        }).catch(err => { console.log("::::ERR::::", err) })
    }
  return (
    <ScrollView>
        <StatusBar backgroundColor='white'/>

        <Box safeArea px={'5'} pt={'3'}>
            <Pressable onPress={()=> navigation.goBack()} p={'3'} style ={{borderWidth : 1, borderRadius : 15}}borderColor = {'gray.300'} >
              <Icon  as={Ionicons} name='return-up-back-outline' size={22} />
            </Pressable>
        </Box>
        
        <View>
            <Center w="100%">
                <Box safeArea p="2"  w="90%" >
                    <Heading size="lg" style= {{fontFamily : "MontserratSB"}} fontWeight="600"  >
                        Job Details
                    </Heading>

                    <Image source={{uri : imgUrl}} background={"primary.100"} my="12" borderRadius={10} alt='post_img' height={300}/>

                    <Text fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Title</Text>
                    <Text color={'primary.900'} style= {{fontFamily : "MontserratR"}} >{serviceName}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Description</Text>
                    <Text style= {{fontFamily : "MontserratR"}}>{description}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Service</Text>
                    <Text  style= {{fontFamily : "MontserratR"}}>{name}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Location</Text>
                    <Text  style= {{fontFamily : "MontserratR"}}>{location}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Price</Text>
                    <Text  style= {{fontFamily : "MontserratR"}}>Ghc{price}</Text>

                   
                    <View height={10}></View>
                    <Pressable mt={'2'} onPress = {()=> setIsOpen(true)} style = {styles.btn} backgroundColor = 'primary.600'>
                        <Text style = {{color : 'white'}} >DONE</Text>
                    </Pressable>

                    <AlertDialog leastDestructiveRef={cancelRef} animationPreset = "slide" isOpen={isOpen} onClose={onClose}>
                        <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Body>
                            Are you sure you are done?
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} >
                                Cancel
                            </Button>
                            <Button colorScheme="primary" onPress={deletePost}>
                                Yes
                            </Button>
                            </Button.Group>
                        </AlertDialog.Footer>
                        </AlertDialog.Content>
                    </AlertDialog>
                </Box>
            </Center>

        </View>
    </ScrollView>
  )
}

export default JobDetails


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
