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
        {id : "4", serviceName : "Gardener", imgUrl : `https://bmmagazine.co.uk/wp-content/uploads/2019/06/anaya-katlego-792064-unsplash-e1560797381968.jpg`},
        {id : "3", serviceName : "Electrician", imgUrl : `https://i.onthe.io/smngoz3os2er6t7n0g.b311cfda.jpg`},
        {id : "23", serviceName : "Carpentry", imgUrl : `https://davidsbeenhere.com/wp-content/uploads/2021/04/video-the-most-famous-fish-market-in-ghana-eating-waakye-elmina-castle-tour-elmina-ghana-davidsbeenhere-7-980x551.jpeg`},
        {id : "4e", serviceName : "Mechanic", imgUrl : `https://johaniautocool.com/wp-content/uploads/2020/08/DSC_4075.jpg`},
    ]
    const [services, setServices] = useState(sObj)


    const ServiceTile = ({item} : {item : any})=>{
        const url  = `http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcSK7yT-pn1UKsEGqDRiAnF_5t2kATnvy-lZIbeQh7yUUE59mkRxuR-IaYD-87FOoWDgGDYp67gjZByYCxo`
        return (
            <Pressable onPress={()=> navigation.navigate("ServiceDetails",{id : item.id})} backgroundColor = {'primary.900'} style = {styles.service_tile} >
                <View flex={1} style = {{borderRadius : 15, overflow : 'hidden'}}>
                    <Image src={item.imgUrl || url}  alt='s_img' style = {styles.service_image} />
                </View>
                <View p={'2'} h={10}>
                    <Center>
                        <Text color={'white'} style = {{fontFamily : "MontserratR"}} >{item.serviceName}</Text>
                    </Center>
                </View>
                
            </Pressable>
        )
    }


  return (
        <View backgroundColor={'white'} >
            <Box  p="2" py="1" w={'full'} >
                <Heading size="lg" pb={'3'} style = {{fontFamily : 'MontserratSB'}} fontWeight="600"  >
                    Work Category
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
        borderRadius : 15,
        margin : 5
    },
    service_image : {
        width  : '100%',
        flex : 1,
        borderRadius : 15
    }
})