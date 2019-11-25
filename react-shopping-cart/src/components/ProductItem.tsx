import React, { Component } from 'react'
import { Avatar, TextStyle, ResourceList } from '@shopify/polaris'

interface ProductItemProps {
  _: {
    id: number
    name: string
    description: string
    price: number
    tax: number
  }
  onAddToCart: (productId: number, qte: number) => void
}

export default class ProductItem extends Component<ProductItemProps> {
  constructor(props: ProductItemProps) {
    super(props)
  }

  render() {
    const { id, name, description } = this.props._
    const { onAddToCart } = this.props

    const media = <Avatar key={id} customer={true} size="medium" name={name} />
    const shortcutActions = [
      {
        content: 'Add to basket (+1)',
        onAction: () => onAddToCart(id, 1),
      },
    ]

    return (
      // @ts-ignore
      <ResourceList.Item
        id={id.toString()}
        media={media}
        accessibilityLabel={`View details for ${name}`}
        shortcutActions={shortcutActions}
        persistActions={true}
        onClick={console.log}
      >
        <h3>
          <TextStyle variation="strong">{name}</TextStyle>
        </h3>
        <div>{description}</div>
      </ResourceList.Item>
    )
  }
}
