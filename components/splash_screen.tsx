import { StatusBar } from 'expo-status-bar';
import { Flex, Image, useTheme, View } from 'native-base'
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useStateValue } from '../state_manager/contextApi';
import Logo from './logo';


import { useEffect } from 'react';
import { db } from '../App';





const SplashScreen = ({navigation} : {navigation : any}) => {
    const {colors} = useTheme();
    const {state : {user}, dispatch} = useStateValue();

   useEffect(()=>{
        db.transaction(
            (tx) => {
            tx.executeSql("select * from Users", [], (_, { rows }) =>{
                if(rows.length !== 0){
                    // dispatch() -> set the user from the local storage
                }
            });
        })
    },[])

    const handleNext = ()=>{
        if(!user){
            //fetch token from local storage
            //use token to fetch user data
            navigation.replace('SignIn')
        }

        if(user)  user.isAWorker ? 
        navigation.navigate('WorkerHome') 
        : 
        navigation.navigate('WorkerHome');
    }


  return (
    <View backgroundColor={colors.primary[900]}  height = {'100%'}>
        <StatusBar style='light'  backgroundColor={colors.primary[900]} />
        <View height={50}></View>
        <View style = {{alignItems : 'center'}}>
            <Logo size={87} type = 'normal' fontSize={40}/>
        </View>

        
        <View flex={1} padding = {5} alignItems = {'center'}>
            <PagerView style={styles.viewPager}  initialPage={1}  showPageIndicator >

                <View  flex={1} key={'1'} style = {styles.carousel_img_cont} width = '100%' height={200} >
                    <Image style = {styles.carousel_img_cont} src={"https://cdn1.sph.harvard.edu/wp-content/uploads/sites/2020/2021/03/WHWO21-Content.jpg"}  alt="picintro1"/>
                </View>
                <View  flex={1} key={'2'} style = {styles.carousel_img_cont} width = '100%' height={200}>
                    
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
        alignItems : "center"
    },
  });