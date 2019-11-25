import {
  FETCH_PRODUCTS,
  ADD_PRODUCT_TO_CART,
  IAddProductToCartAction,
  AppActions,
  REMOVE_PRODUCT_FROM_CART,
  IRemoveProductFromCartAction,
  EMPTY_CART,
} from './actions'
import { StoreState, ProductType, CartProductType, TaxeType } from './types'

// Initial state of store
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

// Calculate total price
const calculateTotalPrice = (
  cartProducts: CartProductType[],
  products: ProductType[]
): number => {
  let priceHT = 0
  cartProducts.forEach(_ => {
    const product = products.find(__ => __.id === _.productId) as ProductType

    priceHT += product.price * _.qte
  })

  return priceHT
}

// Apply taxes
const applyTaxes = (priceHT: number, taxes: TaxeType[]): number => {
  let priceTTC = 0

  taxes.forEach(_ => {
    priceTTC += priceHT * (1 + _.value / 100)
  })

  return priceTTC
}

const reducer = (
  state: StoreState = initialState,
  action: AppActions
): StoreState => {
  switch (action.type) {
    // Fetch products
    case FETCH_PRODUCTS:
      return {
        ...state,
        products: [
          {
            id: 0,
            name: 'Product A',
            description: 'Lorem ipsum dolor sit, amet consectetur',
            price: 15,
            tax: 20,
          },
          {
            id: 1,
            name: 'Product B',
            description: 'Lorem ipsum dolor sit, amet consectetur',
            price: 29,
            tax: 5.5,
          },
        ],
      }

    // Add a product to the cart
    case ADD_PRODUCT_TO_CART:
      // If the product was already in the cart => inc(qte)
      // Else add it
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

      // Calculate the totals
      // Not sure this is the right way to calculate it
      let totalAmountIncludingTaxes = applyTaxes(
        calculateTotalPrice(updatedItems, state.products),
        state.cart.taxes
      )

      return {
        ...state,
        cart: {
          ...state.cart,
          totalAmountIncludingTaxes,
          items: updatedItems,
        },
      }

    // Remove a product from the cart
    case REMOVE_PRODUCT_FROM_CART:
      // dec product quantity in the cart
      // If, after that, the quantity is lower or eq to 0, remove it
      const removeAction = action as IRemoveProductFromCartAction
      totalAmountIncludingTaxes = 0
      const newItems = [...state.cart.items]
        .map(_ => {
          if (_.productId === removeAction.payload) {
            --_.qte
          }

          return _
        })
        .filter(_ => _.qte)

      // Calculate the totals
      // Not sure this is the right way to calculate it
      totalAmountIncludingTaxes = applyTaxes(
        calculateTotalPrice(newItems, state.products),
        state.cart.taxes
      )

      return {
        ...state,
        cart: {
          ...state.cart,
          totalAmountIncludingTaxes,
          items: newItems,
        },
      }

    // Empty the cart simply
    case EMPTY_CART:
      return {
        ...state,
        cart: {
          ...state.cart,
          items: [],
          totalAmountIncludingTaxes: 0,
        },
      }

    // By default, if not action, return state unchanged
    default:
      return state
  }
}

export default reducer
