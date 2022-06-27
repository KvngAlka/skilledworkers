import { Box, Center, FormControl, Heading, HStack, Input, Link, ScrollView, Text, useTheme, View, VStack, Pressable } from 'native-base'
import React, {useState} from 'react'
import {  StyleSheet } from 'react-native'
import Logo from '../components/logo'



interface UserInput {
    phone : string,
    password : string,
}


const SignIn = () => {
    const {colors} = useTheme();
    const [userInput, setUserInput] = useState<UserInput | null>();

  return (
    <ScrollView>
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
                            value = {userInput?.phone ?? ''}   
                            onChange = {(e)=> userInput && setUserInput({...userInput })} />
                        </FormControl>

                        <FormControl>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input type="password"  borderRadius={12} color = {'black.100'}/>
                            <Link _text={{ fontSize: "xs",fontWeight: "500", color: 'primary.100' , textDecoration : 'none' }} alignSelf="flex-end" mt="1">
                                Forget Password?
                            </Link>
                        </FormControl>

                        {/* <Button mt="2" onPress={()=>{console.log("You clicke on signin")}} colorScheme={'primary.100'} borderRadius = {12}>
                            SIGN IN
                        </Button > */}

                        <Pressable mt={'2'} style = {styles.sign_in_btn} backgroundColor = 'primary.100'>
                            <Text style = {{color : 'white'}} >SIGN IN</Text>
                        </Pressable>

                        <HStack mt="6" justifyContent="flex-start">
                            <Text fontSize="md" color={colors.black[100]}>
                                Don't have an account? {" "}
                            </Text>
                            <Link _text={{color: colors.primary[100],textDecoration : 'none', fontWeight: "medium", fontSize: "sm"}} href="#">
                                SIGN UP
                            </Link>
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
        alignItems : 'center'
    }
  });