import React, { Component, Dispatch } from 'react'
import { connect } from 'react-redux'
import { Card, ResourceList, Filters } from '@shopify/polaris'

import { ProductType, StoreState } from '../store/types'
import ProductItem from './ProductItem'
import { addProductToCart } from '../store/actions'

// Required props by Catalogue to render
interface Props {
  products: ProductType[]
  searchable: boolean
}

// Represent the state of Catalogue
interface State {
  search: string
}

// Required actions to put under this.props
interface Actions {
  addProductToCart: (productId: number, qte: number) => void
}

// Responsible of listing, filtering products
// Its also handle product add to cart action
class Catalogue extends Component<Props & Actions, State> {
  state = {
    // Filtering products string
    search: '',
  }

  // Handles the query value change
  handleQueryValueChange(value: string) {
    this.setState({
      search: value,
    })
  }

  // Handles the query deletion
  handleQueryValueRemove() {
    this.setState({ search: '' })
  }

  // Handles all filters deletion
  handleClearAll() {
    this.handleQueryValueRemove()
  }

  // Handle addToCart action and dispatch appropriate action in store
  handleAddToCart(productId: number, qte: number) {
    this.props.addProductToCart(productId, qte)
  }

  render() {
    // Filter products based on the query value
    const filteredProducts = this.props.products.filter(
      ({ description, name }) => {
        // description and name are the search scope
        return (
          description.toLowerCase().includes(this.state.search.toLowerCase()) ||
          name.toLowerCase().includes(this.state.search.toLowerCase())
        )
      }
    )

    // Provides UI and connectors for filtering products
    const filterControl = (
      <Filters
        filters={[]}
        queryValue={this.state.search}
        onQueryChange={this.handleQueryValueChange.bind(this)}
        onQueryClear={this.handleQueryValueRemove.bind(this)}
        onClearAll={this.handleClearAll.bind(this)}
      ></Filters>
    )

    return (
      <Card>
        <ResourceList
          resourceName={{
            singular: 'product',
            plural: 'products',
          }}
          items={filteredProducts}
          filterControl={this.props.searchable ? filterControl : null}
          renderItem={item => (
            <ProductItem
              _={item}
              onAddToCart={this.handleAddToCart.bind(this)}
            />
          )}
        />
      </Card>
    )
  }
}

// Make products available in this.props
const mapStateToProps = (state: StoreState) => ({
  products: state.products,
})

// Make addProductToCart available in this.props
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  addProductToCart: (productId: number, qte: number) =>
    dispatch(addProductToCart(productId, qte)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Catalogue)
