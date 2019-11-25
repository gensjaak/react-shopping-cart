import { Middleware, MiddlewareAPI, Dispatch } from 'redux'
import {
  AppActions,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
  EMPTY_CART,
} from './actions'
import { StoreState } from './types'
import { setItem, CART_STORAGE_KEY } from '../storage'

export const persistCart: Middleware<{}, StoreState> = (
  api: MiddlewareAPI<Dispatch<AppActions>>
) => (next: Dispatch<AppActions>) => (action: AppActions) => {
  if (
    [ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART, EMPTY_CART].includes(
      action.type
    )
  ) {
    const result = next(action)
    const cartProducts = (api.getState() as StoreState).cart.items

    // Store it in localstorage
    setItem(CART_STORAGE_KEY, JSON.stringify(cartProducts))

    return result
  }

  return next(action)
}
