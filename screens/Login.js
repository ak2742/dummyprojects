import { StyleSheet, Button, Text, TextInput, View, Linking, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'

const Login = (props) => {
    const [APIKey, setAPIKey] = React.useState("")

    const submit = async () => {
        if (APIKey.length > 20) {
            await AsyncStorage.setItem('token', APIKey)
            props?.fetchStorage()
        } else {
            Alert.alert("INVALID API")
        }
    }

    const getApi = async () => {
        let url = "https://www.virustotal.com/gui/join-us"
        let canOpen = await Linking.canOpenURL(url)
        if (canOpen) {
            await Linking.openURL(url)
        } else {
            Alert.alert("Can't open. Go to " + url + " in browser")
        }
    }

    return (
        <View style={styles.loginView}>
            <Text style={styles.textBlock}>Enter your virustotal api key here</Text>
            <TextInput style={styles.input}
                onChangeText={setAPIKey}
                value={APIKey}
                placeholder='Enter your api key'
                selectionColor="#252525"
                secureTextEntry={true}
            />
            <Button
                onPress={submit}
                title="Login"
                color="#030380"
                accessibilityLabel="Login with API key"
            />
            <Text style={styles.textBlock}>don't have a key?</Text>
            <Button
                onPress={getApi}
                title="get a new api key"
                color="#007b39"
                accessibilityLabel="Sign up for a virustotal API key"
            />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    loginView: {
        paddingVertical: 160,
        paddingHorizontal: 40
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
    },
    textBlock: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginVertical: 10
    }
})