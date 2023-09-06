import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './screens/Login';
import Home from './screens/Home';

export default function App() {
  const [token, setToken] = React.useState(null)
  const [hidden, setHidden] = React.useState(false)

  const fetchStorage = async () => {
    let storageToken = await AsyncStorage.getItem("token")
    setToken(storageToken)
    if (storageToken) {
      ToastAndroid.showWithGravity("token added", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }
  }
  const clearStorage = async () => {
    await AsyncStorage.removeItem("token")
    setToken(null)
    ToastAndroid.showWithGravity("token removed", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
  }

  React.useEffect(() => {
    fetchStorage()
    setTimeout(() => {
      setHidden(true)
    }, 4000);
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {token === null ? <Login fetchStorage={fetchStorage} /> : <Home clearStorage={clearStorage} />}
      </ScrollView>
      <StatusBar style='auto' animated={true} hidden={hidden} translucent={false} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 40
  },
})