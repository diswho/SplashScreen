import React, { useCallback, useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialsContext } from './components/CredentialsContext';
import RootStack from './navigators/RootStack';


export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [storedCredentials, setStoredCredentials] = useState("");

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
        await Font.loadAsync(Entypo.font)
        // await new Promise(resolve => setTimeout(resolve, 80))
        await AsyncStorage.getItem("humanResourceCredentials").then((result) => {
          if (result !== null) {
            setStoredCredentials(JSON.parse(result));
            // console.log("======== AsyncStorage.getItem NOT NULL")
          } else {
            setStoredCredentials("");
            // console.log("======== AsyncStorage.getItem IS NULL")
          }
        }).catch((err) => console.error(err));
        // console.log("======== prepare")
      } catch (error) {
        console.warn(error)
      }
      finally {
        setAppIsReady(true)
      }
    }
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    // console.log("======== onLayoutRootView")
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    // console.log("======== appIsReady IS Fail")
    return null
  }

  return (
    <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }} >      
      <RootStack onLayout={onLayoutRootView} />
    </CredentialsContext.Provider>
  );
}

