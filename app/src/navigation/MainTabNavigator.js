import React from 'react'
import { StyleSheet, Image } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import HomeScreen from '../pages/home/page'
import PersonScreen from '../pages/other/page'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused, tintColor }) => (
    <Image
      style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
      source={require('../assets/images/house.png')}
    />
  ),
}

const PersonStack = createStackNavigator({
  Person: PersonScreen,
})

PersonStack.navigationOptions = {
  tabBarLabel: 'Person',
  headerTitle: '123',
  tabBarIcon: ({ focused, tintColor }) => (
    <Image
      style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
      source={require('../assets/images/person.png')}
    />
  ),
}
const TabBar = createBottomTabNavigator({
  HomeStack,
  PersonStack,
})
TabBar.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index]

  return {
    headerTitle: routeName,
  }
}
export default TabBar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
})
