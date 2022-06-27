import { FormControl, HStack, Input, Link, Text, VStack , Pressable} from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native';

function ClientForm() {
  return (
    <VStack space={3} mt="5">
        <FormControl>
            <FormControl.Label isRequired>Full Name</FormControl.Label>
            <Input borderRadius={12} color = {'black.100'} />
        </FormControl>

        <FormControl>
            <FormControl.Label>Age</FormControl.Label>
            <Input borderRadius={12} color = {'black.100'} />
        </FormControl>

        <FormControl isRequired>
            <FormControl.Label>Phone Number</FormControl.Label>
            <Input borderRadius={12} keyboardType = 'numeric' color = {'black.100'} />
        </FormControl>

        {/* gender goes here */}


        <FormControl>
            <FormControl.Label>Location</FormControl.Label>
            <Input borderRadius={12} color = {'black.100'} />
        </FormControl>

        <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password"  borderRadius={12} color = {'black.100'}/>
            <Link _text={{ fontSize: "xs",fontWeight: "500", color: 'primary.100' , textDecoration : 'none' }} alignSelf="flex-end" mt="1">
                Forget Password?
            </Link>
        </FormControl>

        <Pressable mt={'2'} style = {styles.sign_up_btn} backgroundColor = 'primary.100'>
            <Text style = {{color : 'white'}} >SIGN UP</Text>
        </Pressable>

        <HStack mt="6" justifyContent="flex-start">
            <Text fontSize="md" color={'black.100'}>
                Already have an account? {" "}
            </Text>
            <Link _text={{color: 'primary.100',textDecoration : 'none', fontWeight: "medium", fontSize: "sm"}} href="#">
                SIGN IN
            </Link>
        </HStack>
    </VStack>
  )
}

export default ClientForm



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
        alignItems : 'center'
    }
  });