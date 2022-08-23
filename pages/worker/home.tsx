import { Ionicons } from '@expo/vector-icons'
import { Center, HStack, Icon, Input, Pressable, ScrollView, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import WorkerJobTile from '../../components/workerjob_tile'
import { axiosInstance } from '../../state_manager/axios'
import { useStateValue } from '../../state_manager/contextApi'
import { PostProfile } from '../../state_manager/interfaces'

const WorkerHome = () => {

  const [listJobs, setListJobs] = useState<PostProfile[] | null>(null)
  const {state : {user}} = useStateValue();

  const fetchJobs = async()=>{
    // await axiosInstance.get('/worker/get/listjobs', {headers : {"Authorization" : `Bearer ${user?.accessToken}`}})
  }


  useEffect(()=>{
    fetchJobs()

    setListJobs([{description : "You already know", location : "Tema", title : "Fix it",_id : "242342",workCategory : "Plumber"}])
  },[listJobs])


  return (
    <View>
        <View backgroundColor={'white'} width = "100%">
            <HStack p={2} alignItems='center'>
                <Input placeholder='Search posts' flex={1} mr={2} borderRadius = {12} height = {8}/>
                <Pressable  py={2} px={3} backgroundColor = 'primary.900' borderRadius={12}>
                    <Icon as={Ionicons} name="search" size={'md'} color="white" />
                </Pressable>
            </HStack>
        </View>
        <ScrollView  flex={1} my={1} px={'1'} showsHorizontalScrollIndicator = {false} >
          {
            listJobs?.length === 0 ?
            <Center>
                <Text>No Data to show</Text>
            </Center>
            :
            listJobs?.map((job)=> {
              return <WorkerJobTile navigation={navigator} postData = {job} key = {job._id} />
            })
          }
           
        </ScrollView>
    </View>
  )
}

export default WorkerHome