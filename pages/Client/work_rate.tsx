import { Button, Center, Text, View, VStack } from 'native-base'
import React from 'react'
import Logo from '../../components/logo'

const WorkRate = () => {
  return (
    <View>
        <Center>
            <VStack>
                <View>
                    <View py={7}>
                        <Logo type='primary' size={20} fontSize = {20} />
                    </View>

                    <Text textAlign={'center'} >RATE WORK</Text>

                    <View>
                        
                    </View>
                </View>
                <Button>
                    <Text>Continue</Text>
                </Button>
                
            </VStack>
        </Center>
    </View>
  )
}

export default WorkRate