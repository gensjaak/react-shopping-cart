import { createStore, applyMiddleware } from 'redux'

import reducer from './reducer'
import { persistCart } from './middlewares'

export default createStore(reducer, applyMiddleware(persistCart))
