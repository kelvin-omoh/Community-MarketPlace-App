import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Login from './Apps/Screens/Login.jsx';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import TabNavigation from './Apps/Navigations/TabNavigation.jsx';
import { NavigationContainer } from '@react-navigation/native';



export default function App() {
  console.log(require('./assets/icon.png'));
  return (
    <ClerkProvider publishableKey={'pk_test_aW4td2FscnVzLTU4LmNsZXJrLmFjY291bnRzLmRldiQ'}>

      <SafeAreaView className="  h-full bg-slate-200/50 backdrop-blur-lg   ">

        <StatusBar style="auto" />

        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>

        </SignedIn>

        <SignedOut>
          <Login />
        </SignedOut>


      </SafeAreaView >

    </ClerkProvider>
  );
}

