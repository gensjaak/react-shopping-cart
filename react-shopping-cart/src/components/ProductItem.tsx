import React, { Component } from 'react'
import { Avatar, TextStyle, ResourceItem } from '@shopify/polaris'

import { ProductType, StoreState, CurrencyRateType } from '../store/types'
import { connect } from 'react-redux'
import { priceFromCurrency } from './../fn'

// Required props to render component
interface Props {
  // The main product to show
  _: ProductType

  // Selected currency
  selectedCurrency: CurrencyRateType

  // A method to handle add to cart request
  onAddToCart: (productId: number, qte: number) => void
}

class ProductItem extends Component<Props, {}> {
  render() {
    // Get needed properties from main product object
    const { id, name, description, price } = this.props._

    // Get needed method and currency
    const { onAddToCart, selectedCurrency } = this.props

    const media = <Avatar customer size="small" name={name} />
    const shortcutActions = [
      {
        content: 'Add to cart(+1)',
        accessibilityLabel: `Add ${name} to cart`,
        onAction: () => onAddToCart(id, 1),
      },
    ]

    return (
      // @ts-ignore
      <ResourceItem
        id={id.toString()}
        media={media}
        accessibilityLabel={`View details for ${name}`}
        shortcutActions={shortcutActions}
        persistActions
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{description}</div>
        <br />
        <p>
          Unit price:{' '}
          <strong>{priceFromCurrency(price, selectedCurrency)}</strong>
        </p>
      </ResourceItem>
    )
  }
}

// Make currency available under props
const mapStateToProps = (state: StoreState) => ({
  selectedCurrency: state.currency.selected,
})

export default connect(mapStateToProps)(ProductItem)
