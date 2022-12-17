import { Ionicons } from '@expo/vector-icons'
import { CheckIcon, FormControl, HStack, Icon, Input, Pressable, ScrollView, Select, Spinner, Text, Toast, View } from 'native-base'
import React, { useState } from 'react'
import { axiosInstance } from '../../state_manager/axios'
import { useStateValue } from '../../state_manager/contextApi'

const AddSkill = () => {
  const {state : {user}} = useStateValue();
  const [skillInput, setSkillInput] = useState<string>();
  const skills = user?.skills || [];
  const [services, setServices]= useState([{code : "", name : ""}])
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [serviceSelect, setServiceSelect] = useState({code : '', name : ""})

  const handleSkillSubmit = async()=>{

    if(!skillInput){
      return Toast.show({title : "Please Enter Skill"})
    }

    setSubmitLoading(true)

    await axiosInstance.put(
      "/user/profile/update/worker/skills",
      {workerId : user?._id, serviceId : `${5}`, subServiceId : `${3}`}, 
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

  const fetchServices = async()=>{
    await axiosInstance.get(
      "services/",
      {headers : { "Authorization" : `Bearer ${user?.accessToken}` }} 
      )
    .then(res => console.log('Service Data',res.data))
    .catch(err => { Toast.show(err.message,) })
  }



  return (
    <View flex={1}>
      {/* <View backgroundColor={'white'} width = "100%">
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
        </View> */}

        <View  style = {{display : 'flex', width : '100%', justifyContent : 'flex-end', backgroundColor : 'white'}}  >
        <View mt={'5'}>
                <Text fontSize={'14'} color = {'primary.900'} style = {{fontFamily : "MontserratSB"}} >Services</Text>


                  <FormControl isRequired >
                    <Select minWidth="200" onValueChange={(val)=> setServiceSelect({...serviceSelect, code : val})} accessibilityLabel="Choose Service to order" placeholder="Choose Service" _selectedItem={{
                    bg: "primary.600",
                    endIcon: <CheckIcon size={5} />
                  }} mt="2">
                    {
                      services?.map((_subservice, i)=>{
                        return (
                          <Select.Item  key={i} label={_subservice.name} value={_subservice.code} />
                        )
                      })
                    }
                    </Select>
                  </FormControl>
              </View>
          <Pressable onPress={handleSkillSubmit} style = {{width : 40, height : 10, marginRight : 3, marginLeft : 'auto'}}   py={2} px={3} backgroundColor = 'primary.900' borderRadius={20}>
              <Text>
                <Icon as={Ionicons} name="add" size={'md'} color="white" />
              </Text>
          </Pressable>
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