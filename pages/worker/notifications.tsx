import { Center, HStack, Input, Pressable, ScrollView, Text, Toast, View } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native';
import ClientPostTile from '../../components/clientpost_tile';
import NotificationTile from '../../components/notification_tile';
import { axiosInstance } from '../../state_manager/axios';
import { useStateValue } from '../../state_manager/contextApi';

const Notifications = ({navigation, route} : {navigation : any, route : any}) => {


  const {state : {user}} = useStateValue();
    const [listNotification, setListNotification] = useState<any[] | null>(null)
    const [postsLoading, setPostsLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false);



    const fetchNotifications = async()=>{
        await axiosInstance.post(
            "/post/worker/get/notifications",
            {workerId : user?._id},
            {headers : { "Authorization" : `Bearer ${user?.accessToken}` }} 
        )
        .then((res)=>{
            const {data} = res;
            console.log(data.data)

            if(data.code === 400) Toast.show({'title' : data.msg})
            if(data.code === 201) setListNotification(data.data)

            setPostsLoading(false)
        })
        .catch((err:any)=>{Toast.show({title : err.message})})
    }


    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchNotifications().then(()=> setRefreshing(false))
    },[]);



    useEffect(()=>{  fetchNotifications() },[user])



  
  return (
    <View style={{flex : 1}}>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} flex={1} my={1} px={'1'} showsHorizontalScrollIndicator = {false} >
            {
                postsLoading && <Center><Text>Loading....</Text></Center>
            }
            {
                listNotification?.map((notification,i) =>{
                    return <NotificationTile key={i} clientName={notification.nameOfClient}  postData={notification} navigation = {navigation}/>
                })
            }
        </ScrollView>
    </View>
  )
}

export default Notifications