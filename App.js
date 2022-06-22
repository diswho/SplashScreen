import React, { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Dashboard from './screens/Dashboard';
import BigText from './components/BigText';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
        await Font.loadAsync(Entypo.font)
        // await new Promise(resolve => setTimeout(resolve, 8000))
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
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])
  if (!appIsReady) {
    return null
  }
  return (
    <>
      <Dashboard onLayout={onLayoutRootView} />
    </>
    // <View onLayout={onLayoutRootView} style={{flex: 1}} >
    //   <BigText style={{ color: 'red' }}> ======== Hello Friend</BigText>
    // </View>
  );
}

