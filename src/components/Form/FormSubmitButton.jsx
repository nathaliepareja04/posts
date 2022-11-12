import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function FormSubmitButton({title,submitting,onPress}) {

  const backgroundColor="#5E3719"

  return (
    <TouchableOpacity style={[styles.container, {backgroundColor}]} onPress={()=>onPress()}>
      <Text style={{fontSize:18,color:"#fff"}}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  }
})