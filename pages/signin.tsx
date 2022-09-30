import { StatusBar } from 'expo-status-bar'
import { Box, Center, FormControl, Heading, HStack, Input, Link, ScrollView, Text, useTheme, View, VStack, Pressable, Spinner, Toast } from 'native-base'
import React, {useEffect, useState} from 'react'
import {  StyleSheet } from 'react-native'
import Logo from '../components/logo'
import { axiosInstance } from '../state_manager/axios'
import { LOGIN } from '../state_manager/constants'
import { useStateValue } from '../state_manager/contextApi'
import { useToast } from 'native-base';
import { addUserToDB } from '../state_manager/local_db'



interface UserInput {
    phoneNumber : string,
    password : string,
}


const SignIn = ({navigation} : {navigation : any}) => {
    const {colors} = useTheme();
    const [userInput, setUserInput] = useState<UserInput | null>(null);
    const [signInLoading, setSignLoading] = useState(false)
    const {state : {user},dispatch} = useStateValue();
    const toast = useToast();


    useEffect(()=>{
        if(user){
            user.isAWorker === true || user.isAWorker === "true"
            ? 
            navigation.replace('WorkerLayout') 
            : 
            navigation.replace('ClientLayout')
        }
    },[user])

    const handleSign = async()=>{
        setSignLoading(true);

        await axiosInstance.post("/auth/user/login",userInput).then((res:any)=>{
            const data = res.data;

            if(data.code === 400){
                toast.show({title  : data.msg, duration : 3000,fontWeight : 'normal', backgroundColor : "primary.900"});
                setSignLoading(false)
                return;
            }

            if(data.code === 200){
                setSignLoading(false)
                // addUserToDB({ ...data.data, accessToken : data.accessToken}, Toast)
                dispatch({type : LOGIN, payload :{ ...data.data, accessToken : data.accessToken}})
            }
        }).catch((err:any)=>{ toast.show({title : err.message}); setSignLoading(false)})
    }


  return (
    <ScrollView backgroundColor={'white'}>
        <StatusBar backgroundColor='white'/>
        <View height={50}></View>
        <View style ={styles.logo_cont}>
            <Logo size={87} fontSize = {40} type = 'primary' />
        </View>


        <View>
            <Center w="100%">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color= {'black.100'}  style= {{fontFamily : "MontserratSB"}} >
                        Sign In
                    </Heading>


                    <VStack space={3} mt="5">
                        <FormControl >
                            <FormControl.Label><Text style={{fontFamily : "MontserratR"}}>Phone Number</Text></FormControl.Label>
                            <Input type='text' borderRadius={12} color = {'black.100'} 
                            keyboardType = 'numeric'
                            defaultValue=''  
                            onChangeText = {(val)=> userInput? setUserInput({...userInput, phoneNumber : val }): setUserInput({phoneNumber : val,password : ''})}   />
                        </FormControl>

                        <FormControl>
                            <FormControl.Label> <Text style={{fontFamily : "MontserratR"}}> Password</Text></FormControl.Label>
                            <Input type="password"  
                            onChangeText = {(val)=> userInput ? setUserInput({...userInput, password : val })  : setUserInput({phoneNumber : '',password : val})}
                            borderRadius={12} color = {'black.100'}/>
                            <Link _text={{ fontSize: "xs", textDecoration : 'none' }} alignSelf="flex-end" mt="1">
                                
                                <Text color={'primary.600'} style={{fontFamily : "MontserratR",}}>Forget Password?</Text>
                            </Link>
                        </FormControl>


                        <Pressable mt={'2'} onPress = {handleSign} style = {styles.sign_in_btn} backgroundColor = 'primary.900'>
                            
                            {
                                signInLoading 
                                ?
                                <HStack space={2} justifyContent="center">
                                    <Spinner accessibilityLabel="Loading posts" color="white"/>
                                    <Heading color="white" fontSize="md">
                                        Loading
                                    </Heading>
                                </HStack>
                                :
                                <Text style = {{color : 'white' , fontFamily: "MontserratR"}} >SIGN IN</Text>

                            }
                        </Pressable>

                        <HStack mt="6"  justifyContent="flex-start">
                            <Text fontSize="md" style ={{fontFamily : "MontserratR"}} color={colors.black[100]}>
                                Don't have an account? {" "}
                            </Text>
                            <Pressable onPress={()=> navigation.replace('SignUp')} >
                                <Text style ={{fontFamily : "MontserratSB"}} fontWeight={'medium'} fontSize = {'sm'} color = {colors.primary[900]}>
                                    SIGN UP
                                </Text>
                            </Pressable>
                        </HStack>
                    </VStack>
                </Box>
            </Center>

        </View>
    </ScrollView>
  )
}

export default SignIn


const styles = StyleSheet.create({
    logo_cont : {
        padding : 10,
        alignItems : 'center',
    },
    form_cont : {
        marginTop : 30,
    },
    sign_in_btn : {
        height : 50,
        borderRadius : 12,
        padding : 10,
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center'
    }
  });