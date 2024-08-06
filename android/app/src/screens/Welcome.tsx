import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Welcome = ({navigation}) => {
  return (
    <View>
      <View style={{marginVertical:10}}>
        <Button title='AnimationUpAndDown' onPress={()=>navigation.navigate('AnimationUpAndDown')}/>
      </View>
      <View style={{marginVertical:10}}>
        <Button title='HeaderAnimation' onPress={()=>navigation.navigate('HeaderAnimation')}/>
      </View>
      <View style={{marginVertical:10}}>
        <Button title='AnimationFlatList' onPress={()=>navigation.navigate('AnimationFlatList')}/>
      </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({})