import React, { Component, Dispatch } from 'react'
import { Card, List, Button } from '@shopify/polaris'
import { connect } from 'react-redux'
import { CartType, StoreState, ProductType } from '../store/types'
import { removeProductFromCart } from '../store/actions'

// Required props to render component
interface Props {
  // Products in cart
  cart: CartType

  // All products
  products: ProductType[]

  // Method to handle remove product request
  removeProductFromCart: (productId: number) => void
}

class Cart extends Component<Props, {}> {
  // Based on an ID, returns the correct product
  getProduct(productId: number): ProductType {
    return this.props.products.find(_ => _.id === productId) as ProductType
  }

  render() {
    // Retrieve needed properties
    const { items, taxes, totalAmountIncludingTaxes } = this.props.cart

    return (
      <Card
        title="Basket"
        secondaryFooterActions={[{ content: 'Cancel cart' }]}
        primaryFooterAction={{ content: 'Pay' }}
      >
        {/* List of cart products */}
        <Card.Section title="Items">
          <List>
            {items.map(_ => (
              <List.Item key={_.productId}>
                {_.qte} × {this.getProduct(_.productId).name} (PU:{' '}
                {this.getProduct(_.productId).price}€)
                <br />
                <Button
                  plain
                  destructive
                  onClick={() => this.props.removeProductFromCart(_.productId)}
                >
                  Remove (-1)
                </Button>
              </List.Item>
            ))}
          </List>
        </Card.Section>

        {/* Totals */}
        <Card.Section title="Totals">
          <List>
            {taxes.map(tax => (
              <List.Item key={tax.name}>
                TVA {tax.name}% : {tax.value.toFixed(2)}€
              </List.Item>
            ))}
            <List.Item>{totalAmountIncludingTaxes.toFixed(2)}€ TTC</List.Item>
          </List>
        </Card.Section>
      </Card>
    )
  }
}

// Make products and cart (from store) available under props
const mapStateToProps = (state: StoreState) => ({
  products: state.products,
  cart: state.cart,
})

// Make remove product action (from store) avaible under props
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  removeProductFromCart: (productId: number) =>
    dispatch(removeProductFromCart(productId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
