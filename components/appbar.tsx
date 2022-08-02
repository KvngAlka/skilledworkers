import Ionicons  from "@expo/vector-icons/Ionicons";
import {  HStack, Icon, IconButton, Pressable, View,  } from "native-base";
import {  StyleSheet } from "react-native";
import Logo from "./logo";



function AppBar() {
    return (
      <View style = {styles.appBar} backgroundColor = "white">
        <HStack px="2" py="3" justifyContent="space-between" alignItems="center" w="100%" >
          <Logo size={35} type = "primary" fontSize={12} />
          <Pressable >
            <Icon as={Ionicons} color="primary.600"  name="menu-outline" size="lg" />
          </Pressable>
        </HStack>
      </View>
    )
        
}

export default AppBar;


const styles = StyleSheet.create({
  appBar : {
    height : 60,
  }
})
