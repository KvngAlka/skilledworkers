import { FormControl, HStack, Input, Link, Text, VStack , Pressable, Radio, Stack, View, useToast, Spinner, Heading, Toast} from 'native-base'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native';
import { axiosInstance } from '../state_manager/axios';
import { LOGIN } from '../state_manager/constants';
import { useStateValue } from '../state_manager/contextApi';
import { UserProfile } from '../state_manager/interfaces';
import { addUserToDB } from '../state_manager/local_db';

function RegistrationForm({navigation, isAWorker}: {navigation : any, isAWorker : boolean}) {

    const initState:UserProfile = {fullName : "",age : "",gender : "", location : "",phoneNumber : "", password : ""}
    const [userInput, setUserInput] = useState<UserProfile>(initState);
    const [cPassword, setCPassword] = useState<string>();
    const [isSignUpLoading, setIsSignUpLoading] = useState(false);
    const toast = useToast();
    const {state : {user}, dispatch} = useStateValue();



    useEffect(()=>{
        if(user){
            user.isAWorker 
            ? 
            navigation.replace('WorkerLayout') 
            : 
            navigation.replace('ClientLayout')
        }
    },[user])


    const handleSignUp = async()=>{
        setIsSignUpLoading(true);

        if(userInput.password !== cPassword){
            Toast.show({title : "Passwords must match"})
            setIsSignUpLoading(false);
            return
        }

        await axiosInstance.post("/auth/user/register",{...userInput, isAWorker })
        .then((res : any)=>{
            console.log("Reg res: ", res.data)
            const data = res.data;
            if(data.code === 400){
                setIsSignUpLoading(false)
                toast.show({title : data.msg , backgroundColor : "primary.900", fontWeight : 'normal'})
                return
            }
            addUserToDB(data, Toast);
            dispatch({type : LOGIN, payload : data})
            setIsSignUpLoading(false)
        })
        .catch((err :any)=> {toast.show(err); setIsSignUpLoading(false)})
    }


  return (
    <VStack space={3} mt="5">
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
            <Radio.Group name='gender' defaultValue="Male" value={userInput.gender} >
                <Stack direction={{base : 'row'}}  >
                    <Radio color = {'primary'}   value="Male" my={1} >
                        Male
                    </Radio>
                    <View width={5}></View>
                    <Radio value="Female" my={2}>
                        Female
                    </Radio>
                </Stack>
            </Radio.Group>
        </FormControl>

        


        {
            isAWorker && 
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

        <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input 
            value={userInput.password}
            onChangeText={(val)=>{ setUserInput({...userInput,password : val})}}
            type="password"  borderRadius={12} color = {'black.100'}/>
        </FormControl>

        <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input 
            value={cPassword}
            onChangeText={(val)=>{ setCPassword(val)}}
            type="password"  borderRadius={12} color = {'black.100'}/>
        </FormControl>

        <Pressable onPress={handleSignUp} mt={'2'} style = {styles.sign_up_btn} backgroundColor = 'primary.900'>
            
            {
                isSignUpLoading
                ?
                <HStack space={2} justifyContent="center">
                    <Spinner accessibilityLabel="Loading posts" color="white"/>
                    <Heading color="white" fontSize="md">
                        Loading
                    </Heading>
                </HStack>
                :
                <Text style = {{color : 'white'}} >SIGN UP</Text>
            }
        </Pressable>

        <HStack mt="6" justifyContent="flex-start">
            <Text fontSize="md" color={'black.100'}>
                Already have an account? {" "}
            </Text>
            <Pressable onPress={()=> navigation.replace('SignIn')} >
                <Text fontWeight={'medium'} fontSize = {'sm'} color = {'primary.900'}>
                    SIGN IN
                </Text>
            </Pressable>
        </HStack>
    </VStack>
  )
}

export default RegistrationForm



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