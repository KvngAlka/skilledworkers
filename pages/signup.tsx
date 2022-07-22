import { Box,Center, Heading, Pressable, ScrollView, StatusBar, Text, View} from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import Logo from '../components/logo'
import RegistrationForm from '../components/form'

const SignUp = ({navigation} : {navigation : any}) => {
    const [isAWorker, setIsAWorker] = useState<boolean>(false);
  return (
    <ScrollView background={'white'}>

        <StatusBar backgroundColor='white'/>
        <View height={20}></View>
        <View style ={styles.logo_cont}>
            <Logo size={87} fontSize = {40} type = 'primary' />
        </View>
        <View>
            <Center w="100%">
                <Box safeArea p="2" py="4" w="90%" >
                    <Heading size="lg" fontWeight="600" color= {'black.100'}  >
                        Sign Up
                    </Heading>

                    <View mt={'5'} style = {styles.sign_up_type_cont} >
                        <Pressable style = {styles.sign_up_type} background = {!isAWorker ? 'primary.900' : 'white'} onPress = {()=> setIsAWorker(false)}>
                            <View >
                                <Text color={!isAWorker ? 'white' : 'black.100'}>CLIENT</Text>
                            </View>
                        </Pressable>
                        <Pressable style = {styles.sign_up_type} background = {isAWorker ? 'primary.900' : 'white'}  onPress = {()=> setIsAWorker(true)}>
                            <View >
                                <Text color={isAWorker ? 'white' : 'black.100'}>WORKER</Text>
                            </View>
                        </Pressable>
                        
                    </View>

                    <RegistrationForm  isAWorker = {isAWorker} navigation = {navigation} />


                    
                </Box>
            </Center>

        </View>
    </ScrollView>
  )
}

export default SignUp


const styles = StyleSheet.create({
    logo_cont : {
        padding : 5,
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
        padding : 10,
        flex : 1,
        alignItems : 'center'
    }
  });