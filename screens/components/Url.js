import { StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import * as apis from '../../apis/vt';
import React from 'react'

const UrlPage = (props) => {
    const [ip, setIp] = React.useState("")
    const [url, setUrl] = React.useState("")
    const [domain, setDomain] = React.useState("")
    const [activityRunning, setActivityRunning] = React.useState(false)
    const scanUrl = React.useCallback(async () => {
        try {
            activityRunning && ToastAndroid.showWithGravity("Please wait...", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            setActivityRunning(true)
            const res = await apis.scanUrl(url)
            const result = await apis.getAnalysesReport(res.data?.id)
            props.setReportData(result)
            setUrl("")
            setActivityRunning(false)
        } catch (error) {
            Alert.alert(error.message || error)
            activityRunning && setActivityRunning(false)
        }
    })
    const scanDomain = React.useCallback(async () => {
        try {
            activityRunning && ToastAndroid.showWithGravity("Please wait...", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            setActivityRunning(true)
            const result = await apis.getDomainReport(domain)
            props.setReportData(result)
            setDomain("")
            setActivityRunning(false)
        } catch (error) {
            Alert.alert(error.message || error)
            activityRunning && setActivityRunning(false)
        }
    })
    const scanIp = React.useCallback(async () => {
        try {
            activityRunning && ToastAndroid.showWithGravity("Please wait...", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            setActivityRunning(true)
            const result = await apis.getIpReport(ip)
            props.setReportData(result)
            setIp("")
            setActivityRunning(false)
        } catch (error) {
            Alert.alert(error.message || error)
            activityRunning && setActivityRunning(false)
        }
    })
    return (
        <View>
            <Text>URL</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUrl}
                value={url}
                placeholder='Enter a URL to scan'
                selectionColor="#252525"
            />
            <TouchableOpacity style={styles.button} onPress={scanUrl}>
                {!activityRunning ? <Text style={styles.textBlock}>Scan URL</Text> : <ActivityIndicator
                    animating={activityRunning}
                    color="aqua"
                />}
            </TouchableOpacity>
            <Text>Domain</Text>
            <TextInput
                style={styles.input}
                onChangeText={setDomain}
                value={domain}
                placeholder='Enter a domain to scan'
                selectionColor="#252525"
            />
            <TouchableOpacity style={styles.button} onPress={scanDomain}>
                {!activityRunning ? <Text style={styles.textBlock}>Scan Domain</Text> : <ActivityIndicator
                    animating={activityRunning}
                    color="aqua"
                />}
            </TouchableOpacity>
            <Text>IP</Text>
            <TextInput
                style={styles.input}
                onChangeText={setIp}
                value={ip}
                placeholder='Enter a IP Address to scan'
                selectionColor="#252525"
            />
            <TouchableOpacity style={styles.button} onPress={scanIp}>
                {!activityRunning ? <Text style={styles.textBlock}>Scan IP</Text> : <ActivityIndicator
                    animating={activityRunning}
                    color="aqua"
                />}
            </TouchableOpacity>
        </View>
    )
}

export default UrlPage

const styles = StyleSheet.create({
    textBlock: {
        color: "#fff",
        fontWeight: 'bold'
    },
    input: {
        height: 40,
        marginVertical: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 10,
        marginVertical: 10
    },
})