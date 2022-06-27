import { Box,Center, Heading, Pressable, ScrollView, StatusBar, Text, View} from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import ClientForm from '../components/client_form'
import Logo from '../components/logo'
import SkillWorkerForm from '../components/skill_worker_form'

const SignUp = () => {
    const [isClientSignUp, setIsClientSignUp] = useState<boolean>(true);
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
                        Sign Up
                    </Heading>

                    <View mt={'5'} style = {styles.sign_up_type_cont} >
                        <Pressable style = {styles.sign_up_type} background = {isClientSignUp ? 'primary.100' : 'white'} onPress = {()=> setIsClientSignUp(true)}>
                            <View >
                                <Text color={isClientSignUp ? 'white' : 'black.100'}>CLIENT</Text>
                            </View>
                        </Pressable>
                        <Pressable style = {styles.sign_up_type} background = {!isClientSignUp ? 'primary.100' : 'white'}  onPress = {()=> setIsClientSignUp(false)}>
                            <View >
                                <Text color={!isClientSignUp ? 'white' : 'black.100'}>WORKER</Text>
                            </View>
                        </Pressable>
                        
                    </View>

                    {
                        isClientSignUp ? <ClientForm/> : <SkillWorkerForm/>
                    }

                    
                </Box>
            </Center>

        </View>
    </ScrollView>
  )
}

export default SignUp


const styles = StyleSheet.create({
    logo_cont : {
        padding : 10,
        alignItems : 'center',
    },
    form_cont : {
        marginTop : 30,
    },
    sign_up_type_cont : {
        flexDirection : 'row',
        width : '100%',
        borderBottomWidth : 0.5,
        borderBottomColor : 'black.10'
    },
    sign_up_type : {
        padding : 15,
        flex : 1,
        alignItems : 'center'
    }
  });