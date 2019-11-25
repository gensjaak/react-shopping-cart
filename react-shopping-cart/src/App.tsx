import React, { Component, Dispatch } from 'react'
import { connect } from 'react-redux'
import { Page, Layout } from '@shopify/polaris'

import { fetchProducts } from './store/actions'
import Cart from './components/Cart'
import Catalogue from './components/Catalogue'

// Whole app props
type Props = Actions

// Required actions to put under props
type Actions = {
  fetchProducts: () => void
}

class App extends Component<Props, {}> {
  constructor(props: Props) {
    super(props)

    // At startup, fetch all products
    this.props.fetchProducts()
  }

  render() {
    return (
      <Page title="React Shopping Cart">
        <Layout>
          {/* Liste des produits */}
          <Layout.Section>
            <Catalogue />
          </Layout.Section>

          {/* Panier */}
          <Layout.Section secondary>
            <Cart />
          </Layout.Section>
        </Layout>
      </Page>
    )
  }
}

// Make fetchProducts available under props
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchProducts: () => dispatch(fetchProducts()),
})

export default connect(null, mapDispatchToProps)(App)
