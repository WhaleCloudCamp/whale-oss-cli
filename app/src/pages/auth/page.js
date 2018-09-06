import React from 'react'
import { ActivityIndicator, View, StatusBar, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions, Storage } from '../../utils'

function App({ dispatch }) {
  const _bootstrapAsync = async () => {
    const userToken = await Storage.get('login')
    dispatch(
      NavigationActions.navigate({ routeName: userToken ? 'Home' : 'Login' })
    )
  }
  _bootstrapAsync()
  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  )
}
export default connect(({ auth }) => ({
  auth,
}))(App)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
