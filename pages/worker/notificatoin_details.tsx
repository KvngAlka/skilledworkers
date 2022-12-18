import { StatusBar } from 'expo-status-bar'
import { AlertDialog, Box, Button, Center, Heading, HStack, Image, Pressable, ScrollView, Text, Toast, View, VStack } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { axiosInstance } from '../../state_manager/axios'
import { useStateValue } from '../../state_manager/contextApi'
import { PostProfile } from '../../state_manager/interfaces'

const NotificationDetails = ({route} : {route : any}) => {

    const orderData : PostProfile = route.params;
    const clientName : string = route?.params?.clientName;

    const {_id,serviceName, description,subServiceName, price,imgUrl, isAccepted} = orderData;
    const {state : {user}} = useStateValue();


    const acceptJob = async ()=>{

        await axiosInstance.post(
            "/post/worker/accept/post",
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

        
        <View>
            <Center w="100%">
                <Box safeArea p="2" py="8" w="90%" >
                    <Heading size="lg" style= {{fontFamily : "MontserratSB"}} fontWeight="600"  >
                        Notification Details
                    </Heading>

                    <Image source={{uri : imgUrl}} background={"primary.100"} my="12" borderRadius={10} alt='post_img' height={300}/>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Client Name</Text>
                    <Text style= {{fontFamily : "MontserratR"}}>{clientName}</Text>

                    <Text fontWeight={'bold'} mt={'3'} style= {{fontFamily : "MontserratSB"}}>Title</Text>
                    <Text color={'primary.900'} style= {{fontFamily : "MontserratR"}} >{serviceName}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Description</Text>
                    <Text style= {{fontFamily : "MontserratR"}}>{description}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Service</Text>
                    <Text  style= {{fontFamily : "MontserratR"}}>{subServiceName}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Price</Text>
                    <Text  style= {{fontFamily : "MontserratR"}}>Ghc{price}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Status</Text>
                    <Text  color ={ `${ isAccepted ? 'blue' : 'green.600'}` } style= {{fontFamily : "MontserratR"}}>{ isAccepted ? 'ACCEPTED' : 'PENDING'}</Text>

                    <View height={10}></View>
                    <Pressable mt={'2'} onPress = {()=> {}} style = {styles.btn} backgroundColor = 'primary.600'>
                        <Text style = {{color : 'white'}} >ACCEPT</Text>
                    </Pressable>
                    
                </Box>
            </Center>

        </View>
    </ScrollView>
  )
}

export default NotificationDetails


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
