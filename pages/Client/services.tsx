import { Box, Center, FlatList, FormControl, Heading, Image, Input, Pressable, ScrollView, StatusBar, Text, TextArea, Toast, View, VStack } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { axiosInstance } from '../../state_manager/axios';
import { useStateValue } from '../../state_manager/contextApi';
import { PostProfile } from '../../state_manager/interfaces';







const Services = ({navigation} : {navigation : any}) => {

    const [userInput, setUserInput] = useState<PostProfile>({title : "", description : "", location : "", workCategory : ""});
    const {state : {user}} = useStateValue();
    const [dataSubmitting,setDataSubmitting] = useState(false)

    const sObj = [
        {id : "1", serviceName : "Plumbing", imgUrl : `https://www.houseclap.com/wp-content/uploads/2021/02/ppr-work.jpeg`},
        {id : "2", serviceName : "Painting", imgUrl : `https://housesolutions.com.ng/wp-content/uploads/2018/06/building-painting-ideas-in-Nigeria.png`},
        {id : "4", serviceName : "Gardener", },
        {id : "3", serviceName : "Electrician"},
        {id : "23", serviceName : "Carpentry"},
        {id : "4e", serviceName : "Mechanic"},
    ]
    const [services, setServices] = useState(sObj)


    const ServiceTile = ({item} : {item : any})=>{
        const url  = `http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSK7yT-pn1UKsEGqDRiAnF_5t2kATnvy-lZIbeQh7yUUE59mkRxuR-IaYD-87FOoWDgGDYp67gjZByYCxo`
        return (
            <Pressable onPress={()=> navigation.navigate("ServiceDetails",{id : item.id})} backgroundColor = {'primary.900'} style = {styles.service_tile} >
                <View flex={1}>
                    <Image src={item.imgUrl || url}  alt='s_img' style = {styles.service_image} />
                </View>
                <View p={'2'} h={10}>
                    <Center>
                        <Text color={'white'} >{item.serviceName}</Text>
                    </Center>
                </View>
                
            </Pressable>
        )
    }


  return (
        <View backgroundColor={'white'} >
            <Box  p="2" py="1" w={'full'} >
                <Heading size="lg" pb={'3'} fontWeight="600" color= {'black.100'}  >
                    Order Service
                </Heading>

                <View w={'full'} height={'92%'}>
                    <FlatList
                        numColumns={2}
                        data={services}
                        renderItem={ServiceTile}
                        keyExtractor={(service) => service.id}

                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator = {false}
                    />
                </View>
                
            </Box>
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
        borderRadius : 10,
        margin : 5
    },
    service_image : {
        width  : '100%',
        flex : 1
    }
})