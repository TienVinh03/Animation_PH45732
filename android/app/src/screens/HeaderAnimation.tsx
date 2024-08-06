import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, withTiming, withSpring } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const DATA = [
  { id: '1', title: 'Design System', category: 'Product Design', author: 'Brandon', badgeCount: 10 },
  { id: '2', title: 'React Native 101', category: 'Development', author: 'Jennifer', badgeCount: 16 },
  { id: '3', title: 'Agile Basics', category: 'Product Management', author: 'Ewa', badgeCount: 38 },
  { id: '4', title: 'Agile Basics', category: 'Product Management', author: 'Ewa', badgeCount: 38 },
  // Add more items as needed
];

const HEADER_MAX_HEIGHT = 150;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default function HeaderAnimation() {
  const scrollY = useSharedValue(0);

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const height = withSpring(
      HEADER_MAX_HEIGHT - (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT) * scrollY.value / HEADER_SCROLL_DISTANCE
    );
    return {
      height,
    };
  });

  const animatedAvatarStyle = useAnimatedStyle(() => {
    const opacity = withTiming(1 - scrollY.value / HEADER_SCROLL_DISTANCE);
    const scale = withSpring(1 - scrollY.value / HEADER_SCROLL_DISTANCE * 0.3);
    return {
      opacity,
      transform: [{ scale }],
    };
  });

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.author}>{item.author}</Text>
      <View style={styles.badge}><Text>{item.badgeCount}</Text></View>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
        {/* <TouchableOpacity style={{position:'absolute',top:}}>
            <Image source={require('../img/galaxy.jpg')} style={{width:30,height:30}} />
        </TouchableOpacity> */}
      <Animated.View style={[styles.header, animatedHeaderStyle]}>
        <Animated.Image
          source={require('../../src/img/galaxy.jpg')} // Replace with your avatar source
          style={[styles.avatar, animatedAvatarStyle]}
        />
        <Animated.Text style={[styles.headerTitle, animatedAvatarStyle]}>
          Hello ! How was your day ?
        </Animated.Text>
      </Animated.View>
      <Animated.FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        ListHeaderComponent={() => <Text style={styles.listHeader}>Popular Quizzes</Text>}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'green',
    overflow: 'hidden',
    padding: 20,justifyContent: 'center',
    zIndex: 1,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10,
  },
  list: {
    paddingTop: HEADER_MAX_HEIGHT,
  },
  listHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 16,
    color: '#888',
  },
  author: {
    fontSize: 14,
    color: '#aaa',
  },
  badge: {
    backgroundColor: '#ececec',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
});