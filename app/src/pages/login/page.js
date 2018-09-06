import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

function App({ dispatch }) {
  const signIn = () => dispatch({ type: 'app/login' })
  return (
    <View style={styles.container}>
      <Button title="Sign in!" onPress={signIn} />
    </View>
  )
}
export default connect(({ login }) => ({ login }))(App)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
