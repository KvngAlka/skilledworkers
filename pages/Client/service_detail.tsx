import { Ionicons } from '@expo/vector-icons'
import { Box, Center, CheckIcon, FormControl, Heading, Icon, Pressable, ScrollView, Select, StatusBar, Text, Toast, View,} from 'native-base'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { axiosInstance } from '../../state_manager/axios'
import { useStateValue } from '../../state_manager/contextApi'
import { PostProfile } from '../../state_manager/interfaces'

const ServiceDetail = ({navigation, route} : {navigation : any, route : any}) => {
  
    const [userInput, setUserInput] = useState<PostProfile>({title : "", description : "", location : "", workCategory : ""});
    const {state : {user}} = useStateValue();
    const [dataSubmitting,setDataSubmitting] = useState(false)


    const { id }: any = route.params


    const handleOrderSubmit = async()=>{
      setDataSubmitting(true)
      await axiosInstance.post('/post/add',{ownerId : user?._id,...userInput},{headers : {"Authorization" : `Bearer ${user?.accessToken}`}})
      .then((res)=>{
          console.log("Submit res",res.data);
          
          Toast.show({title : "Successfully Posted Order"})
          setUserInput({title : "",description : "",location : "",workCategory : ""})
          setDataSubmitting(false)
      })
      .catch((err:any)=>{Toast.show({title : `${err.message}`}); setDataSubmitting(false)})
    }


    useEffect(()=>{
      // console.log("this is the id", id)
    },[])
  return (
    <ScrollView backgroundColor={'white'}>
        <Box safeArea px={'5'} py={'3'}>
            <Pressable p={'3'}>
              <Icon onPress={()=> navigation.goBack()} as={Ionicons} name='return-up-back-outline' size={22} />
            </Pressable>
        </Box>

        <View>
          
            <Center w="100%">
                <Box  p="2" py="1" w="90%" >
                    <Heading size="lg" style = {{fontFamily : "MontserratSB"}} fontWeight="600"  >
                        Service Details
                    </Heading>
                </Box>
            </Center>

            <View p={'5'}>
              <View>
                <Text fontSize={'18'} style = {{fontFamily : "MontserratSB"}}  color = {'primary.900'}>Name</Text>
                <Text fontWeight={'extrabold'} style = {{fontFamily : "MontserratSB"}}  fontSize = {'24'}>Plumbing  Service</Text>
              </View>


              <View mt={'5'}>
                <Text fontSize={'18'} color = {'primary.900'} style = {{fontFamily : "MontserratSB"}}  >Description</Text>
                <Text fontWeight={500} fontSize = {'20'} style = {{fontFamily : "MontserratR"}}  >
                Fits and repairs the pipes, fittings, and other apparatus of water supply, sanitation, or heating systems.
                </Text>
              </View>



              <View mt={'5'}>
                <Text fontSize={'18'} color = {'primary.900'} style = {{fontFamily : "MontserratSB"}} >Services</Text>


                <Center>
                  <FormControl isRequired >
                    <Select minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                    bg: "primary.600",
                    endIcon: <CheckIcon size={5} />
                  }} mt="2">
                      <Select.Item label="Interior plumbing" value="ux" />
                      <Select.Item label="Outer Plumbing" value="web" />
                      <Select.Item label="Cross Platform Development" value="cross" />
                      <Select.Item label="UI Designing" value="ui" />
                      <Select.Item label="Backend Development" value="backend" />
                    </Select>
                    {/* <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                      Please make a selection!
                    </FormControl.ErrorMessage> */}
                  </FormControl>
                </Center>
              </View>

              <Box h={'20'}></Box>
              <Pressable mt={'2'} onPress = {()=> handleOrderSubmit} style = {styles.btn} backgroundColor = 'primary.600'>
                  <Text style = {{color : 'white', fontFamily : "MontserratR"}} >{dataSubmitting ? "ORDERING..." : "ORDER"}</Text>
              </Pressable>
              <Pressable mt={'4'} onPress = {()=> navigation.goBack()} style = {styles.btn}  borderWidth = '1' borderColor = 'primary.900'>
                  <Text style = {{color : 'blue', fontFamily : "MontserratR"}} >CANCEL</Text>
              </Pressable>

            </View>
        </View>

    </ScrollView>
  )
}

export default ServiceDetail


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