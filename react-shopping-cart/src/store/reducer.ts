import {
  FETCH_PRODUCTS,
  ADD_PRODUCT_TO_CART,
  IAddProductToCartAction,
  AppActions,
  REMOVE_PRODUCT_FROM_CART,
  IRemoveProductFromCartAction,
} from './actions'
import { StoreState, Product } from './types'

const initialState: StoreState = {
  products: [],
  cart: {
    items: [],
    taxes: [
      {
        name: 20,
        value: 20,
      },
    ],
    totalAmountIncludingTaxes: 0,
  },
}

const reducer = (
  state: StoreState = initialState,
  action: AppActions
): StoreState => {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: [
          {
            id: 0,
            name: 'Product A',
            description: 'Lorem ipsum dolor sit, amet consectetur',
            price: 100,
            tax: 20,
          },
          {
            id: 1,
            name: 'Product B',
            description: 'Lorem ipsum dolor sit, amet consectetur',
            price: 100,
            tax: 5.5,
          },
        ],
      }

    case ADD_PRODUCT_TO_CART:
      const addAction = action as IAddProductToCartAction
      let alreadyInCart = false
      const updatedItems = [...state.cart.items].map(_ => {
        if (_.productId === addAction.payload.productId) {
          alreadyInCart = true
          _.qte += addAction.payload.qte
        }

        return _
      })

      if (!alreadyInCart) {
        updatedItems.push(addAction.payload)
      }

      let totalAmountIncludingTaxes = 0
      updatedItems.forEach(_ => {
        const product = state.products.find(
          __ => __.id === _.productId
        ) as Product

        totalAmountIncludingTaxes += product.price
      })

      state.cart.taxes.forEach(_ => {
        totalAmountIncludingTaxes =
          totalAmountIncludingTaxes * (1 + _.value / 100)
      })

      return {
        ...state,
        cart: {
          ...state.cart,
          totalAmountIncludingTaxes,
          items: updatedItems,
        },
      }

    case REMOVE_PRODUCT_FROM_CART:
      const removeAction = action as IRemoveProductFromCartAction
      const newItems = [...state.cart.items]
        .map(_ => {
          if (_.productId === removeAction.payload) {
            --_.qte
          }

          return _
        })
        .filter(_ => _.qte)

      return {
        ...state,
        cart: {
          ...state.cart,
          items: newItems,
        },
      }
    default:
      return state
  }
}

export default reducer
