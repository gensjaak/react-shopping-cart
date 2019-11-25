import React, { Component } from 'react'
import { Avatar, TextStyle, ResourceList, ResourceItem } from '@shopify/polaris'
import { ProductType } from '../store/types'

// Required props to render component
interface Props {
  // The main product to show
  _: ProductType

  // A method to handle add to cart request
  onAddToCart: (productId: number, qte: number) => void
}

export default class ProductItem extends Component<Props, {}> {
  render() {
    // Get needed properties from main product object
    const { id, name, description } = this.props._

    // Get needed method
    const { onAddToCart } = this.props

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
      </ResourceItem>
    )
  }
}
