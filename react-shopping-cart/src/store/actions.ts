import { CurrencyType, CurrencyRateType } from './types'
import { ThunkDispatch } from 'redux-thunk'
import axios, { AxiosResponse } from 'axios'
import { getCurrencyDetails } from '../fn'

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART'
export const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART'
export const EMPTY_CART = 'EMPTY_CART'
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES'
export const UPDATE_CURRENCIES = 'UPDATE_CURRENCIES'
export const UPDATE_CURRENCY = 'UPDATE_CURRENCY'

// Available actions in the store
export type AppActions =
  | AddProductToCartAction
  | RemoveProductFromCartAction
  | FetchProductsAction
  | UpdateCurrencyAction

// Add product to cart action
export interface AddProductToCartAction {
  type: string
  payload: {
    productId: number
    qte: number
  }
}
export const addProductToCart = (
  productId: number,
  qte: number
): AddProductToCartAction => {
  return {
    type: ADD_PRODUCT_TO_CART,
    payload: { productId, qte },
  }
}

// Remove product from cart action
export interface RemoveProductFromCartAction {
  type: string
  payload: number
}
export const removeProductFromCart = (
  productId: number
): RemoveProductFromCartAction => {
  return {
    type: REMOVE_PRODUCT_FROM_CART,
    payload: productId,
  }
}

// Empty the cart
export interface EmptyCart {
  type: string
}
export const emptyCart = (): EmptyCart => {
  return {
    type: EMPTY_CART,
  }
}

// Fetch products action
export interface FetchProductsAction {
  type: string
}
export const fetchProducts = (): FetchProductsAction => {
  return {
    type: FETCH_PRODUCTS,
  }
}

// Fetch currencies data from API
interface FetchCurrenciesAction {
  type: string
}
export const fetchCurrencies = (): any => {
  return async (dispatch: ThunkDispatch<{}, {}, AppActions>): Promise<void> => {
    return new Promise<void>(resolve => {
      axios
        .get(
          'https://api.exchangeratesapi.io/latest?base=EUR&symbols=USD,GBP,CAD,HKD'
        )
        .then((response: AxiosResponse<any>) => {
          const data = response.data
          let currencies: CurrencyType = {
            base: data.base,
            selected: {
              name: data.base,
              showSymbolAtLeft: false,
              symbol: '€',
              value: 1,
            },
            rates: [],
          }
          Object.keys(data.rates).forEach((name: string) => {
            currencies.rates.push({
              name: name,
              value: data.rates[name] as number,
              showSymbolAtLeft: getCurrencyDetails(name).atLeft,
              symbol: getCurrencyDetails(name).symbol,
            })
          })
          // console.log(currencies)
          let action: UpdateCurrenciesAction = {
            type: UPDATE_CURRENCIES,
            payload: currencies,
          }

          // dispatch(action)
          resolve()
        })
    })
  }
}
// export const fetchCurrencies = (dispatch: Dispatch<AppActions>) => {
//   dispatch({ type: FETCH_CURRENCIES })
//   console.log('erer')
//   return fetch(
//     'https://api.exchangeratesapi.io/latest?base=EUR&symbols=USD,GBP,CAD,HKD'
//   )
//     .then(response => {
//       console.log(response)
//     })
//     .catch(error => {
//       console.error(error)
//     })
// }

// Update currencies in the store
export interface UpdateCurrenciesAction {
  type: string
  payload: CurrencyType
}
export const updateCurrencies = (
  currencies: CurrencyType
): UpdateCurrenciesAction => {
  return {
    type: UPDATE_CURRENCIES,
    payload: currencies,
  }
}

// Update currency action
export interface UpdateCurrencyAction {
  type: string
  payload: string
}
export const updateCurrency = (name: string): UpdateCurrencyAction => {
  return {
    type: UPDATE_CURRENCY,
    payload: name,
  }
}
