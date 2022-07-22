import { Center, Text, View } from 'native-base'
import React, { useEffect, useState } from 'react'
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
  },[])


  return (
    <View>
        <Center>
            <Text>Worker Home Page</Text>
        </Center>
    </View>
  )
}

export default WorkerHome