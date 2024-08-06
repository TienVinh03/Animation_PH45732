import { Button, Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'

const AnimationUpAndDown = ({navigation}) => {
  const width = Dimensions.get('window');

  const taodo_x = useSharedValue(0);
  const toado_y= useSharedValue(0);


  const animatedStyle = useAnimatedStyle(()=>({
    transform:[
      {translateX: withSpring(taodo_x.value)  },
      {translateY: withSpring(toado_y.value) }
    ]
  }));

  const handlePress = ()=>{
  
    taodo_x.value+=20;
    toado_y.value+=10;

  }
  
  return (
    <View style={styles.khung}>
      <Button title='Move' onPress={handlePress}/>
      <Button title='FlatList' onPress={()=>navigation.navigate('AnimationFlatList')}/>
      <Animated.View style={[styles.box1,animatedStyle]}/>
    
    </View>
  )
}

export default AnimationUpAndDown

const styles = StyleSheet.create({
   khung:{
      flex:1,
      // justifyContent:'center',alignItems:'center'
      backgroundColor:'aqua'
   }
   , 
   box1:{
    
      height:100,backgroundColor:'red',margin:10,width:100
   }
})