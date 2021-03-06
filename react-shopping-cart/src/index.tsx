import React from 'react'
import ReactDOM from 'react-dom'
import { AppProvider } from '@shopify/polaris'
import App from './App'
import * as serviceWorker from './serviceWorker'
import store from './store'
import { Provider } from 'react-redux'
import enTranslations from '@shopify/polaris/locales/en.json'
import '@shopify/polaris/styles.css'
import './App.css'

ReactDOM.render(
  <Provider store={store}>
    <AppProvider i18n={enTranslations}>
      <App supportsCurrency={true} />
    </AppProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
