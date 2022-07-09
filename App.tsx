import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { extendTheme, NativeBaseProvider,  } from 'native-base';
import SplashScreen from './components/splash_screen';
import Order from './pages/Client/order';
import OrderDetails from './pages/Client/order_details';
import Profile from './pages/Profile';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import DataProvider from './state_manager/contextApi';



export default function App() {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary:  { 
        50: '#0052FF55', 100: '#0052FF', 200: '#A2D4EC',
        300: '#7AC1E4', 400: '#0052FF40', 500: '#0052FF50',
        600: '#0052FF', 700: '#0052FF0',
        800: '#0052FF80', 900: '#0052FF',
      },
      black : {
        100 : '#252525',
        10 : '#F5F5F5'
      },
      success : {100 : '#0ADE78'},
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'light',
    },
  });


  const Stack = createNativeStackNavigator();

  return (
    <DataProvider>
      <NativeBaseProvider theme={theme}>
        <StatusBar style="auto"  backgroundColor='white'/>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{title : '', headerShown : false}}  initialRouteName="Intro">

            <Stack.Screen name='Intro' component={SplashScreen}  />
            <Stack.Screen name='SignIn' options={{ title : "",headerShown : false }} component={SignIn} />
            <Stack.Screen name="SignUp" options={{ title : "",headerShown : false }} component={SignUp} />

            <Stack.Screen name="Order" options={{ title : "",headerShown : false }} component={Order} />
            <Stack.Screen name="OrderDetails" options={{ title : "",headerShown : false }} component={OrderDetails} />

            <Stack.Screen name="Profile" options={{ title : "",headerShown : false }} component={Profile} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </DataProvider>
  );
}

