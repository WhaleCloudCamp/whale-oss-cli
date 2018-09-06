import React from 'react'
import { AppRegistry } from 'react-native'

import dva from './utils/dva'
import Router, { routerMiddleware, routerReducer } from './helpers'
import appModel from './models/app'
import home from './pages/home/models/home'
import other from './pages/other/models/other'

const app = dva({
  initialState: {},
  models: [appModel, other, home],
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
  onError(e) {
    console.log('onError', e)
  },
})

const App = app.start(<Router />)
global.app = app
AppRegistry.registerComponent('<%= oni.name %>', () => App)
