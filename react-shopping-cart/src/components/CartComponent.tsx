import React, { Component, Dispatch } from 'react'
import { Card, List, Button } from '@shopify/polaris'
import { connect } from 'react-redux'
import { Cart, StoreState, Product } from '../store/types'
import { removeProductFromCart } from '../store/actions'

interface CartProps {
  cart: Cart
  products: Product[]
  removeProductFromCart: (productId: number) => void
}

class CartComponent extends Component<CartProps> {
  constructor(props: CartProps) {
    super(props)
  }

  getProductName(productId: number): string {
    return (this.props.products.find(_ => _.id === productId) as Product).name
  }

  render() {
    const { items, taxes, totalAmountIncludingTaxes } = this.props.cart

    return (
      <Card
        title="Basket"
        secondaryFooterAction={{ content: 'Cancel cart' }}
        primaryFooterAction={{ content: 'Pay' }}
      >
        <Card.Section title="Items">
          <List>
            {items.map(_ => (
              <List.Item key={_.productId}>
                {_.qte} × {this.getProductName(_.productId)}
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

const mapStateToProps = (state: StoreState) => {
  return {
    products: state.products,
    cart: state.cart,
  }
}
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  removeProductFromCart: (productId: number) =>
    dispatch(removeProductFromCart(productId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent)
