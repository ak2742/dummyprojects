import AsyncStorage from '@react-native-async-storage/async-storage';

const host = `https://www.virustotal.com/api/v3`

const getAnalysesReport = async (id) => {
    try {
        let apiKey = await AsyncStorage.getItem("token")
        const response = await fetch(`${host}/analyses/${id}`, {
            method: "GET",
            headers: {
                'x-apikey': apiKey,
            }
        })
        let res = await response.json()
        return res
    } catch (error) {
        return { error: error }
    }
}

const scanFile = async (data) => {
    try {
        let apiKey = await AsyncStorage.getItem("token")
        let uri = data.url ? data.url : `${host}/files`
        let formData = new FormData()
        formData.append("file", data)
        const response = await fetch(uri, {
            method: "POST",
            headers: {
                'x-apikey': apiKey,
                'content-type': 'multipart/form-data'
            },
            body: formData
        })
        let res = await response.json()
        return res
    } catch (error) {
        return { error: error }
    }
}

const scanUrl = async (url) => {
    try {
        let apiKey = await AsyncStorage.getItem("token")
        const response = await fetch(`${host}/urls`, {
            method: "POST",
            headers: {
                'x-apikey': apiKey,
            },
            body: { url }
        })
        let res = await response.json()
        return res
    } catch (error) {
        return { error: error }
    }
}

const getDomainReport = async (domain) => {
    try {
        let apiKey = await AsyncStorage.getItem("token")
        const response = await fetch(`${host}/domains/${domain}`, {
            method: "GET",
            headers: {
                'x-apikey': apiKey,
            }
        })
        let res = await response.json()
        return res
    } catch (error) {
        return { error: error }
    }
}

const getIpReport = async (ip) => {
    try {
        let apiKey = await AsyncStorage.getItem("token")
        const response = await fetch(`${host}/ip_addresses/${ip}`, {
            method: "GET",
            headers: {
                'x-apikey': apiKey,
            }
        })
        let res = await response.json()
        return res
    } catch (error) {
        return { error: error }
    }
}
/*
unused
*/
const getUrlForLargeFile = async () => {
    try {
        let apiKey = await AsyncStorage.getItem("token")
        const response = await fetch(`${host}/files/upload_url`, {
            method: "GET",
            headers: {
                'x-apikey': apiKey,
            },
        })
        let res = await response.json()
        return res
    } catch (error) {
        return { error: error }
    }
}

const getFileReport = async (id) => {
    try {
        let apiKey = await AsyncStorage.getItem("token")
        const response = await fetch(`${host}/files/${id}`, {
            method: "GET",
            headers: {
                'x-apikey': apiKey,
            }
        })
        let res = await response.json()
        return res
    } catch (error) {
        return { error: error }
    }
}

const getUrlReport = async (id) => {
    try {
        let apiKey = await AsyncStorage.getItem("token")
        const response = await fetch(`${host}/urls/${id}`, {
            method: "GET",
            headers: {
                'x-apikey': apiKey,
            }
        })
        let res = await response.json()
        return res
    } catch (error) {
        return { error: error }
    }
}

module.exports = { scanFile, scanUrl, getFileReport, getUrlReport, getAnalysesReport, getUrlForLargeFile, getDomainReport, getIpReport }
