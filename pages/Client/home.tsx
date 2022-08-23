import Ionicons from "@expo/vector-icons/Ionicons"
import { Center, HStack, Icon, Input, Pressable, ScrollView, Text, Toast, View } from "native-base"
import { useCallback, useEffect, useState } from "react"
import { RefreshControl } from "react-native"
import ClientPostTile from "../../components/clientpost_tile"
import { axiosInstance } from "../../state_manager/axios"
import { useStateValue } from "../../state_manager/contextApi"







const ClientHome = ({navigation} : {navigation : any}) => {

    const {state : {user}} = useStateValue();
    const [listPosts, setListPost] = useState<any[] | null>(null)
    const [postsLoading, setPostsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);



    const fetchPosts = async()=>{
        await axiosInstance.post(
            "/post/get/clientposts",
            {_id : user?._id, phoneNumber : user?.phoneNumber},
            {headers : { "Authorization" : `Bearer ${user?.accessToken}` }} 
        )
        .then((res)=>{
            const {data} = res;
            if(data.code === 400) Toast.show({'title' : data.msg})
            if(data.code === 201) setListPost(data.data)

            setPostsLoading(false)
        })
        .catch((err:any)=>{Toast.show({title : err.message})})
    }


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchPosts().then(()=> setRefreshing(false))
    },[]);



    useEffect(()=>{  fetchPosts() },[user])


    
    
  return (
    <View style={{flex : 1}}>
        <View backgroundColor={'white'} width = "100%">
            <HStack p={2} alignItems='center'>
                <Input placeholder='Search posts' flex={1} mr={2} borderRadius = {12} height = {8}/>
                <Pressable  py={2} px={3} backgroundColor = 'primary.900' borderRadius={12}>
                    <Icon as={Ionicons} name="search" size={'md'} color="white" />
                </Pressable>
            </HStack>
        </View>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} flex={1} my={1} px={'1'} showsHorizontalScrollIndicator = {false} >
            {
                postsLoading && <Center><Text>Loading....</Text></Center>
            }
            {
                listPosts?.map((post,i)=>{
                    return <ClientPostTile key={i} postData = {post} navigation = {navigation} />
                })
            }
        </ScrollView>
    </View>
  )
}

export default ClientHome



