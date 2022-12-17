import { Box, Center, FlatList, FormControl, Heading, Image, Input, Pressable, ScrollView, StatusBar, Text, TextArea, Toast, View, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { axiosInstance } from '../../state_manager/axios';
import { useStateValue } from '../../state_manager/contextApi';
import { PostProfile } from '../../state_manager/interfaces';







const Services = ({navigation} : {navigation : any}) => {

    const {state : {user}} = useStateValue();
    const [services, setServices] = useState<any>();
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(()=>{
        const fetchServices = async()=>{
            await axiosInstance.get(
                "/services/",
                {headers : { "Authorization" : `Bearer ${user?.accessToken}` }} 
                ).then(res => {
                if(res.data.code === 200){
                    const {data} = res.data
                    setServices(data)
                    setPageLoading(false)
                }
                
            }).catch(err => setPageLoading(false))
        }

        fetchServices();
    },[])


    const ServiceTile = ({item} : {item : any})=>{
        return (
            <Pressable onPress={()=> navigation.navigate("ServiceDetails",{id : item.code, imgUrl : item.imgUrl, parentName : item.name, description : item.description})} backgroundColor = {'primary.900'} style = {styles.service_tile} >
                <View flex={1} style = {{borderRadius : 15, overflow : 'hidden'}}>
                    <Image src={item.imgUrl}  alt='s_img' style = {styles.service_image} />
                </View>
                <View p={'2'} h={10}>
                    <Center>
                        <Text color={'white'} style = {{fontFamily : "MontserratR"}} >{item.name}</Text>
                    </Center>
                </View>
                
            </Pressable>
        )
    }


  return (
        <View backgroundColor={'white'} >
            {
                pageLoading ?
                <Center>
                    <Text>Loading...</Text>
                </Center>
                :
                <Box  p="2" py="1" w={'full'} >
                    <Heading size="lg" pb={'3'} style = {{fontFamily : 'MontserratSB'}} fontWeight="600"  >
                        {/* Work Category */}
                        Order Service
                    </Heading>

                    <View w={'full'} height={'92%'}>
                        <FlatList
                            numColumns={2}
                            data={services}
                            renderItem={ServiceTile}
                            keyExtractor={(_, i) => i.toString()}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator = {false}
                        />
                    </View>
                    
                </Box>

            }
            
        </View>
  )
}

export default Services



const styles = StyleSheet.create({
    order_btn : {
        height : 50,
        borderRadius : 12,
        padding : 10,
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center'
    },
    services : {
        width : "100%",
        backgroundColor : "green"
    },
    service_tile :{
        height : 200,
        flexDirection : "column",
        flex: 1,
        overflow :'hidden',
        borderRadius : 15,
        margin : 5
    },
    service_image : {
        width  : '100%',
        flex : 1,
        borderRadius : 15
    }
})