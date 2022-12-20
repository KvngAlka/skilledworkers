import { Ionicons } from '@expo/vector-icons'
import { CheckIcon, FormControl, HStack, Icon, Image, Input, Pressable, ScrollView, Select, Spinner, Text, Toast, View } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { axiosInstance } from '../../state_manager/axios'
import { useStateValue } from '../../state_manager/contextApi'
import { UserProfile } from '../../state_manager/interfaces'

const AddSkill = ({navigation} : {navigation : any}) => {
  const {state : {user}} = useStateValue();
  const [skills, setSkills] = useState<UserProfile['skills'] | null>(null)
  const [services, setServices]= useState([{_id : "", code : "", name : "",   imgUrl : "", description : ""}])
  const [serviceSelect, setServiceSelect] = useState({code : '', name : ""});
  const [refreshing, setRefreshing] = useState(false);

  

  const fetchServices = async()=>{
    await axiosInstance.get(
      "services/",
      {headers : { "Authorization" : `Bearer ${user?.accessToken}` }} 
    )
    .then(res => {

      if(res.status === 200){
        setServices(res.data?.data)
      }
    })
    .catch(err => { Toast.show(err.message,) })
  }


  const fetchSkills = async()=>{

    await axiosInstance.post(
      "user/profile/get/worker/skills",
      {workerId : user?._id},
      {headers : { "Authorization" : `Bearer ${user?.accessToken}` }} 
    )
    .then(res => {

      if(res.status === 200){
        setSkills(res.data?.data)
      }

    })
    .catch(err => {  Toast.show(err) })

  }

  const handleNavigation = (code : any)=>{
    const selectedServiceDetail = services.filter(service => service.code === code); // return serivce[] with one object
    if(selectedServiceDetail.length > 0){
      const item  = selectedServiceDetail[0];
      navigation.navigate("SkillDetails",{id : item.code, imgUrl : item.imgUrl, parentName : item.name, description : item.description});
    }
    return;
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchServices();
    fetchSkills().
    then(()=> setRefreshing(false))
  },[]);


  useEffect(()=>{
    fetchServices();
    fetchSkills();

  },[])



  return (
    <View flex={1}>

        <View  style = {{display : 'flex', width : '100%', justifyContent : 'flex-end', backgroundColor : 'white'}}  >
          <View mt={'5'} mb={'5'} p={'2'} >
              <Text fontSize={'14'} color = {'primary.900'} style = {{fontFamily : "MontserratSB"}} >Add Skills</Text>


              <FormControl isRequired >
                <Select minWidth="200" onValueChange={(val)=> setServiceSelect({...serviceSelect, code : val})} accessibilityLabel="Choose skill to add" placeholder="Choose Skill" _selectedItem={{
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

              {
                serviceSelect.code ?
                <Pressable onPress={()=>handleNavigation(serviceSelect.code)} w={'full'} mt="5" borderRadius={7} style = {{height : 40,  display : 'flex',justifyContent : 'center', marginRight : 3, marginLeft : 'auto'}}   py={2} px={3} backgroundColor = 'primary.900'>
                  <Text color={'white'} textAlign = {'center'}>
                    NEXT
                  </Text>
                </Pressable>
                : 
                null
              }
          </View>
          
        </View>

        <ScrollView flex={1} width = "100%" background={"gray.200"} p={'2'}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} >
          {
            skills?.map((skill,i)=>{
              return(
                <View w={'full'} height={20} mt={'3'}  flexDirection ={'row'} backgroundColor={'white'}  borderRadius ={'10'} p={2} key = {i}>
                  <Image source={ {uri : skill.imgUrl}} height = {60} width = {60} borderRadius = {12} mr={'2'} alt ="post pic"/>
                  <Text style = {{fontFamily : "MontserratSB"}}>
                    {
                      skill.name
                    }
                  </Text>
                </View>
              )
            })
          }
        </ScrollView>
        
    </View>
  )
}

export default AddSkill