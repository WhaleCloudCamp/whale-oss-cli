import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Button } from './components/Button'
import { NavigationActions } from '../../utils'

function App({ app, other, dispatch }) {
  const { text } = other
  const { login } = app
  const changetext = () => dispatch({ type: 'other/fetch' })
  const goLogin = () => {
    if (login) {
      dispatch({ type: 'app/logout' })
    } else {
      dispatch(NavigationActions.navigate({ routeName: 'Login' }))
    }
  }
  return (
    <View>
      <Text>{text}</Text>
      <Button onPress={changetext}>
        <Text>click</Text>
      </Button>

      <Button onPress={goLogin}>
        <Text>{login ? 'logout' : 'login'}</Text>
      </Button>
    </View>
  )
}
export default connect(({ other, app }) => ({ other, app }))(App)
