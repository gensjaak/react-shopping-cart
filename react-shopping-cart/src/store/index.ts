import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducer'
import { persistCart } from './middlewares'

export default createStore(reducer, applyMiddleware(thunk, persistCart))
