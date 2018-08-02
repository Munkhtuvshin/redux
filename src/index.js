import React from 'react'

import { render } from 'react-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import Ap from './Ap.jsx'
import todoApp from './reducers/reducers'

const middleware = applyMiddleware(thunk)

let store = createStore(todoApp, middleware)
let rootElement = document.getElementById('app')

render(
   <Provider store = {store}>
      <Ap />
   </Provider>,
	
   rootElement
)