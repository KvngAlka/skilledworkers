import { StatusBar } from 'expo-status-bar'
import { Box, Center, FormControl, Heading, HStack, Input, Link, ScrollView, Text, useTheme, View, VStack, Pressable } from 'native-base'
import React, {useState} from 'react'
import {  StyleSheet } from 'react-native'
import Logo from '../components/logo'



interface UserInput {
    phone : string,
    password : string,
}


const SignIn = ({navigation} : {navigation : any}) => {
    const {colors} = useTheme();
    const [userInput, setUserInput] = useState<UserInput | null>();


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
                    <Heading size="lg" fontWeight="600" color= {'black.100'}  >
                        Sign In
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl >
                            <FormControl.Label>Phone Number</FormControl.Label>
                            <Input type='text' borderRadius={12} color = {'black.100'} 
                            keyboardType = 'numeric'
                            defaultValue=''
                            value = {userInput?.phone}   
                            onChange = {(e)=> userInput && setUserInput({...userInput })} />
                        </FormControl>

                        <FormControl>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input type="password"  borderRadius={12} color = {'black.100'}/>
                            <Link _text={{ fontSize: "xs",fontWeight: "500", color: 'primary.100' , textDecoration : 'none' }} alignSelf="flex-end" mt="1">
                                Forget Password?
                            </Link>
                        </FormControl>


                        <Pressable mt={'2'} onPress = {()=> navigation.navigate('Order')} style = {styles.sign_in_btn} backgroundColor = 'primary.100'>
                            <Text style = {{color : 'white'}} >SIGN IN</Text>
                        </Pressable>

                        <HStack mt="6" justifyContent="flex-start">
                            <Text fontSize="md" color={colors.black[100]}>
                                Don't have an account? {" "}
                            </Text>
                            <Pressable onPress={()=> navigation.navigate('SignUp')} >
                                <Text fontWeight={'medium'} fontSize = {'sm'} color = {colors.primary[100]}>
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