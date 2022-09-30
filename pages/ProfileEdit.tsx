import { FormControl, Input, Pressable, Radio, Stack, Text, useToast, View, VStack } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { useStateValue } from '../state_manager/contextApi';
import { UserProfile } from '../state_manager/interfaces';

const ProfileEdit = () => {
    const initState:UserProfile = {fullName : "",age : "", location : "",phoneNumber : "", password : "", gender : ""}
    const [userInput, setUserInput] = useState<UserProfile>(initState);
    const [isSignUpLoading, setIsSignUpLoading] = useState(false);
    const toast = useToast();
    const {state : {user}, dispatch} = useStateValue();


  return (
    <VStack space={3} mt="5">
        <FormControl>
            <FormControl.Label isRequired>Full Name</FormControl.Label>
            <Input 
            onChangeText={(val)=>{ setUserInput({...userInput,fullName : val})}}
            borderRadius={12} color = {'black.100'} />
        </FormControl>

        <FormControl>
            <FormControl.Label>Age</FormControl.Label>
            <Input 
            keyboardType='numeric'
            onChangeText={(val)=>{ setUserInput({...userInput,age : val})}}
            borderRadius={12} color = {'black.100'} />
        </FormControl>

        <FormControl isRequired>
            <FormControl.Label>Phone Number</FormControl.Label>
            <Input 
            onChangeText={(val)=>{ setUserInput({...userInput,phoneNumber : val})}}
            maxLength={10}
            borderRadius={12} keyboardType = 'numeric' color = {'black.100'} />
        </FormControl>

        {/* gender goes here */}
        <FormControl isRequired>
            <FormControl.Label>Gender</FormControl.Label>
            <Radio.Group name='gender'>
                <Stack direction={{base : 'row'}}  >
                    <Radio color = {'primary'} value="male" my={1} >
                        Male
                    </Radio>
                    <View width={5}></View>
                    <Radio value="female" my={1}>
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
                    onChangeText={(val)=>{ setUserInput({...userInput,ghanaCardNumber : val})}}
                    borderRadius={12} color = {'black.100'} />
                </FormControl>
            )
        }

        <FormControl>
            <FormControl.Label>Location</FormControl.Label>
            <Input 
            onChangeText={(val)=>{ setUserInput({...userInput,location : val})}}
            borderRadius={12} color = {'black.100'} />
        </FormControl>



        <Pressable onPress={()=>{}} mt={'2'} style = {styles.sign_up_btn} backgroundColor = 'primary.100'>
            <Text style = {{color : 'white'}} >{isSignUpLoading ? 'LOADING...' : 'UPDATE' }</Text>
        </Pressable>
    </VStack>
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