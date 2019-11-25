import React, { Component, Dispatch } from 'react'
import { Page, Layout, Card, ResourceList } from '@shopify/polaris'
import ProductItem from './components/ProductItem'
import Cart from './components/CartComponent'
import { connect } from 'react-redux'
import { StoreState } from './store/types'
import { fetchProducts, addProductToCart } from './store/actions'

type AppProps = StoreState & DispatchProps
type DispatchProps = {
  fetchProducts: () => void
  addProductToCart: (productId: number, qte: number) => void
}

class App extends Component<AppProps, {}> {
  constructor(props: AppProps) {
    super(props)

    this.props.fetchProducts()
  }

  handleAddToCart(productId: number, qte: number) {
    this.props.addProductToCart(productId, qte)
  }

  render() {
    return (
      <Page title="React Shopping Cart">
        <Layout>
          {/* Liste des produits */}
          <Layout.Section>
            <Card>
              <ResourceList
                resourceName={{ singular: 'customer', plural: 'customers' }}
                items={this.props.products}
                renderItem={item => (
                  <ProductItem
                    _={item}
                    onAddToCart={this.handleAddToCart.bind(this)}
                  />
                )}
              />
            </Card>
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

const mapStateToProps = (state: StoreState) => {
  return {
    products: state.products,
    cart: state.cart,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  addProductToCart: (productId: number, qte: number) =>
    dispatch(addProductToCart(productId, qte)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
