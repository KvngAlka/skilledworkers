import { Ionicons } from '@expo/vector-icons'
import { Box, Center, CheckIcon, FormControl, Heading, Icon, Image, Pressable, ScrollView, Select, StatusBar, Text, Toast, View,} from 'native-base'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { axiosInstance } from '../../state_manager/axios'
import { UPDATE_USER } from '../../state_manager/constants'
import { useStateValue } from '../../state_manager/contextApi'
import { PostProfile } from '../../state_manager/interfaces'

const SkillDetail = ({navigation, route} : {navigation : any, route : any}) => {
  
    const {state : {user}, dispatch} = useStateValue();
    const [dataSubmitting,setDataSubmitting] = useState(false)

    const [service, setService]= useState({code : "",name : "", description : '',  imgUrl : ""})
    const [subServices, setSubServices] = useState([{code : "", price : "",  name : "",}])
    const [serviceSelect, setServiceSelect] = useState({serviceId : '', subServiceId : ""})
    const [price, setPrice] = useState<string | null>(null)

    const { id, imgUrl, parentName, description }: any = route.params

    const fetchService = async()=>{
      await axiosInstance.post(
        "services/get/subservices",
        {code : id},
        {headers : { "Authorization" : `Bearer ${user?.accessToken}` }} 
        )
      .then(res => {

        setService({
          code : id || ``, 
          imgUrl : imgUrl || ``,
          name : `${parentName} Service` || "",
          description : description || "",
        })

        setSubServices(res.data.data)
      })
      .catch(err => { Toast.show(err.message,) })
    }



    const handleSkillSubmit = async()=>{

        if(!serviceSelect.subServiceId){
          return Toast.show({title : "Please select sub Skill"})
        }
    
        setDataSubmitting(true)
    
        await axiosInstance.put(
          "/user/profile/update/worker/skills",
          {workerId : user?._id, ...serviceSelect}, 
          { headers : {"Authorization" : `Bearer ${user?.accessToken}`}}
        ).then((res)=>{
    
          if(res.status === 200){
            Toast.show({title : res.data.msg})
            dispatch({type : UPDATE_USER, payload : res.data.data})
            setDataSubmitting(false);
            return
          }
          Toast.show({title : res.data.msg})
          setDataSubmitting(false)
        })
        .catch((err)=>{
          Toast.show({title : err})
          setDataSubmitting(false)
        })
        
      }


      let handleSubSkillSelect = (val : string)=>{

        const index = parseInt(val);
  
        setPrice(subServices[index]?.price)
        
        setServiceSelect(
          {
            ...serviceSelect,serviceId : service.code, 
            subServiceId : subServices[index].code
          }
        )
        
        
  
      }


    useEffect(()=>{
      fetchService()
    },[])



  return (
    <ScrollView backgroundColor={'white'}>
        <Box safeArea px={'5'} py={'3'}>
            <Pressable p={'3'} style ={{borderWidth : 1, borderRadius : 15}}borderColor = {'gray.300'} >
              <Icon onPress={()=> navigation.goBack()} as={Ionicons} name='return-up-back-outline' size={22} />
            </Pressable>
        </Box>

        <View>
          
            <Center w="100%">
                <Box  p="2" py="1" w="90%" >
                    <Heading size="lg" style = {{fontFamily : "MontserratSB"}} fontWeight="600"  >
                        Skill Details
                    </Heading>
                </Box>
            </Center>



            <View p={'5'}>
              <Image src={service.imgUrl}  background={"primary.100"} my="3" borderRadius={10} alt='post_img' height={300}/>
              <View>
                <Text fontSize={'14'} style = {{fontFamily : "MontserratSB"}}  color = {'primary.900'}>Name</Text>
                <Text fontWeight={'extrabold'} style = {{fontFamily : "MontserratSB"}}  fontSize = {'18'}>{service.name}</Text>
              </View>


              <View mt={'5'}>
                <Text fontSize={'14'} color = {'primary.900'} style = {{fontFamily : "MontserratSB"}}  >Description</Text>
                <Text fontWeight={500} fontSize = {'16'} style = {{fontFamily : "MontserratR"}}  > {service.description}</Text>
              </View>



              <View mt={'5'}>
                <Text fontSize={'14'} color = {'primary.900'} style = {{fontFamily : "MontserratSB"}} >Sub Skills</Text>


                <Center>
                  <FormControl isRequired >
                    <Select minWidth="200" onValueChange={(val)=> handleSubSkillSelect(val)} accessibilityLabel="Choose Service to order" placeholder="Choose Service" _selectedItem={{
                    bg: "primary.600",
                    endIcon: <CheckIcon size={5} />
                  }} mt="2">
                    {
                      subServices?.map((_subservice, i)=>{
                        return (
                          <Select.Item   key={i} label={_subservice.name} value={_subservice.code} />
                        )
                      })
                    }
                    </Select>
                  </FormControl>
                </Center>
              </View>

              <View mt={'5'}>
                <Text fontSize={'14'} color = {'primary.900'} style = {{fontFamily : "MontserratSB"}}  >Price</Text>
                <Text fontWeight={500} fontSize = {'16'} style = {{fontFamily : "MontserratR"}}  >Ghc {price ?? 0 }</Text>
              </View>

              <Box h={'10'}></Box>
              <Pressable mt={'2'} onPress = {handleSkillSubmit} style = {styles.btn} backgroundColor = 'primary.600'>
                  <Text style = {{color : 'white', fontFamily : "MontserratR"}} >{dataSubmitting ? "ADDING..." : "ADD"}</Text>
              </Pressable>
              <Pressable mt={'4'} onPress = {()=> navigation.goBack()} style = {styles.btn}  borderWidth = '1' borderColor = 'primary.900'>
                  <Text style = {{color : 'blue', fontFamily : "MontserratR"}} onPress = {()=> {dataSubmitting ? setDataSubmitting(false) : navigation.goBack()}}>CANCEL</Text>
              </Pressable>

            </View>
        </View>

    </ScrollView>
  )
}

export default SkillDetail


const styles = StyleSheet.create({
  btn : {
      height : 50,
      borderRadius : 12,
      padding : 10,
      width : '100%',
      alignItems : 'center',
      justifyContent : 'center'
  }
})