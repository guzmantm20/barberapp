import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Style from "../components/Style";

const SendButton = ({name, handleSubmit}) => {
  return (
    <View style={Style.button}>
        <TouchableOpacity
          color="#008ae8"
          title="Button"
          onPress={handleSubmit}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>{name}</Text>
        </TouchableOpacity>
      </View>
  )
}

export default SendButton