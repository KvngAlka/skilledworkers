import { StatusBar } from 'expo-status-bar'
import { AlertDialog, Box, Button, Center, Heading, HStack, Image, Pressable, ScrollView, Text, Toast, View, VStack } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { axiosInstance } from '../../state_manager/axios'
import { useStateValue } from '../../state_manager/contextApi'
import { PostProfile } from '../../state_manager/interfaces'

const OrderDetails = ({route} : {route : any}) => {

    const orderData : PostProfile = route.params;

    const {_id,serviceName, description,subServiceName, price,imgUrl, isAccepted, location} = orderData;
    const {state : {user}} = useStateValue();

    const [isOpen, setIsOpen] = React.useState(false);
    const [isOpen2, setIsOpen2] = React.useState(false);

    const onClose = () => setIsOpen(false);
    const onClose2 = () => setIsOpen2(false);
  
    const cancelRef = React.useRef(null);
    const doneRef = React.useRef(null);
    

    const deletePost = async ()=>{

        await axiosInstance.post(
            "/post/delete",
            {_id : orderData._id?.toString(), ownerId : user?._id},
            {headers : { "Authorization" : `Bearer ${user?.accessToken}` }} 
            ).then(res => {
            if(res.data.code === 201){
                Toast.show({title : res.data.msg})
                return;
            }

            Toast.show({title : res.data.msg})
            
        }).catch(err => { console.log("::::ERR::::", err) })
    }
  return (
    <ScrollView>
        <StatusBar backgroundColor='white'/>

        
        <View>
            <Center w="100%">
                <Box safeArea p="2" py="8" w="90%" >
                    <Heading size="lg" style= {{fontFamily : "MontserratSB"}} fontWeight="600"  >
                        Order Details
                    </Heading>

                    <Image source={{uri : imgUrl}} background={"primary.100"} my="12" borderRadius={10} alt='post_img' height={300}/>

                    <Text fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Title</Text>
                    <Text color={'primary.900'} style= {{fontFamily : "MontserratR"}} >{serviceName}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Description</Text>
                    <Text style= {{fontFamily : "MontserratR"}}>{description}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Service</Text>
                    <Text  style= {{fontFamily : "MontserratR"}}>{subServiceName}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Location</Text>
                    <Text  style= {{fontFamily : "MontserratR"}}>{location}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Price</Text>
                    <Text  style= {{fontFamily : "MontserratR"}}>Ghc{price}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Status</Text>
                    <Text  color ={ `${ isAccepted ? 'blue' : 'green.600'}` } style= {{fontFamily : "MontserratR"}}>{ isAccepted ? 'ACCEPTED' : 'PENDING'}</Text>

                    <View height={10}></View>
                    {
                        isAccepted && 
                        <Pressable mt={'2'} onPress = {()=> setIsOpen2(true)} style = {styles.btn} backgroundColor = 'primary.600'>
                            <Text style = {{color : 'white'}} >DONE</Text>
                        </Pressable>
                    }
                    <Pressable mt={'2'} onPress = {()=> setIsOpen(true)} style = {styles.btn} backgroundColor = 'red.600'>
                        <Text style = {{color : 'white'}} >CANCEL ORDER</Text>
                    </Pressable>


                    <AlertDialog leastDestructiveRef={doneRef} isOpen={isOpen2} onClose={onClose2}>
                        <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Body>
                            Are you sure job is done?
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose2} >
                                Cancel
                            </Button>
                            <Button colorScheme="primary" onPress={deletePost}>
                                Yes
                            </Button>
                            </Button.Group>
                        </AlertDialog.Footer>
                        </AlertDialog.Content>
                    </AlertDialog>

                    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
                        <AlertDialog.Content>
                        <AlertDialog.CloseButton />
                        <AlertDialog.Body>
                            Are you sure you want to cancel your order?
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button.Group space={2}>
                            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} >
                                Cancel
                            </Button>
                            <Button colorScheme="danger" onPress={deletePost}>
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
