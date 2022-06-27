import { StatusBar } from 'expo-status-bar';
import { extendTheme, NativeBaseProvider } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from './components/navbar';
import SplashScreen from './components/splash_screen';
import SignIn from './pages/signin';
import SignUp from './pages/signup';

export default function App() {
  const theme = extendTheme({
    colors: {
      // Add new color
      primary:  {
        50: '#0052FF55',
        100: '#0052FF',
        200: '#A2D4EC',
        300: '#7AC1E4',
        400: '#47A9DA',
        500: '#0088CC',
        600: '#007AB8',
        700: '#006BA1',
        800: '#005885',
        900: '#003F5E',
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

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style="auto" />
      {/* <SplashScreen/> */}
      {/* <SignIn/> */}
      <SignUp/>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
