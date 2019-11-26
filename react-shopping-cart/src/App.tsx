import React, { Component, Dispatch } from 'react'
import { connect } from 'react-redux'
import { Page, Layout, Select } from '@shopify/polaris'

import { fetchProducts, updateCurrency } from './store/actions'
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
  updateCurrency: (name: string) => void
}

class App extends Component<Props, {}> {
  constructor(props: Props) {
    super(props)

    // At startup, fetch all products
    this.props.fetchProducts()
  }

  // Updates selected currency in the store
  updateCurrency = (value: string) => {
    // Just to make sure
    if (this.props.supportsCurrency) this.props.updateCurrency(value)
  }

  render() {
    const currencies: string[] = [...this.props.currency.rates.map(_ => _.name)]

    // Check if app is setted up to support currency change
    const { supportsCurrency } = this.props

    return (
      <Page title="React Shopping Cart">
        <Layout>
          {/* Sélecteur de devise */}
          {supportsCurrency && (
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
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  updateCurrency: (name: string) => dispatch(updateCurrency(name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
