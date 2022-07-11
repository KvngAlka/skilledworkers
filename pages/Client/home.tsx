import Ionicons from "@expo/vector-icons/Ionicons"
import { HStack, Input, Pressable, ScrollView, Text, View } from "native-base"
import ClientPostTile from "../../components/clientpost_tile"
import Layout from "./layout"
import Order from "./order"



const ClientHome = ({navigation} : {navigation : any}) => {
    const arr = [1,2,3,4,5,6,7,8,8,9,9]
  return (
    <Layout>
        {/* HOME VIEW */}
        <View key={'1'}>
            <View backgroundColor={'white'} width = "100%">
                <HStack p={2} alignItems='center'>
                    <Input placeholder='Search posts' flex={1} mr={2} borderRadius = {12} height = {8}/>
                    <Pressable  padding={2}>
                        <Ionicons name="search" size={24} color="black" />
                    </Pressable>
                </HStack>
            </View>
            <ScrollView flex={1} py={2} px={'1'} >
                <ClientPostTile/>
                {
                    arr.map((_,i)=>{
                        return <ClientPostTile key={i}/>
                    })
                }
            </ScrollView>
        </View>


        {/* ORDER VIEW */}
        <View key={'2'}>
            <Order navigation={navigation}/>
        </View>



        {/* NOTIFICATION VIEW */}
        <View>
            <Text>Notification</Text>
        </View>
    </Layout>
  )
}

export default ClientHome



