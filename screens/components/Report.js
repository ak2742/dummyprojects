import { StyleSheet, ActivityIndicator, Text, View, TouchableHighlight } from 'react-native'
import React from 'react'

const Report = (props) => {
  const [activityRunning, setActivityRunning] = React.useState(false)
  const [dataArray, setDataArray] = React.useState([])
  const [currentPath, setCurrentPath] = React.useState("/")
  const backBtnData = { dataKey: "Go Back", dataValue: "" }

  const getValue = (path) => {
    let arr = path.split('/')
    let val = props.data
    arr.forEach(dir => {
      if (dir !== "") {
        val = val[dir]
      }
    });
    return val
  }

  const addKey = (arr) => {
    let n = 100
    arr.forEach(obj => {
      obj.uniqueKey = `${n}`
      n++
    });
    return arr
  }

  const checkType = (data) => {
    switch (typeof data) {
      case "string":
        return true
      case "number":
        return true
      case "boolean":
        return true
      default:
        return false
    }
  }

  const visit = (obj) => {
    try {
      setActivityRunning(true)
      let tmpPath = currentPath
      if (!obj.dataKey) {
        tmpPath = '/'
        setCurrentPath('/')
      }
      else if (obj.dataKey === "Go Back") {
        if (tmpPath !== "/") {
          let i = tmpPath.split("/")
          i.pop()
          i.pop()
          tmpPath = i.join("/").concat("/")
          setCurrentPath(tmpPath)
        }
        else {
          setActivityRunning(false)
          return;
        }
      }
      else {
        if (obj.dataValue !== "") {
          let s = `${obj.dataKey}/`
          tmpPath = tmpPath.concat(s)
          setCurrentPath(tmpPath)
        }
        else {
          setActivityRunning(false)
          return;
        }
      }

      let data = getValue(tmpPath)
      let tmpArr = []
      tmpPath !== "/" && tmpArr.push({ ...backBtnData })
      if (typeof data === "object") {
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const val = data[key];
            tmpArr.push({ dataKey: key, dataValue: val })
          }
        }
      } else {
        let i = tmpPath.split('/')
        i.pop()
        tmpArr.push({ dataKey: i.pop(), dataValue: "" })
        tmpArr.push({ dataKey: data, dataValue: "" })
      }
      tmpPath !== "/" && tmpArr.push({ ...backBtnData })
      addKey(tmpArr)

      setDataArray(tmpArr)
      setActivityRunning(false)
    } catch (error) {
      activityRunning && setActivityRunning(false)
    }
  }

  React.useEffect(() => {
    visit(props.data)
  }, [props])

  const renderData = (item) => {
    return (
      <TouchableHighlight key={item.uniqueKey} onPress={() => { visit(item) }} style={styles.listItem}>
        <Text style={styles.textBlock}>{checkType(item.dataKey) ? item.dataKey : typeof item.dataKey}
          {item.dataValue !== "" ? ": " : ""}
          {checkType(item.dataValue) ? item.dataValue : typeof item.dataValue}</Text>
      </TouchableHighlight>
    )
  }

  return (
    <View>
      <Text style={styles.textBlock}>{currentPath}</Text>
      {activityRunning ?
        <ActivityIndicator
          animating={activityRunning}
          color="aqua"
          size="large"
        /> :
        dataArray.map((data) => renderData(data))
      }
    </View>
  )
}

export default Report

const styles = StyleSheet.create({
  textBlock: {
    fontWeight: "bold",
  },
  listItem: {
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 10,
  },
})