import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import {  NativeBaseProvider,  } from 'native-base';
import SplashScreen from './components/splash_screen';
import ClientLayout from './pages/Client/layout';
import OrderDetails from './pages/Client/order_details';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import DataProvider, { useStateValue } from './state_manager/contextApi';
import { theme } from './state_manager/theme';


import * as SQLite from "expo-sqlite";
import { Platform } from 'react-native';
import { useEffect } from 'react';
import WorkerLayout from './pages/worker/layout';

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}


export const db = openDatabase();


export default function App() {
  const Stack = createNativeStackNavigator();
  const {state} = useStateValue()

  useEffect(() => {

    const createTable = ()=>  db.transaction((tx) => {
      tx.executeSql(
          "CREATE TABLE IF NOT EXISTS"
          + " Users"
          + ` (ID INTEGER PRIMARY KEY AUTOINCREMENT,_id TEXT,accessToken Text,
              fullName TEXT, age TEXT,gender TEXT, phoneNumber TEXT,
              location TEXT, ghanaCardNumber TEXT,password TEXT,
              isAWorker TEXT,isOnline TEXT, isActive TEXT
              )`,
          [],
          (tx,res)=> {console.log("Table Created")},
          (_,err)=> { console.log(err); return false}
      )
    })


    createTable();
  }, []);

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

