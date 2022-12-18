import { StatusBar } from 'expo-status-bar'
import { Box, Center, Heading, Image, Pressable, ScrollView, Text, Toast, View, } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { axiosInstance } from '../../state_manager/axios'
import { useStateValue } from '../../state_manager/contextApi'
import { PostProfile } from '../../state_manager/interfaces'

const NotificationDetails = ({route} : {route : any}) => {

    const orderData : PostProfile = route.params;
    const clientName : string = route?.params?.clientName;

    const {_id,serviceName, description,name, price,imgUrl, isAccepted, location} = orderData;
    const [jobAccepting, setJobAccepting] = useState<boolean>(false);
    const {state : {user}} = useStateValue();


    const acceptJob = async ()=>{

        setJobAccepting(true);

        await axiosInstance.post(
            "/post/worker/accept/post",
            {postId : _id , workerId : user?._id},
            {headers : { "Authorization" : `Bearer ${user?.accessToken}` }} 
            ).then(res => {
            if(res.data.code === 201){
                Toast.show({title : res.data.msg})
                setJobAccepting(false)
                return;
            }

            Toast.show({title : res.data.msg})
            setJobAccepting(false)
            
        }).catch(err => {Toast.show({title : err})})
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
                    <Text  style= {{fontFamily : "MontserratR"}}>{name}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Location</Text>
                    <Text  style= {{fontFamily : "MontserratR"}}>{location}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Price</Text>
                    <Text  style= {{fontFamily : "MontserratR"}}>Ghc{price}</Text>

                    <Text mt={'3'} fontWeight={'bold'} style= {{fontFamily : "MontserratSB"}}>Status</Text>
                    <Text  color ={ `${ isAccepted ? 'blue' : 'green.600'}` } style= {{fontFamily : "MontserratR"}}>{ isAccepted ? 'ACCEPTED' : 'PENDING'}</Text>

                    <View height={10}></View>
                    <Pressable mt={'2'} onPress = {()=> { acceptJob()}} style = {styles.btn} backgroundColor = 'primary.600'>
                        <Text style = {{color : 'white'}} >{ jobAccepting ? 'ACCEPTING' : 'ACCEPT' }</Text>
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
