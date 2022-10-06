import { Ionicons } from '@expo/vector-icons'
import { HStack, Icon, Input, Pressable, ScrollView, Spinner, Text, Toast, View } from 'native-base'
import React, { useState } from 'react'
import { axiosInstance } from '../../state_manager/axios'
import { useStateValue } from '../../state_manager/contextApi'

const AddSkill = () => {
  const {state : {user}} = useStateValue();
  const [skillInput, setSkillInput] = useState<string>();
  const skills = user?.skills || [];
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const handleSkillSubmit = async()=>{

    if(!skillInput){
      return Toast.show({title : "Please Enter Skill"})
    }

    setSubmitLoading(true)

    await axiosInstance.put(
      "/user/profile/update/worker/skills",
      {workerId : user?._id, sklills : [...skills,skillInput]}, 
      { headers : {"Authorization" : `Bearer ${user?.accessToken}`}}
    ).then((res)=>{
      console.log("Worker add skill res: ",res.data)
      setSubmitLoading(false)
    })
    .catch((err)=>{
      console.log(err)
      setSubmitLoading(false)
    })
    
  }




  return (
    <View flex={1}>
      <View backgroundColor={'white'} width = "100%">
            <HStack p={2} alignItems='center'>
                <Input placeholder='enter skill' value={skillInput} flex={1} mr={2} borderRadius = {12} height = {8} onChangeText = {(val)=> setSkillInput(val)} />
                <Pressable onPress={handleSkillSubmit}  py={2} px={3} backgroundColor = 'primary.900' borderRadius={12}>
                    <Text>
                      {
                        submitLoading
                        ?
                        <Spinner accessibilityLabel="Loading posts" color="white"/>
                        :
                        <Icon as={Ionicons} name="add" size={'md'} color="white" />
                      }
                    </Text>
                </Pressable>
            </HStack>
        </View>

        <ScrollView flex={1} width = "100%" background={"amber.200"}>
          {
            skills.map((skill,i)=>{
              <View width="100%" p={2} key = {i}>
                <Text>
                  {
                    skill
                  }
                </Text>
              </View>
            })
          }
        </ScrollView>
        
    </View>
  )
}

export default AddSkill