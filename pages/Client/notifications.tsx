import { Center, ScrollView, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native';
import NotificationTile from '../../components/notification_tile';

const Notifications = () => {

  const [notifications, setNotifications] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = ()=>{
    setRefreshing(true)

    const data = new Promise((resolver,reject)=>{
      resolver("Holy Chile")
      reject("Error doing file")
    })

    data.then(()=>setRefreshing(false))
  }


  useEffect(()=>{
    
  },[])


  return (
    <ScrollView  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} flex={1} my={1} px={'1'} showsHorizontalScrollIndicator = {false} >
        {
            notifications?.length === 0 ?
            <Center>
                <Text>No Data to show</Text>
            </Center>
            :
            notifications?.map((notification)=> {
              return <NotificationTile navigation={navigator} postData = {notification} key = {notification._id} />
            })
          }
           

    </ScrollView>
  )
}

export default Notifications