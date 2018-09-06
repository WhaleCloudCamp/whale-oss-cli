import {
  createSwitchNavigator,
  createStackNavigator,
  Animated,
  Easing,
} from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import LoginScreen from '../pages/login/page'
import AuthLoadingScreen from '../pages/auth/page'

const AuthStack = createStackNavigator({ SignIn: LoginScreen })
export default createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // initialRouteName :AuthLoading
    Main: MainTabNavigator,
    AuthLoading: AuthLoadingScreen,
    Login: AuthStack,
  },
  {
    initialRouteName: 'Main',
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps
        const { index } = scene

        const height = layout.initHeight
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        })

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        })

        return { opacity, transform: [{ translateY }] }
      },
    }),
  }
)
