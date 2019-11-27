import React, { Component, Dispatch } from 'react'
import { Card, List, Button, DisplayText } from '@shopify/polaris'
import { connect } from 'react-redux'
import {
  CartType,
  StoreState,
  ProductType,
  CartProductType,
  CurrencyRateType,
} from '../store/types'
import {
  removeProductFromCart,
  emptyCart,
  addProductToCart,
} from '../store/actions'
import { getItem, CART_STORAGE_KEY } from '../storage'
import { priceFromCurrency } from '../fn'

// Required props to render component
interface Props {
  // Products in cart
  cart: CartType

  // All products
  products: ProductType[]

  // Allows cart to persist items
  allowCache: boolean

  // Selected currency
  selectedCurrency: CurrencyRateType

  // Method to handle remove product request
  removeProductFromCart: (productId: number) => void

  // Add a product to the cart
  addProductToCart: (productId: number, qte: number) => void

  // Method to handle cart cancel request
  emptyCart: () => void
}

class Cart extends Component<Props, {}> {
  constructor(props: Props) {
    super(props)

    if (this.props.allowCache) this.fetchPersistedCartItems()
  }

  fetchPersistedCartItems() {
    const items = JSON.parse(
      getItem(CART_STORAGE_KEY) || '[]'
    ) as CartProductType[]

    items.forEach(_ => {
      this.props.addProductToCart(_.productId, _.qte)
    })
  }

  // Based on an ID, returns the correct product
  getProduct(productId: number): ProductType {
    return this.props.products.find(_ => _.id === productId) as ProductType
  }

  // Cancels the cart by removing all products in
  cancelCart() {
    this.props.emptyCart()
  }

  render() {
    // Retrieve needed properties
    const { items, taxes, totalAmountIncludingTaxes } = this.props.cart

    // Get currency
    const { selectedCurrency } = this.props

    if (items.length) {
      return (
        <Card
          title="Basket"
          secondaryFooterActions={[
            {
              content: 'Cancel cart',
              onAction: () => this.cancelCart(),
            },
          ]}
          primaryFooterAction={{ content: 'Pay' }}
        >
          {/* List of cart products */}
          <Card.Section title="Items">
            <List>
              {items.map(_ => (
                <List.Item key={_.productId}>
                  <em>{_.qte}</em> ×{' '}
                  <strong>{this.getProduct(_.productId).name}</strong>
                  <br />
                  Unit price:{' '}
                  <strong>
                    {priceFromCurrency(
                      this.getProduct(_.productId).price,
                      selectedCurrency
                    )}
                  </strong>
                  <br />
                  <Button
                    plain
                    destructive
                    onClick={() =>
                      this.props.removeProductFromCart(_.productId)
                    }
                  >
                    Remove (-1)
                  </Button>
                  <br />
                  <br />
                </List.Item>
              ))}
            </List>
          </Card.Section>

          {/* Totals */}
          <Card.Section title="Totals">
            <List>
              {taxes.map(tax => (
                <List.Item key={tax.name}>
                  TVA {tax.name}% :{' '}
                  {priceFromCurrency(
                    Number(tax.value.toFixed(2)),
                    selectedCurrency
                  )}
                </List.Item>
              ))}
              <List.Item>
                <strong>
                  {priceFromCurrency(
                    Number(totalAmountIncludingTaxes.toFixed(2)),
                    selectedCurrency
                  )}{' '}
                  TTC
                </strong>
              </List.Item>
            </List>
          </Card.Section>
        </Card>
      )
    } else {
      return (
        <Card title="Basket" sectioned>
          <DisplayText size={'small'}>Your cart is empty 🤷‍♂️</DisplayText>
        </Card>
      )
    }
  }
}

// Make products and cart (from store) available under props
const mapStateToProps = (state: StoreState) => ({
  products: state.products,
  cart: state.cart,
  selectedCurrency: state.currency.selected,
})

// Make remove product action (from store) avaible under props
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  removeProductFromCart: (productId: number) =>
    dispatch(removeProductFromCart(productId)),
  emptyCart: () => dispatch(emptyCart()),
  addProductToCart: (productId: number, qte: number) =>
    dispatch(addProductToCart(productId, qte)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
