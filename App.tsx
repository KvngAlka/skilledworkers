import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import {  Center, NativeBaseProvider, View,  } from 'native-base';
import SplashScreen from './components/splash_screen';
import ClientLayout from './pages/Client/layout';
import OrderDetails from './pages/Client/order_details';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import DataProvider from './state_manager/contextApi';
import { theme } from './state_manager/theme';


import WorkerLayout from './pages/worker/layout';
import { useEffect } from 'react';
import { createTable } from './state_manager/local_db';







export default function App() {

  const Stack = createNativeStackNavigator();
  

  useEffect(()=>{
    createTable();
  },[])

  

  

  return (
    <DataProvider>
      <NativeBaseProvider theme={theme}>
        <StatusBar style="auto"  backgroundColor='white'/>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{title : '', headerShown : false}}  initialRouteName="Intro">

            <Stack.Screen name='Intro' component={SplashScreen}  />
            <Stack.Screen name='SignIn' options={{ title : "",headerShown : false }} component={SignIn} />
            <Stack.Screen name="SignUp" options={{ title : "",headerShown : false }} component={SignUp} />



            {/* CLIENTS ROUTE */}
            <Stack.Screen name="ClientLayout" options={{ title : "",headerShown : false }} component={ClientLayout} />
            <Stack.Screen name="OrderDetails" options={{ title : "",headerShown : false }} component={OrderDetails} />




            {/* WORKER ROUTES */}
            <Stack.Screen name="WorkerLayout" options={{ title : "",headerShown : false }} component={WorkerLayout} />


            
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </DataProvider>
  );
}

