import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack' // bỏ chữ Native
import { NavigationContainer } from '@react-navigation/native'
import AnimationUpAndDown from './android/app/src/screens/AnimationUpAndDown';
import AnimationFlatList from './android/app/src/screens/AnimationFlatList';
import HeaderAnimation from './android/app/src/screens/HeaderAnimation';
import Welcome from './android/app/src/screens/Welcome';

const StackDemo = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
     <StackDemo.Navigator initialRouteName='Welcome'
       screenOptions={ { headerShown: false,
        cardStyleInterpolator: ({current,layouts})=>(
          {
            cardStyle:{
              opacity:current.progress, // thay đổi độ mờ theo quá trình hiện thị
              transform:[
                {
                   translateX:current.progress.interpolate({
                  inputRange:[0,1],
                  outputRange:[layouts.screen.width,0]
                })
                },
                {
                  scale:current.progress.interpolate({
                    inputRange:[0,1],
                    outputRange:[0.5,1]
                  })
                }
               
              ]
            }
          }
        )
       }}
     >
       <StackDemo.Screen name='AnimationUpAndDown' component={AnimationUpAndDown} />
       <StackDemo.Screen name='AnimationFlatList' component={AnimationFlatList} />
       <StackDemo.Screen name='HeaderAnimation' component={HeaderAnimation} />
       <StackDemo.Screen name='Welcome' component={Welcome} />
    


     </StackDemo.Navigator>
   </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})