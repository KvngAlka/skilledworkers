import Ionicons  from "@expo/vector-icons/Ionicons";
import {  HStack, Icon, IconButton, Image, View,  } from "native-base";
import { StyleSheet } from "react-native";
import Logo from "./logo";



function AppBar() {
    return (
      <View>
        <HStack style = {styles.appBar} px="2" py="3" justifyContent="space-between" alignItems="center" w="100%" >
          <Logo size={35} type = "primary" fontSize={12} />
          <IconButton icon={<Ionicons  name="menu-outline" size={24} />} />
        </HStack>
      </View>
    )
        
}

export default AppBar;


const styles = StyleSheet.create({
  appBar : {
    height : 60,
    backgroundColor : "white",
  }
})
