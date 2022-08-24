import { StatusBar } from 'expo-status-bar';
import { Center, Flex, Image, useTheme, View } from 'native-base'
import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useStateValue } from '../state_manager/contextApi';
import { fetchUser } from '../state_manager/local_db';
import Logo from './logo';

import { 
    useFonts,
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  } from '@expo-google-fonts/montserrat'




const SplashScreen = ({navigation} : {navigation : any}) => {
    const {colors} = useTheme();
    const {state : {user},dispatch} = useStateValue();


    let [fontsLoaded]= useFonts({
        Montserrat_300Light,
        Montserrat_600SemiBold,
        Montserrat_400Regular,
        Montserrat_500Medium,
        Montserrat_700Bold
    })

    useEffect(()=>{
        // !user && fetchUser(dispatch)

        console.log(user)
    },[user])


    const handleNext = ()=>{
        if(!user){
            navigation.replace('SignIn')
        }

        if(user){
            if(user.isAWorker){
                navigation.navigate('WorkerLayout') 
            }else{
                navigation.navigate('ClientLayout');
            }
        }  
        
    }

   if(!fontsLoaded) return <View><Center>App Loading...</Center></View>

  return (
    <View backgroundColor={colors.primary[900]}  height = {'100%'}>
        <StatusBar style='light'  backgroundColor={colors.primary[900]} />
        <View height={50}></View>
        <View style = {{alignItems : 'center'}}>
            <Logo size={87} type = 'normal' fontSize={40}/>
        </View>

        
        <View flex={1} padding = {5} alignItems = {'center'}>
            <PagerView style={styles.viewPager}  initialPage={1}  showPageIndicator >

                <View  flex={1} key={'2'} style = {styles.carousel_img_cont} width = '100%' height={200}>
                    <Image style = {styles.carousel_img} source={{ uri: "https://img.freepik.com/free-vector/construction-team-working-site_74855-4775.jpg?w=2000" }} alt="Alternate Text" size="xl" />
                </View>

                <View  flex={1} key={'1'} style = {styles.carousel_img_cont} width = '100%' height={200} >
                    <Image style = {styles.carousel_img} src={"https://cdn1.sph.harvard.edu/wp-content/uploads/sites/2020/2021/03/WHWO21-Content.jpg"}  alt="picintro1"/>
                </View>
                
                <View  flex={1} key={'3'} style = {styles.carousel_img_cont} width = '100%' height={200} >
                    
                </View>
               

            </PagerView>
            <View style = {styles.carousel_indicator_cont}>
                <View style = {styles.carousel_indicator}></View>
                <View style = {styles.carousel_indicator}></View>
                <View style = {styles.carousel_indicator}></View>
            </View>
        </View>
      
       <View alignItems={'center'} style = {styles.btn_cont}>
            <Pressable onPress={handleNext} style = {styles.btn}>
                <View width={'100%'} maxWidth={500} alignItems = "center">
                    <Text style = {{color : colors.primary[900], fontWeight : '400', fontSize : 20}}>GET STARTED</Text>
                </View>
            </Pressable>
       </View>

    </View>
  )
}

export default SplashScreen



const styles = StyleSheet.create({
    viewPager : {
        flex : 1,
        width : "100%",
    },
    carousel_img_cont : {
        width : '100%',
        backgroundColor : 'white',
        borderRadius : 12,
        overflow : "hidden"
    },
    carousel_img : {
        width : "100%",
        height : "100%"
    },
    carousel_indicator_cont : {
        flexDirection : 'row',
        justifyContent : 'center',
        padding : 10,
        
    },
    carousel_indicator : {
        width : 10,
        height : 10,
        borderRadius : 10,
        backgroundColor : 'white',
        margin : 10
    },
    btn_cont : {
        padding : 20
    },
    btn: {
        width : "80%", 
        height : 50 , 
        borderRadius : 30, 
        backgroundColor : "white",
        justifyContent : "center",
        alignItems : "center",
        fontFamily : "Montserrat_400Regular"
    },
  });