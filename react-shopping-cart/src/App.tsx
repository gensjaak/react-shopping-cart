import React, { Component } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Page, Layout, Select } from '@shopify/polaris'

import {
  fetchProducts,
  updateCurrency,
  fetchCurrencies,
  AppActions,
} from './store/actions'
import Cart from './components/Cart'
import Catalogue from './components/Catalogue'
import { CurrencyType, StoreState } from './store/types'

// Whole app props
type Props = Actions & {
  currency: CurrencyType
  supportsCurrency: boolean
}

// Required actions to put under props
type Actions = {
  fetchProducts: () => void
  fetchCurrencies: () => void
  updateCurrency: (name: string) => void
}

class App extends Component<Props, {}> {
  constructor(props: Props) {
    super(props)

    // At startup, fetch all products
    this.props.fetchProducts()
    // and currencies
    this.props.fetchCurrencies()
  }

  // Updates selected currency in the store
  updateCurrency = (value: string) => {
    // Just to make sure
    if (this.props.supportsCurrency) this.props.updateCurrency(value)
  }

  // Currency capable ?
  canUseCurrency() {
    return this.props.supportsCurrency && this.props.currency
  }

  render() {
    let currencies: string[] = []

    if (this.canUseCurrency())
      currencies = [...this.props.currency.rates.map(_ => _.name)]

    return (
      <Page title="React Shopping Cart">
        <Layout>
          {/* Sélecteur de devise */}
          {this.canUseCurrency() && (
            <Select
              label="Currency"
              labelInline
              options={currencies}
              onChange={this.updateCurrency}
              value={this.props.currency.selected.name}
            />
          )}

          {/* Liste des produits */}
          <Layout.Section>
            <Catalogue searchable={true} />
          </Layout.Section>

          {/* Panier */}
          <Layout.Section secondary>
            <Cart allowCache={true} />
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}

// Make currency available under props
const mapStateToProps = (state: StoreState) => ({
  currency: state.currency,
})

// Make fetchProducts available under props
const mapDispatchToProps = (dispatch: Dispatch<AppActions>) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  fetchCurrencies: async () => {
    await dispatch(fetchCurrencies())
  },
  updateCurrency: (name: string) => dispatch(updateCurrency(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
