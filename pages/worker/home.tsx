import { Ionicons } from '@expo/vector-icons'
import { Center, HStack, Icon, Input, Pressable, ScrollView, Text, Toast, View } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import WorkerJobTile from '../../components/workerjob_tile'
import { axiosInstance } from '../../state_manager/axios'
import { useStateValue } from '../../state_manager/contextApi'
import { PostProfile } from '../../state_manager/interfaces'

const WorkerHome = ({navigation} : {navigation : any}) => {

  const [listJobs, setListJobs] = useState<PostProfile[] | null>(null)
  const {state : {user}} = useStateValue();
  const [postsLoading, setPostsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false);



  const fetchJobs = async()=>{

    setPostsLoading(true);

    await axiosInstance.post('post/worker/get/listjobs',{workerId : user?._id}, {headers : {"Authorization" : `Bearer ${user?.accessToken}`}})
    .then(res => {
      console.log(res.data)
      if(res.data.code === 200){
        setListJobs(res.data.msg);
        setPostsLoading(false)
        return;
      }

      Toast.show({title : res.data.msg})
      setPostsLoading(false);


    })
    .catch(err => { Toast.show({title : err});  setPostsLoading(false) })
  }


  useEffect(()=>{
    fetchJobs()
  },[])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchJobs().then(()=> setRefreshing(false))
  },[]);



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
   
      <ScrollView  flex={1} my={1} px={'1'} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}  showsHorizontalScrollIndicator = {false} >
        {
          postsLoading && <Center><Text>Loading....</Text></Center>
        }
        {
          listJobs?.length === 0 ?
          <Center>
              <Text >No Data to show</Text>
          </Center>
          :
          listJobs?.map((job,i)=> {
            return <WorkerJobTile navigation={navigation} postData = {job} key = {i} />
          })
        }
          
      </ScrollView>
    </View>
  )
}

export default WorkerHome