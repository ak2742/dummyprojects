import { View, Button, Text, StyleSheet } from 'react-native'
import Report from './components/Report'
import UrlPage from './components/Url'
import FilePage from './components/File'
import React from 'react'

const Home = (props) => {
    const [selection, setSelection] = React.useState("file")
    const [reportData, setReportData] = React.useState({})

    const alterSelection = () => {
        setSelection(selection === "file" ? "web" : "file")
    }
    return (
        <View style={styles.homeView}>
            <Button
                onPress={props.clearStorage}
                title="logout"
                color="red"
                accessibilityLabel="remove token from device"
            />
            {selection === "file" && <FilePage setReportData={setReportData} />}
            {selection === "web" && <UrlPage setReportData={setReportData} />}
            <Button
                onPress={alterSelection}
                title={selection === "file" ? "scan a website instead" : "scan a file instead"}
                color="blue"
            />
            {!reportData.data ? <Text style={styles.textBox}>Run a scan to see reports here.</Text> : <Report data={reportData} />}
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    homeView: {
        paddingVertical: 40,
        alignItems: 'center'
    },
    textBox: {
        marginVertical: 20,
        fontWeight: "bold"
    },
})