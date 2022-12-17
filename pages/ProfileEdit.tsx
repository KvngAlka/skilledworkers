import { Ionicons } from '@expo/vector-icons';
import { Box, Center, FormControl, Heading, Icon, Input, Pressable, Radio, ScrollView, Stack, Text, useToast, View, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { axiosInstance } from '../state_manager/axios';
import { UPDATE_USER } from '../state_manager/constants';
import { useStateValue } from '../state_manager/contextApi';
import { UserProfile } from '../state_manager/interfaces';

const ProfileEdit = ({navigation} : {navigation : any}) => {
    const initState:UserProfile = {fullName : "",age : "", location : "",phoneNumber : "", password : "", gender : ""}
    const [userInput, setUserInput] = useState<UserProfile>(initState);
    const [updateLoading, setUpdateUpLoading] = useState(false);
    const toast = useToast();
    const {state : {user}, dispatch} = useStateValue();

    const updateProfile = async()=>{
        setUpdateUpLoading(true);
        await axiosInstance.put('/user/profile/edit',{_id : user?._id,...userInput}, {headers : {"Authorization" : `Bearer ${user?.accessToken}`}})
        .then(res => {

            if(res.status === 200){
                dispatch({type : UPDATE_USER, payload : res.data.data})
                toast.show({title : res.data.msg});
                setUpdateUpLoading(false)
                return;
            }


            toast.show({title : res.data.msg})
            setUpdateUpLoading(false)
        })
        .catch(err =>  toast.show({title : err}))
    }

    useEffect(()=>{

        if(user) {
            const {fullName, ghanaCardNumber, age, phoneNumber, location, gender, password} = user;
            setUserInput({fullName, ghanaCardNumber, age, phoneNumber, location, gender, password} );
        }
        
    },[])


  return (
    <ScrollView background={'white'}>
        <Box safeArea px={'5'} py={'3'}  >
            <Pressable p={'3'} borderColor = {'black.100'} borderWidth = {1} borderRadius = {15} >
              <Icon onPress={()=> navigation.goBack()} as={Ionicons} name='return-up-back-outline' size={22} />
            </Pressable>
        </Box>
        <Box px={'5'}>
            <Heading  fontFamily={'body'}>Profile Update</Heading>
        </Box>
        <VStack space={3} pb={'5'} px={'5'} >
            <View width={'100%'}>
                <Center mt={10}>
                    <View height={150} width={150} backgroundColor={'primary.100'} borderRadius = {150} >
                    <Center height={'100%'}>
                        <Icon as={Ionicons} color ={'primary.900'} name='person-outline' size={60}  />
                    </Center>
                    </View>
                </Center>
            </View>
            <FormControl>
                <FormControl.Label isRequired>Full Name</FormControl.Label>
                <Input 
                value={userInput.fullName}
                onChangeText={(val)=>{ setUserInput({...userInput,fullName : val})}}
                borderRadius={12} color = {'black.100'} />
            </FormControl>

            <FormControl>
                <FormControl.Label>Age</FormControl.Label>
                <Input 
                value={userInput.age}
                keyboardType='numeric'
                onChangeText={(val)=>{ setUserInput({...userInput,age : val})}}
                borderRadius={12} color = {'black.100'} />
            </FormControl>

            <FormControl isRequired>
                <FormControl.Label>Phone Number</FormControl.Label>
                <Input 
                value={userInput.phoneNumber}
                onChangeText={(val)=>{ setUserInput({...userInput,phoneNumber : val})}}
                maxLength={10}
                borderRadius={12} keyboardType = 'numeric' color = {'black.100'} />
            </FormControl>

            {/* gender goes here */}
            <FormControl isRequired>
                <FormControl.Label>Gender</FormControl.Label>
                <Radio.Group name='gender' value={userInput.gender}>
                    <Stack direction={{base : 'row'}}  >
                        <Radio color = {'primary'} value="Male" my={1} >
                            Male
                        </Radio>
                        <View width={5}></View>
                        <Radio value="Female" my={1}>
                            Female
                        </Radio>
                    </Stack>
                </Radio.Group>
            </FormControl>

            


            {
                true && 
                (
                    <FormControl isRequired>
                        <FormControl.Label>Ghana Card Number</FormControl.Label>
                        <Input 
                        value={userInput.ghanaCardNumber}
                        onChangeText={(val)=>{ setUserInput({...userInput,ghanaCardNumber : val})}}
                        borderRadius={12} color = {'black.100'} />
                    </FormControl>
                )
            }

            <FormControl>
                <FormControl.Label>Location</FormControl.Label>
                <Input 
                value={userInput.location}
                onChangeText={(val)=>{ setUserInput({...userInput,location : val})}}
                borderRadius={12} color = {'black.100'} />
            </FormControl>



            <Pressable onPress={updateProfile} mt={'2'} style = {styles.sign_up_btn} backgroundColor = 'primary.900'>
                <Text style = {{color : 'white'}} >{updateLoading ? 'LOADING...' : 'UPDATE' }</Text>
            </Pressable>
        </VStack>
    </ScrollView>
  )
}

export default ProfileEdit


const styles = StyleSheet.create({
    logo_cont : {
        padding : 10,
        alignItems : 'center',
    },
    form_cont : {
        marginTop : 30,
    },
    sign_up_btn : {
        height : 50,
        borderRadius : 12,
        padding : 10,
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center'
    }
  });