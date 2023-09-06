import { View, Alert, ToastAndroid, ActivityIndicator, TouchableOpacity, Text, StyleSheet } from 'react-native'
import * as DocumentPicker from "expo-document-picker";
import * as apis from '../../apis/vt';
import React from 'react'

const FilePage = (props) => {
    const [file, setFile] = React.useState({})
    const [activityRunning, setActivityRunning] = React.useState(false)

    const pickFile = React.useCallback(async () => {
        try {
            activityRunning && ToastAndroid.showWithGravity("Please wait...", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            setActivityRunning(true)
            const picker = await DocumentPicker.getDocumentAsync()
            if (picker.cancelled === true) {
                setActivityRunning(false)
            }
            if (picker.assets[0].size > 32 * 1024 * 1024) {
                ToastAndroid.showWithGravity("File too large", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            } else {
                setFile({ uri: picker.assets[0].uri, type: picker.assets[0].mimeType, name: picker.assets[0].name })
            }
            setActivityRunning(false)
        } catch (error) {
            Alert.alert(error.message || error)
        }
    })
    const scanFile = React.useCallback(async () => {
        try { 
            activityRunning &&ToastAndroid.showWithGravity("Please wait...", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
            setActivityRunning(true)
            const res = await apis.scanFile(file)
            const result = await apis.getAnalysesReport(res.data?.id)
            props.setReportData(result)
            setFile({})
            setActivityRunning(false)
        } catch (error) {
            Alert.alert(error.message || error)
            activityRunning && setActivityRunning(false)
        }
    })
    return (
        <View style={styles.fileView}>
            {file.name === undefined ?
                <TouchableOpacity style={styles.button} onPress={pickFile}>
                    {!activityRunning ? <Text style={styles.textBlock}>Select a file to scan</Text> : <ActivityIndicator
                        animating={activityRunning}
                        color="aqua"
                    />}
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.button} onPress={scanFile}>
                    {!activityRunning ? <Text style={styles.textBlock}>Scan {file.name}</Text> : <ActivityIndicator
                        animating={activityRunning}
                        color="aqua"
                    />}
                </TouchableOpacity>
            }
        </View>
    )
}

export default FilePage

const styles = StyleSheet.create({
    fileView: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 200
    },
    textBlock: {
        color: "#fff",
        fontWeight: 'bold'
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'blue',
        padding: 10,
        margin: 10
    },
})